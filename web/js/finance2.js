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

var margin = {
    top: 20,
    right: 100,
    bottom: 40,
    left: 250
  },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


var x = d3.scaleLinear()
  .range([0, width]);

var y = d3.scaleBand().rangeRound([0, height]);

var xAxis = d3.axisBottom()
  .scale(x)
  .ticks(5)
  .tickFormat(d => `${parseInt(d / 1000000)}M`);

var yAxis = d3.axisLeft()
  .scale(y)
  .tickSize(0)
  .tickPadding(10);

var svg = d3.select("#finance2-area").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const xAxisGroup = svg.append("g")
  .attr("class", "x f2axis")
  .attr("transform", "translate(0," + height + ")")
const yAxisGroup = svg.append("g")
  .attr("class", "y f2axis")
  .attr("transform", "translate(" + 0 + ",0)")

d3.json("http://localhost:8080/financeplots/finance2/data/top10profit.json", function(data1) {
  d3.json("http://localhost:8080/financeplots/finance2/data/top10ROI.json", function(data2) {
    d3.json("http://localhost:8080/financeplots/finance2/data/top10loss.json", function(data3) {
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
  x.domain([0,
    Math.max(d3.max(data, d => d.BoxOffice), d3.max(data, d => d.Budget))
  ]);

  y.domain(data.map(function(d) {
    return d.title;
  }));

  //Set Transition Period
  const t = d3.transition().duration(500);

  var barrect = svg.selectAll("rect")
    .data(data, d => d.ReleaseDate)

  var bartext = svg.selectAll("text")
    .data(data, d => d.ReleaseDate)

  barrect.exit().remove()
  bartext.exit().remove()


  barrect.enter().append("rect")
    .transition(t)
    .attr("class", function(d) {
      return "bar bar--positive";
    })
    .attr("x", function(d) {
      return x(0);
    })
    .attr("y", function(d) {
      return y(d.title) + y.bandwidth() * 0.1;
    })
    .attr("width", function(d) {
      return Math.abs(x(d.BoxOffice) - x(0));
    })
    .attr("height", y.bandwidth() * 0.4)

  bartext.enter().append('text')
    .transition(t)
    .attr("text-anchor", "start")
    .attr("x", d => x(Math.min(0, d.BoxOffice)) + Math.abs(x(d.BoxOffice) - x(0)))
    .attr("y", d => y(d.title) + (y.bandwidth() * 0.3))
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
      return x(Math.min(0, d.Budget));
    })
    .attr("y", d => y(d.title) + y.bandwidth() * 0.5)
    .attr("width", d => Math.abs(x(d.Budget) - x(0)))
    .attr("height", y.bandwidth() * 0.4)

  bartext.enter().append('text')
    .transition(t)
    .attr("text-anchor", "start")
    .attr("x", function(d) {
      return x(d.Budget);
    })
    .attr("y", function(d) {
      return y(d.title) + (y.bandwidth() * 0.7);
    })
    .attr("dy", ".35em")
    .text(function(d) {
      return d3.format(".2f")(d.Budget / 1000000);
    })

  xAxisGroup
    .transition(t)
    .call(xAxis);

  yAxisGroup
    .transition(t)
    .call(yAxis);
}

function update_default(data) {
  x.domain([0,
    Math.max(d3.max(data, d => d.BoxOffice), d3.max(data, d => d.Budget))
  ]);

  y.domain(data.map(function(d) {
    return d.title;
  }));

  //Set Transition Period
  const t = d3.transition().duration(500);

  var barrect = svg.selectAll("rect")
    .data(data, d => d.ReleaseDate)

  var bartext = svg.selectAll("text")
    .data(data, d => d.ReleaseDate)

  barrect.exit().remove()
  bartext.exit().remove()


  xAxisGroup
    .transition(t)
    .call(xAxis);

  yAxisGroup
    .transition(t)
    .call(yAxis);
}    
    
    
    
    
    
    
    
    