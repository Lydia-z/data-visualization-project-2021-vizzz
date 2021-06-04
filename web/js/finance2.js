var f2_slide = document.getElementById('f2_slide');

var f2data_default = [{
  "title": "Please select a category",
  "RunningTime": 115.0,
  "Budget": 1,
  "BoxOffice": 1,
  "ReleaseDate": "2022-03-09",
  "imdb": 7.6,
  "profit": 1,
  "ROI": 1,
  "ProfitRatio": 1
}]

// select the svg area
var f2legsvg = d3.select("#finance2-legend")

// Handmade legend
f2legsvg.append("circle").attr("cx", 20).attr("cy", 10).attr("r", 6).style("fill", "#613659")
f2legsvg.append("circle").attr("cx", 20).attr("cy", 40).attr("r", 6).style("fill", "#D3B1C2")
f2legsvg.append("text").attr("x", 40).attr("y", 10).text("Box Office").style("font-size", "15px").attr("alignment-baseline", "middle")
f2legsvg.append("text").attr("x", 40).attr("y", 40).text("Budget").style("font-size", "15px").attr("alignment-baseline", "middle")


var f2margin = {
  top: 20,
  right: 180,
  bottom: 40,
  left: 180
},
  f2width = f2_slide.clientWidth - f2margin.left - f2margin.right,
  f2height = f2_slide.clientHeight * 0.73 - f2margin.top - f2margin.bottom;


var f2x = d3.scaleLinear()
  .range([0, f2width]);

var f2y = d3.scaleBand().rangeRound([0, f2height]);

var f2xAxis = d3.axisBottom()
  .scale(f2x)
  .ticks(5)
  .tickFormat(d => `${parseInt(d / 1000000)}M`);

var f2yAxis = d3.axisLeft()
  .scale(f2y)
  .tickSize(0)
  .tickPadding(10);

var f2svg = d3.select("#finance2-area").append("svg")
  .attr("width", f2width + f2margin.left + f2margin.right)
  .attr("height", f2height + f2margin.top + f2margin.bottom)
  .append("g")
  .attr("transform", "translate(" + f2margin.left + "," + f2margin.top + ")");

const f2xAxisGroup = f2svg.append("g")
  .attr("class", "x f2axis")
  .attr("transform", "translate(0," + f2height + ")")
const f2yAxisGroup = f2svg.append("g")
  .attr("class", "y f2axis")
  .attr("transform", "translate(" + 0 + ",0)")

var f2data1, f2data2, f2data3;

d3.json("data/top10profit.json", d1 => {
  f2data1 = d1
})

d3.json("data/top10ROI.json", d2 => {
  f2data2 = d2
})

d3.json("data/top10loss.json", d3 => {
  f2data3 = d3
})
var f2flagicon = 2


  

function update0() {
  if (f2flagicon == 0) {
    f2update_default(f2data_default);
    f2flagicon = 4;
  } else {
    f2update(f2data1);
    f2flagicon = 0
  }
}

function update1() {
  if (f2flagicon == 1) {
    f2update_default(f2data_default);
    f2flagicon = 4;
  } else {
    f2update(f2data2);
    f2flagicon = 1
  }
}

function update2() {
  if (f2flagicon == 2) {
    f2update_default(f2data_default);
    f2flagicon = 4;
  } else {
    f2update(f2data3);
    f2flagicon = 2
  }
}

function f2update(f2data) {
  f2x.domain([0,
    Math.max(d3.max(f2data, d => d.BoxOffice), d3.max(f2data, d => d.Budget))
  ]);

  f2y.domain(f2data.map(function (d) {
    return d.title;
  }));

  //Set Transition Period
  const t = d3.transition().duration(500);

  var barrect = f2svg.selectAll("rect")
    .data(f2data, d => d.ReleaseDate)

  var bartext = f2svg.selectAll("text")
    .data(f2data, d => d.ReleaseDate)

  barrect.exit().remove()
  bartext.exit().remove()


  barrect.enter().append("rect")
    .transition(t)
    .attr("class", function (d) {
      return "bar f2-bar-positive";
    })
    .attr("x", function (d) {
      return f2x(0);
    })
    .attr("y", function (d) {
      return f2y(d.title) + f2y.bandwidth() * 0.1;
    })
    .attr("width", function (d) {
      return Math.abs(f2x(d.BoxOffice) - f2x(0));
    })
    .attr("height", f2y.bandwidth() * 0.4)

  bartext.enter().append('text')
    .transition(t)
    .attr("text-anchor", "start")
    .attr("x", d => f2x(Math.min(0, d.BoxOffice)) + Math.abs(f2x(d.BoxOffice) - f2x(0)))
    .attr("y", d => f2y(d.title) + (f2y.bandwidth() * 0.3))
    .attr("dy", ".35em")
    .text(function (d) {
      return d3.format(".2f")(d.BoxOffice / 1000000);
    })

  //budget
  barrect.enter().append("rect")
    .transition(t)
    .attr("class", function (d) {
      return "bar f2-bar-negative";
    })
    .attr("x", function (d) {
      return f2x(Math.min(0, d.Budget));
    })
    .attr("y", d => f2y(d.title) + f2y.bandwidth() * 0.5)
    .attr("width", d => Math.abs(f2x(d.Budget) - f2x(0)))
    .attr("height", f2y.bandwidth() * 0.4)

  bartext.enter().append('text')
    .transition(t)
    .attr("text-anchor", "start")
    .attr("x", function (d) {
      return f2x(d.Budget);
    })
    .attr("y", function (d) {
      return f2y(d.title) + (f2y.bandwidth() * 0.7);
    })
    .attr("dy", ".35em")
    .text(function (d) {
      return d3.format(".2f")(d.Budget / 1000000);
    })

  f2xAxisGroup
    .transition(t)
    .call(f2xAxis);

  f2yAxisGroup
    .transition(t)
    .call(f2yAxis);
}

function f2update_default(f2data) {
  f2x.domain([0,
    Math.max(d3.max(f2data, d => d.BoxOffice), d3.max(f2data, d => d.Budget))
  ]);

  f2y.domain(f2data.map(function (d) {
    return d.title;
  }));

  //Set Transition Period
  const t = d3.transition().duration(500);

  var barrect = f2svg.selectAll("rect")
    .data(f2data, d => d.ReleaseDate)

  var bartext = f2svg.selectAll("text")
    .data(f2data, d => d.ReleaseDate)

  barrect.exit().remove()
  bartext.exit().remove()


  f2xAxisGroup
    .transition(t)
    .call(f2xAxis);

  f2yAxisGroup
    .transition(t)
    .call(f2yAxis);
}
