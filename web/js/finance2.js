var data_default = [{
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

var f2margin = {
    top: 20,
    right: 100,
    bottom: 40,
    left: 250
  },
  f2width = 600 - f2margin.left - f2margin.right,
  f2height = 400 - f2margin.top - f2margin.bottom;


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
  .attr("f2width", f2width + f2margin.left + f2margin.right)
  .attr("f2height", f2height + f2margin.top + f2margin.bottom)
  .append("g")
  .attr("transform", "translate(" + f2margin.left + "," + f2margin.top + ")");

const f2xAxisGroup = f2svg.append("g")
  .attr("class", "x f2axis")
  .attr("transform", "translate(0," + f2height + ")")
const f2yAxisGroup = f2svg.append("g")
  .attr("class", "y f2axis")
  .attr("transform", "translate(" + 0 + ",0)")

d3.json("http://localhost:8080/web/data/top10profit.json", function(data1) {
  d3.json("http://localhost:8080/web/data/top10ROI.json", function(data2) {
    d3.json("http://localhost:8080/web/data/top10loss.json", function(data3) {
      var flagicon = 2
      update(data3)
    });
  });
});


    
function update0(data) {
  if (flagicon == 0) {
    update_default(data_default);
    flagicon = 4;
  } else {
    update(data);
    flagicon = 0
  }
}    
    
function update1(data) {
  if (flagicon == 1) {
    update_default(data_default);
    flagicon = 4;
  } else {
    update(data);
    flagicon = 1
  }
}    
    
function update2(data) {
  if (flagicon == 2) {
    update_default(data_default);
    flagicon = 4;
  } else {
    update(data);
    flagicon = 2
  }
}    
    
function update(data) {
  f2x.domain([0,
    Math.max(d3.max(data, d => d.BoxOffice), d3.max(data, d => d.Budget))
  ]);

  f2y.domain(data.map(function(d) {
    return d.title;
  }));

  //Set Transition Period
  const t = d3.transition().duration(500);

  var barrect = f2svg.selectAll("rect")
    .data(data, d => d.ReleaseDate)

  var bartext = f2svg.selectAll("text")
    .data(data, d => d.ReleaseDate)

  barrect.exit().remove()
  bartext.exit().remove()


  barrect.enter().append("rect")
    .transition(t)
    .attr("class", function(d) {
      return "bar bar--positive";
    })
    .attr("x", function(d) {
      return f2x(0);
    })
    .attr("y", function(d) {
      return f2y(d.title) + f2y.bandf2width() * 0.1;
    })
    .attr("f2width", function(d) {
      return Math.abs(f2x(d.BoxOffice) - f2x(0));
    })
    .attr("f2height", f2y.bandf2width() * 0.4)

  bartext.enter().append('text')
    .transition(t)
    .attr("text-anchor", "start")
    .attr("x", d => f2x(Math.min(0, d.BoxOffice)) + Math.abs(f2x(d.BoxOffice) - f2x(0)))
    .attr("y", d => f2y(d.title) + (f2y.bandf2width() * 0.3))
    .attr("dy", ".35em")
    .text(function(d) {
      return d3.format(".2f")(d.BoxOffice / 1000000);
    })

  //budget
  barrect.enter().append("rect")
    .transition(t)
    .attr("class", function(d) {
      return "bar bar--negative";
    })
    .attr("x", function(d) {
      return f2x(Math.min(0, d.Budget));
    })
    .attr("y", d => f2y(d.title) + f2y.bandf2width() * 0.5)
    .attr("f2width", d => Math.abs(f2x(d.Budget) - f2x(0)))
    .attr("f2height", f2y.bandf2width() * 0.4)

  bartext.enter().append('text')
    .transition(t)
    .attr("text-anchor", "start")
    .attr("x", function(d) {
      return f2x(d.Budget);
    })
    .attr("y", function(d) {
      return f2y(d.title) + (f2y.bandf2width() * 0.7);
    })
    .attr("dy", ".35em")
    .text(function(d) {
      return d3.format(".2f")(d.Budget / 1000000);
    })

  f2xAxisGroup
    .transition(t)
    .call(f2xAxis);

  f2yAxisGroup
    .transition(t)
    .call(f2yAxis);
}

function update_default(data) {
  f2x.domain([0,
    Math.max(d3.max(data, d => d.BoxOffice), d3.max(data, d => d.Budget))
  ]);

  f2y.domain(data.map(function(d) {
    return d.title;
  }));

  //Set Transition Period
  const t = d3.transition().duration(500);

  var barrect = f2svg.selectAll("rect")
    .data(data, d => d.ReleaseDate)

  var bartext = f2svg.selectAll("text")
    .data(data, d => d.ReleaseDate)

  barrect.exit().remove()
  bartext.exit().remove()


  f2xAxisGroup
    .transition(t)
    .call(f2xAxis);

  f2yAxisGroup
    .transition(t)
    .call(f2yAxis);
}    
    
    
    
    
    
    
    
    