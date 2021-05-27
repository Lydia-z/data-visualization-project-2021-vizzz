var margin = {
  top: 50,
  right: 100,
  bottom: 100,
  left: 150
},
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// time parsers/formatters
const parseTime = d3.timeParse("%Y-%m-%d")
const formatTime = d3.timeFormat("%d/%m/%Y")

var sliderRange = d3.sliderBottom()
.min(parseTime("1940-02-07").getTime())
.max(parseTime("2020-03-09").getTime())
.width(width)
.tickFormat(formatTime)
.ticks(6)
.default([parseTime("1940-02-07").getTime(), parseTime("2020-03-09").getTime()])
.fill('#2196f3')
;

var gRange = d3
.select('#f1-slider-range')
.append('svg')
.attr('width', width + margin.left + margin.right)
.attr('height', 100)
.append('g')
.attr("transform", "translate(" + margin.left + "," + 30 + ")")

d3.json("http://localhost:8080/financeplots/finance1/data/data_finance.json", function (data) {


  // Initialize Date Slider
    sliderRange
    .min(d3.min(data, d => d.Budget / 100000000))
    .max(d3.max(data, d => d.Budget / 100000000))
    .on('onchange', val => {
      updateslider();
      updatefinance1svg(data);
    })



  gRange.call(sliderRange);

  d3.select('#f1-value-range').text("Rating V.S. Budget for Films");

  // Initialize Svg area
  var svg = d3.select("#finance1-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Initialize Axis Labels - not changing
  const xLabel = svg.append("text")
    .attr("class", "x_axisLabel")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .text("Budget")

  const yLabel = svg.append("text")
    .attr("class", "y_axisLabel")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -120)
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .text("IMDB score")

  // Initialize Scale
  var x = d3.scaleLog()
    .range([0, width])
    .base(10);

  var y = d3.scaleLinear()
    .range([height, 0]);

  var cscale = d3.scaleLog()
    .range([0, 255])
    .base(10);

  // Set base axis
  const xAxisGroup = svg.append("g")
    .attr("class", "x_axis")
    .attr("transform", "translate(0," + height + ")");

  const yAxisGroup = svg.append("g")
    .attr("class", "y_axis")
    .attr("transform", "translate(" + x(0) + ",0)");


  // Set Tooltips
  var tip = d3.tip()
    .attr('class', 'finance1_tip')
    .html(d => {
      let text = `<strong>Title:</strong> <span style='color:red;text-transform:capitalize'>${d.title}</span><br>`
      text += `<strong>Budget:</strong> <span style='color:red;text-transform:capitalize'>${d.Budget}</span><br>`
      text += `<strong>Box Office:</strong> <span style='color:red'>${d.BoxOffice}</span><br>`
      text += `<strong>IMDB:</strong> <span style='color:red'>${d.imdb}</span><br>`
      return text
    })
  svg.call(tip)

  // Initialize axis
  x.domain([
    d3.min(data, d => d.Budget),
    d3.max(data, d => d.Budget)
  ]);

  y.domain([
    d3.min(data, d => d.imdb),
    d3.max(data, d => d.imdb)
  ]);

  cscale.domain([
    d3.min(data, d => d.BoxOffice),
    d3.max(data, d => d.BoxOffice)
  ])

  // Format X axis
  var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(3)
    .tickFormat(d => `${parseInt(d / 1000000)}M`);

  xAxisGroup.call(xAxis);

  var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(5);

  yAxisGroup.call(yAxis);

  const circle_finance1 = svg.selectAll("circle")
    .data(data)

  circle_finance1.enter().append("circle")
    .attr("cx", d => x(d.Budget))
    .attr("cy", d => y(d.imdb))
    .attr("r", d => 3)
    .attr("fill", function (d) {
      return "rgb(" + cscale(d.BoxOffice) + "," + 0 + ",0)"
    })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
});

function updatefinance1svg(data) {
  const sliderValues = sliderRange.value()

  //Select Data based on filtered time slider
  const dataTimeFiltered = data.filter(d => {
    return ((parseTime(d.ReleaseDate).getTime() >= sliderValues[0]) && (parseTime(d.ReleaseDate).getTime() <= sliderValues[1]))
  })

  //Set Transition Period
  const t = d3.transition().duration(500);

  // Initialize axis
  x.domain([
    d3.min(dataTimeFiltered, d => d.Budget),
    d3.max(dataTimeFiltered, d => d.Budget)
  ]);

  y.domain([
    d3.min(dataTimeFiltered, d => d.imdb),
    d3.max(dataTimeFiltered, d => d.imdb)
  ]);

  cscale.domain([
    d3.min(dataTimeFiltered, d => d.BoxOffice),
    d3.max(dataTimeFiltered, d => d.BoxOffice)
  ])

  // Update axis
  var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(2)
    .tickFormat(d => `${parseInt(d / 1000000)}M`);

  xAxisGroup.transition(t).call(xAxis);

  var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(5);

  yAxisGroup.transition(t).call(yAxis);

  // Update plot
  const circle_finance1 = svg.selectAll("circle")
    .data(dataTimeFiltered, d => d.ReleaseDate)

  circle_finance1.exit()
    .transition().duration(200)
    .remove();

  circle_finance1
    .attr("fill", function (d) {
      return "rgb(" + cscale(d.BoxOffice) + "," + 0 + ",0)"
    })
    .transition(t)
    .attr("cx", d => x(d.Budget))
    .attr("cy", d => y(d.imdb))
    .attr("r", d => 3);

  circle_finance1.enter()
    .append("circle")
    //.transition().duration(200)
    .merge(circle_finance1)
    .attr("cx", d => x(d.Budget))
    .attr("cy", d => y(d.imdb))
    .attr("r", d => 3)
    .attr("fill", function (d) {
      return "rgb(" + cscale(d.BoxOffice) + "," + 0 + ",0)"
    })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  svg.call(tip)
}

function updateslider() {
  //Update time slider
  const sliderValues = sliderRange.value()
  d3.select('#f1-value-range').text("Rating V.S. Budget for Films issued " + formatTime(sliderValues[0]) + ' - ' + formatTime(sliderValues[1]));
}