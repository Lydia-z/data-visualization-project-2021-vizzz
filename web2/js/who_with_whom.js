var svg = d3.select("#who_ww"),
    width = svg.node().getBoundingClientRect().width,
    height = svg.node().getBoundingClientRect().height;

var tooltip = d3.select("#tooltip").style("opacity", 0.8);
//console.log(svg.node()); // svg.node() return the <svg> element and everything inside

var datas = ["http://127.0.0.1:8080/data/directors.json","http://127.0.0.1:8080/data/producers.json","http://127.0.0.1:8080/data/music_directors.json"];
var colors = ["#613659", "#C197D2", "#D3B1C2"];
var svg_link, svg_node;
var buttonid;
var graph;

function loadData(button_id){
    buttonid = button_id;
    var ind = parseInt(button_id.split("_")[1]);

    // clean up svg
    svg.selectAll('*').remove();

    // load the data
    d3.json(datas[ind], function(error, data) {
        if (error) throw error;
        graph = data;
        setSimulation(graph);
        drawSVG(graph, colors[ind]);
  });
}

// init force simulation
var simulation = d3.forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());

// set up the simulation
function setSimulation(graph) {
    simulation.nodes(graph.nodes);
    updateForces(graph);
    simulation.on("tick", ticked);
}

// apply new force properties
function updateForces(graph) {
    // get each force by name and update the properties
    simulation.force("center")
              .x(width/2)
              .y(height/2);
    simulation.force("link")
        .id(function(d) {return d.name;})
        .distance(20)
        .iterations(1)
        .links(graph.links);
}

function drawSVG(graph, color) {
    // set the data and properties of link lines
    svg_link = svg.append("g")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke", "white")
            .attr("stroke-width", function(d) {return d.weight;})
            .attr("opacity", 0.5);

    // set the data and properties of node circles
    svg_node = svg.append("g")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr('r', function(d) {return 2*d.count;})
            .attr("fill", color)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
    svg_node.on('mouseover', mouseOver)
            .on('mouseout', mouseOut);
}

// update the display positions after each simulation tick
function ticked() {
    svg_node
        .attr("cx", function(d) { checkBounds(d); return d.x;})
        .attr("cy", function(d) { checkBounds(d); return d.y;});

    svg_link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
}

function mouseOver(d){
    var tooltipHtml = "<span>" + d.name + "："+ d.count + " movies.</span>";
    var pad_top = (630*0.2+d.y-5)>height/2 ? 630*0.2+d.y-25 : 630*0.2+d.y+5;
    var pad_left = (d.x+10)>width/2 ? d.x-100 : d.x+10;
    tooltip.transition()
            .duration(100)
            .style("opacity", 0.8);
    tooltip.html(tooltipHtml)
            .style("top", pad_top+"px")
            .style("left", pad_left+"px");

}

function mouseOut(){
	tooltip.transition()
           .duration(100)
           .style("opacity", 0);
}

function dragstarted(d) {
    if (!d3.event.active){
        simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    if(d3.event.x > 50 && d3.event.x < width-50){
        d.fx = d3.event.x;
    }
    if(d3.event.y > 50 && d3.event.y < height-50){
        d.fy = d3.event.y;
    }
}

function dragended(d) {
    if (!d3.event.active){
        simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
}

function checkBounds(d){
    if (d.x < 50) d.x = 50;
    if (d.x > width-50) d.x = width-50;
    if (d.y < 50) d.y = 50;
    if (d.y > height-50) d.y = height-50;
}

// inititally show director network
loadData("www_0");

// update size-related forces
d3.select(window).on("resize", function(){
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;
    loadData(buttonid);
});
