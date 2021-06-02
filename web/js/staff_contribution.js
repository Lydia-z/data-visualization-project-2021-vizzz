function drawRadiograph(file_path){
  var svg = d3.select("#radio"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      innerRadius = 80,
      outerRadius = Math.min(width, height) / 2,
      g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 +10)+ ")");

  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .align(0);

  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius]);

  var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  d3.csv(file_path, function(d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
  }, function(error, data) {
    if (error) throw error;

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

    // create a tooltip
    var Tooltip = d3.select("#radio_tooltip")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

     // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    var mousemove = function(d) {
      console.log(d.data.Name);
      Tooltip
        .html("The exact value of<br>this cell is: " + d.data.Name)
        .style("left", (d3.mouse(this)[0]+70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
      Tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }
    
    bars.on('mouseover', mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

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
        .text("Number of Films")
        .attr("fill","#fff")
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


drawRadiograph("./data/director_contribution.csv");