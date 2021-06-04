d3.json("data/data_finance.json", d => {
  var f3data = d;

  var f3width = 500,
  f3height = 500,
  f3start = 0,
  f3end = 5,
  f3numSpirals = 4
f3margin = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50
};

const f3parseTime = d3.timeParse("%Y-%m-%d")
const f3formatTime = d3.timeFormat("%d %b %Y")

var f3curvetheta = function (r) {
  return f3numSpirals * Math.PI * r * 0.5;
};

// used to assign nodes color by group
var f3timecolor = d3.scaleOrdinal(d3.schemeCategory10);

var r = d3.min([f3width, f3height]) / 2 - 40;

var f3radius = d3.scaleLinear()
  .domain([f3start, f3end])
  .range([40, r]);

var f3svg = d3.select("#f3-area").append("svg")
  .attr("width", f3width + f3margin.right + f3margin.left)
  .attr("height", f3height + f3margin.left + f3margin.right)
  .append("g")
  .attr("transform", "translate(" + f3width / 2 + "," + f3height / 2 + ")");

var f3points = d3.range(f3start, f3end + 0.001, (f3end - f3start) / 1000);

var f3spiral = d3.radialLine()
  .curve(d3.curveCardinal)
  .angle(f3curvetheta)
  .radius(f3radius);

var f3path = f3svg.append("path")
  .datum(f3points)
  .attr("id", "spiral")
  .attr("d", f3spiral)
  .style("fill", "none")
  .style("stroke", "steelblue");

var f3spiralLength = f3path.node().getTotalLength(),
  f3N = f3data.length,
  f3barWidth = (f3spiralLength / f3N / 4) - 2;


var f3timeScale = d3.scaleTime()
  .domain(d3.extent(f3data, function (d) {
    return f3parseTime(d.ReleaseDate).getTime();
  }))
  .range([0, f3spiralLength]);

// yScale for the bar height
var f3yScale2 = d3.scaleLog()
  .domain([d3.min(f3data, d => d.BoxOffice), d3.max(f3data, d => d.BoxOffice)])
  .range([0, (r / f3numSpirals) - 30])
  .base(10);

f3svg.selectAll("rect")
  .data(f3data)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {

    var linePer = f3timeScale(f3parseTime(d.ReleaseDate).getTime()),
      posOnLine = f3path.node().getPointAtLength(linePer),
      angleOnLine = f3path.node().getPointAtLength(linePer - f3barWidth);

    d.linePer = linePer; // % distance are on the spiral
    d.x = posOnLine.x; // x postion on the spiral
    d.y = posOnLine.y; // y position on the spiral

    d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

    return d.x;
  })
  .attr("y", function (d) {
    return d.y;
  })
  .attr("width", function (d) {
    return f3barWidth;
  })
  .attr("height", function (d) {
    return f3yScale2(d.BoxOffice);
  })
  .style("fill", function (d) {
    return f3timecolor(f3parseTime(d.ReleaseDate).getYear());
  })
  .style("stroke", "none")
  .attr("transform", function (d) {
    return "rotate(" + d.a + "," + d.x + "," + d.y + ")"; // rotate the bar
  });

// add date labels
var labeltF = d3.timeFormat("%Y"),
  firstInYear = {};

f3svg.selectAll("text")
  .data(f3data)
  .enter()
  .append("text")
  .attr("dy", 10)
  .style("text-anchor", "start")
  .style("font", "10px arial")
  .append("textPath")
  // only add for the first of each month
  .filter(function (d) {
    var sd = labeltF(f3parseTime(d.ReleaseDate).getTime());
    if (!firstInYear[sd]) {
      firstInYear[sd] = 1;
      if(sd%5 == 0){
        return true;
      }
    }
    return false;
  })
  .text(function (d) {
    return labeltF(f3parseTime(d.ReleaseDate).getTime());
  })
  // place text along spiral
  .attr("xlink:href", "#spiral")
  .style("fill", "grey")
  .attr("startOffset", function (d) {
    return ((d.linePer / f3spiralLength) * 100) + "%";
  })


var f3tooltip = d3.select("#f3-area")
  .append('div')
  .attr('class', 'finance3_tip');

f3tooltip.append('div')
  .attr('class', 'f3date');
  f3tooltip.append('div')
  .attr('class', 'f3name');
f3tooltip.append('div')
  .attr('class', 'f3BoxOffice');

f3svg.selectAll("rect")
  .on('mouseover', function (d) {

    f3tooltip.select('.f3date').html("Date: <b>" + f3formatTime(f3parseTime(d.ReleaseDate).getTime()) + "</b>");
    f3tooltip.select('.f3name').html("Movie Name: <b>" + d.title + "</b>");
    f3tooltip.select('.f3BoxOffice').html("BoxOffice: <b>" + Math.round(d.BoxOffice * 100) / 100 + "<b>");

    d3.select(this)
      .style("fill", "#FFFFFF")
      .style("stroke", "#000000")
      .style("stroke-width", "0px");

    f3tooltip.style('display', 'block');
    f3tooltip.style('opacity', 2);

  })
  .on('mousemove', function (d) {
    f3tooltip.style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX - 25) + 'px');
  })
  .on('mouseout', function (d) {
    f3svg.selectAll("rect")
      .style("fill", function (d) {
        return f3timecolor(f3parseTime(d.ReleaseDate).getYear());
      })
      .style("stroke", "none")

    f3tooltip.style('display', 'none');
    f3tooltip.style('opacity', 0);
  });

})



