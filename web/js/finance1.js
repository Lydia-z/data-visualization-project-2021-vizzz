  var f1data;

  d3.json("data/data_finance.json", d => {
    f1data = d;
  })

  var f1slide = document.getElementById('f1_slide');
  var f1title = document.getElementById('f1-value-range');

  var f1margin = {
      top: 50,
      right: 100,
      bottom: 60,
      left: 100
    },
    f1width = f1slide.clientWidth*0.7 - f1margin.left - f1margin.right,
    f1height = f1slide.clientWidth*0.35 - f1margin.top - f1margin.bottom;
  
  // time parsers/formatters
  const f1parseTime = d3.timeParse("%Y-%m-%d")
  const f1formatTime = d3.timeFormat("%d/%m/%Y")
  
  // Initialize Date Slider
  var f1sliderRange = d3.sliderBottom()
    .min(f1parseTime("1940-02-07").getTime())
    .max(f1parseTime("2020-03-09").getTime())
    .width(f1width-10)
    .tickFormat(f1formatTime)
    .ticks(6)
    .default([f1parseTime("1940-02-08").getTime(), f1parseTime("2020-03-09").getTime()])
    .fill('#9035c4')
    .on('onchange', val => {
      updateslider();
      updatefinance1svg(f1data);
    });
  
  var f1gRange = d3
    .select('#f1-slider-range')
    .append('svg')
    .attr('width', f1width + f1margin.left + f1margin.right)
    .attr('height', 100)
    .append('g')
    .attr("transform", "translate(" + f1margin.left + "," + 30 + ")")
  
  f1gRange.call(f1sliderRange);
  
  //d3.select('#f1-value-range').text("Rating V.S. Budget for Films");
  f1title.innerHTML = "Rating V.S. Budget for Films";
  
  // Initialize Svg area
  var f1svg = d3.select("#finance1-area").append("svg")
    .attr("width", f1width + f1margin.left + f1margin.right)
    .attr("height", f1height + f1margin.top + f1margin.bottom)
    .append("g")
    .attr("transform", "translate(" + f1margin.left + "," + f1margin.top + ")");
  
  // Initialize Axis Labels - not changing
  const f1xLabel = f1svg.append("text")
    .attr("class", "x axisLabel")
    .attr("y", f1height + 50)
    .attr("x", f1width / 2)
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .text("Budget")
  
  const f1yLabel = f1svg.append("text")
    .attr("class", "y axisLabel")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -120)
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .text("IMDB score")
  
  // Initialize Scale
  var f1x = d3.scaleLog()
    .range([0, f1width])
    .base(10);
  
  var f1y = d3.scaleLinear()
    .range([f1height, 0]);
  
  var cscale = d3.scaleLog()
    .range([0, 255])
    .base(10);
    
  var c1scale = d3.scaleLog()
    .range([97, 195])
    .base(10);
    
  var c2scale = d3.scaleLog()
    .range([54, 192])
    .base(10);
    
  var c3scale = d3.scaleLog()
    .range([89, 207])
    .base(10);
    
  // Set base axis
  const f1xAxisGroup = f1svg.append("g")
    .attr("class", "x f1axis")
    .attr("transform", "translate(0," + f1height + ")");
  
  const f1yAxisGroup = f1svg.append("g")
    .attr("class", "y f1axis");
    //.attr("transform", "translate(" + f1x(0) + ",0)");
  
  
  // Set Tooltips
  var f1tip = d3.tip()
    .attr('class', 'finance1_tip')
    .html(d => {
      let text = `<strong>Title:</strong> <span style='color:#D3B1C2;text-transform:capitalize'>${d.title}</span><br>`
      text += `<strong>Budget:</strong> <span style='color:#D3B1C2;text-transform:capitalize'>${d.Budget}</span><br>`
      text += `<strong>Box Office:</strong> <span style='color:#D3B1C2'>${d.BoxOffice}</span><br>`
      text += `<strong>IMDB:</strong> <span style='color:#D3B1C2'>${d.imdb}</span><br>`
      return text
    })
  f1svg.call(f1tip)
  
  
  
  // // Initialize axis
  updatefinance1svg(f1data)
  // f1sliderRange.value([f1parseTime("1940-02-07").getTime(), f1parseTime("2020-03-09").getTime()])
  
  function updatefinance1svg(dataup) {
    const sliderValues = f1sliderRange.value()
  
    //Select Data based on filtered time slider
    const dataTimeFiltered = dataup.filter(d => {
      return ((f1parseTime(d.ReleaseDate).getTime() >= sliderValues[0]) && (f1parseTime(d.ReleaseDate).getTime() <= sliderValues[1]))
    })
  
    //Set Transition Period
    const t = d3.transition().duration(500);
  
    // Initialize axis
    f1x.domain([
      d3.min(dataTimeFiltered, d => d.Budget),
      d3.max(dataTimeFiltered, d => d.Budget)
    ]);
  
    f1y.domain([
      d3.min(dataTimeFiltered, d => d.imdb),
      d3.max(dataTimeFiltered, d => d.imdb)
    ]);
  
    cscale.domain([
      d3.min(dataTimeFiltered, d => d.BoxOffice),
      d3.max(dataTimeFiltered, d => d.BoxOffice)
    ])
    
    c1scale.domain([
      d3.min(dataTimeFiltered, d => d.BoxOffice),
      d3.max(dataTimeFiltered, d => d.BoxOffice)
    ])
    
    c2scale.domain([
      d3.min(dataTimeFiltered, d => d.BoxOffice),
      d3.max(dataTimeFiltered, d => d.BoxOffice)
    ])
    
    c3scale.domain([
      d3.min(dataTimeFiltered, d => d.BoxOffice),
      d3.max(dataTimeFiltered, d => d.BoxOffice)
    ])
  
    // Update axis
    var f1xAxis = d3.axisBottom()
      .scale(f1x)
      .ticks(2)
      .tickFormat(d => `${parseInt(d / 1000000)}M`);
  
    f1xAxisGroup.transition(t).call(f1xAxis);
  
    var f1yAxis = d3.axisLeft()
      .scale(f1y)
      .ticks(5);
  
    f1yAxisGroup.transition(t).call(f1yAxis);
  
    // Update plot
    const circle_finance1 = f1svg.selectAll("circle")
      .data(dataTimeFiltered, d => d.ReleaseDate)
  
    circle_finance1.exit()
    .transition().duration(200)
    .remove();
  
    circle_finance1
      .attr("fill", function(d) {
        return "rgb(" + c1scale(d.BoxOffice) + "," + c2scale(d.BoxOffice) + "," + c3scale(d.BoxOffice) + ")"
      })
      .transition(t)
      .attr("cx", d => f1x(d.Budget))
      .attr("cy", d => f1y(d.imdb))
      .attr("r", d => 3);
  
    circle_finance1.enter()
      .append("circle")
      //.transition().duration(200)
      .merge(circle_finance1)
      .attr("cx", d => f1x(d.Budget))
      .attr("cy", d => f1y(d.imdb))
      .attr("r", d => 3)
      .attr("fill", function(d) {
      return "rgb(" + c1scale(d.BoxOffice) + "," + c2scale(d.BoxOffice) + "," + c3scale(d.BoxOffice) + ")"
    })
      .on("mouseover", f1tip.show)
      .on("mouseout", f1tip.hide);
  
    f1svg.call(f1tip)
  }
  
  function updateslider() {
    //Update time slider
    const sliderValues = f1sliderRange.value()
    //d3.select('#f1-value-range').text("Rating V.S. Budget for Films issued" + f1formatTime(sliderValues[0]) + ' - ' + f1formatTime(sliderValues[1]));
    f1title.innerHTML = "Rating V.S. Budget for Films <br> issued " + f1formatTime(sliderValues[0]) + ' - ' + f1formatTime(sliderValues[1]);
    console.log(f1title);
  }