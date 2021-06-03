var contribution_datas = ["./data/director_contribution.csv", "./data/producer_contribution.csv", "./data/music_contribution.csv"];
var target_groups = ["Directors", "Producers", "Music Producers"];
var svg_radio = d3.select("#radio"),
    width = svg_radio.node().getBoundingClientRect().width,
    height = svg_radio.node().getBoundingClientRect().width,
    innerRadius = 80,
    outerRadius = Math.min(width, height) / 2;
    

function drawRadiograph(button_id){
  var ind = parseInt(button_id.split("_")[1]);
  var target_group = target_groups[ind];

  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .align(0);

  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius]);

  var z = d3.scaleOrdinal()
      .range(["#94C973", "#F8EA8C", "#FFAEBC", "#D3B5E5", "#887BB0", "#613659", "#85D2D0"]);

  d3.csv(contribution_datas[ind], function(d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
  }, function(error, data) {
    if (error) throw error;

    // clean up svg
    svg_radio.selectAll('*').remove();

    var g = svg_radio.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 + 15)+ ")");

    x.domain(data.map(function(d) { return d.Name; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);
    z.domain(data.columns.slice(1));

    var bars = g.append("g")
      .selectAll("g")
      .data(d3.stack().keys(data.columns.slice(1))(data))
      .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
      .selectAll("path")
      .data(function(d) { return d; })
      .enter().append("path")
        .attr("d", d3.arc()
            .innerRadius(function(d) { return y(d[0]); })
            .outerRadius(function(d) { return y(d[1]); })
            .startAngle(function(d) { return x(d.data.Name); })
            .endAngle(function(d) { return x(d.data.Name) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius));

    // set tooltips
    var tooltip = d3.tip()
      .attr('class', 'finance1_tip')
      .html(d => {
        let text = d.data.Name + ":" + d.data.total + " movies.";
        return text
      });
    svg_radio.call(tooltip);

    var mouseover = function(d) {
      tooltip.show(d, this);
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1);
    }
    var mouseout = function(d) {
      tooltip.hide(d, this);
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8);
    }

    
    bars.on('mouseover', mouseover)
        .on("mouseout", mouseout);

    var yAxis = g.append("g")
        .attr("text-anchor", "middle");

    // make variable to indicate number of films
    var yTick = yAxis
      .selectAll("g")
      .data(y.ticks(5).slice(1))
      .enter().append("g");

    yTick.append("circle")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("r", y)
        .style("opacity", 0.8);

    // background for the number to make it clear
    yTick.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "0.35em")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 5)
        .text(y.tickFormat(5, "s"))
        .style("opacity", 0.8);
    // number 
    yTick.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "0.35em")
        .text(y.tickFormat(5, "s"))
        .attr("fill","#fff")
        .style("opacity", 0.8);

    yAxis.append("text")
        .attr("y", function(d) { return -y(y.ticks(5).pop()); })
        .attr("dy", "-1em")
        .text("Number of Films for "+target_group)
        .attr("transform", "translate(0," + (5) + ")")
        .attr("fill","#fff")
        .attr("font-size", "15px")
        .style("opacity", 0.8);


    // draw rect legend indicating color 
    var legend = g.append("g")
      .selectAll("g")
      .data(data.columns.slice(1).reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(-40," + (i - (data.columns.length - 1) / 2) * 20 + ")"; });

    legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", z);

    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(function(d) { return d; })
        .attr("fill","#fff");
  });
}


drawRadiograph("wc_0");

// update size-related forces
d3.select(window).on("resize", function(){
    width = svg_radio.node().getBoundingClientRect().width,
    height = svg_radio.node().getBoundingClientRect().width,
    innerRadius = 80,
    outerRadius = Math.min(width, height) / 2;
    drawRadiograph(buttonid_www);
});