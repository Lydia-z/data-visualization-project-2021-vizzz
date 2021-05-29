var pop_slide = document.getElementById('pop_slide');
var margin = {top: 10, right: 40, bottom: 90, left: 20},
    width_timeline= pop_slide.clientWidth*0.8 - margin.left - margin.right,
    height_timeline= 200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#my_dataviz_timeline")
  .append("svg")
    .attr("width", width_timeline+ margin.left + margin.right)
    .attr("height", height_timeline+ margin.top + margin.bottom)
  .append("g")
        .attr("transform","translate(" + 0 + "," + margin.top + ")");


//select movie to display
var clickTitle = function(d){
  title = d.title
  description = d.Description

  upload_poster(title,description);
}

var color = function(d){
  if (d <= 80){return "#D3B1C2";}
  else if (d <= 85 ) {
    return "#C197D2";
  }else{return "#613659";}
};

var div = d3.select("#my_dataviz_timeline").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

// Parse the Data
d3.csv("./data/best30.csv",function(error,data) {
  if (error) throw error;
  data = data;
// Add X axis
var x = d3.scaleLinear()
  .domain([1940, 2020])
  .range([ 0, width_timeline]);
  svg2.append("g")
    .attr("class","axis")
    .attr("transform", "translate(20," + height_timeline/2 + ")")
    .attr("stroke", "#613659")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(0,5)rotate(-45)")
      .attr("font-size", "10px")
      .style("text-anchor", "end");

// Y axis

var y = d3.scaleLinear()
  .range([height_timeline ,0])
  .domain([75,95]);
  svg2.append("g")
    .attr("transform","translate(20,0)");

// Set Tooltips
  var node_tip = d3.tip()
    .attr('class', 'finance1_tip')
    .html(d => {
      let text = "Title:" + d.title + "<br/>" + "Imdb score: "+ d.imdb + "<br/>" + "metascore: "+ d.metascore + "<br/>" + "Rotten tomatoes: "+ d.rotten_tomatoes + "<br/>";
      return text
    })
  svg2.call(node_tip)


// Lines
var j = svg2.selectAll(".myline")
  .data(data)
//update Lines
  j
  .enter()
  .append("line")
  .attr("class", "myLine")
  .merge(j)
    .attr("x1", function(d) { return x(d.year); })
    .attr("x2", function(d) { return x(d.year); })
    .attr("y1", function(d) { return height_timeline/2 - (d.score-86)*15;})
    .attr("y2", height_timeline/2)
    .attr("transform","translate(20,0)")
    .attr("stroke", function(d){return color(d.score);})
    .attr("stroke-width",1);
// Circles
svg2.selectAll("mycircle")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.year); })
    .attr("cy", function(d) { return height_timeline/2 - (d.score-86)*15; })
    .attr("r", "4")
    .attr("transform","translate(20,0)")
    .style("fill", function(d){return color(d.score);})
    .attr("stroke", function(d){return color(d.score);})
    // Show tooltip on hover
    .on("mouseover", node_tip.show)
     .on("mouseout", node_tip.hide)
      .on("click",function(d,i){console.log(d.title);return clickTitle(d);});
});
