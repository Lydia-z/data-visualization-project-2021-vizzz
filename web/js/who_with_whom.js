var svg_www = d3.select("#who_ww"),
    width_www = svg_www.node().getBoundingClientRect().width,
    height_www = svg_www.node().getBoundingClientRect().height;

var tooltip_www = d3.select("#tooltip").style("opacity", 0.8);
//console.log(svg.node()); // svg.node() return the <svg> element and everything inside

var datas_www = ["./data/directors.json","./data/producers.json","./data/music_directors.json"];
//console.log(datas_www);
var colors_www = ["#613659", "#C197D2", "#D3B1C2"];
var svg_link_www, svg_node_www;
var buttonid_www;
var graph_www;

function loadData(button_id){
    buttonid_www = button_id;
    var ind = parseInt(button_id.split("_")[1]);

    // clean up svg
    svg_www.selectAll('*').remove();

    // load the data
    d3.json(datas_www[ind], function(error, data) {
        if (error) throw error;
        graph_www = data;
        setSimulation(graph_www);
        drawSVG(graph_www, colors_www[ind]);
  });
}

// init force simulation
var simulation_www = d3.forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());

// set up the simulation
function setSimulation(graph) {
    simulation_www.nodes(graph_www.nodes);
    updateForces(graph_www);
    simulation_www.on("tick", ticked);
}

// apply new force properties
function updateForces(graph) {
    // get each force by name and update the properties
    simulation_www.force("center")
              .x(width_www/2)
              .y(height_www/2);
    simulation_www.force("link")
        .id(function(d) {return d.name;})
        .distance(20)
        .iterations(1)
        .links(graph_www.links);
}

function drawSVG(graph, color) {
    // set the data and properties of link lines
    svg_link_www = svg_www.append("g")
            .selectAll("line")
            .data(graph_www.links)
            .enter().append("line")
            .attr("stroke", "white")
            .attr("stroke-width", function(d) {return d.weight;})
            .attr("opacity", 0.5);

    // set the data and properties of node circles
    svg_node_www = svg_www.append("g")
            .selectAll("circle")
            .data(graph_www.nodes)
            .enter().append("circle")
            .attr('r', function(d) {return 2*d.count;})
            .attr("fill", color)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .call(d3.drag()
                .on("start", dragstarted_www)
                .on("drag", dragged_www)
                .on("end", dragended_www));
    svg_node_www.on('mouseover', mouseOver_www)
            .on('mouseout', mouseOut_www);
}

// update the display positions after each simulation tick
function ticked() {
    svg_node_www
        .attr("cx", function(d) { checkBounds(d); return d.x;})
        .attr("cy", function(d) { checkBounds(d); return d.y;});

    svg_link_www
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
}

function mouseOver_www(d){
    var tooltipHtml = "<span>" + d.name + "："+ d.count + " movies.</span>";
    var pad_top = (630*0.2+d.y-5)>height/2 ? 630*0.2+d.y-25 : 630*0.2+d.y+5;
    var pad_left = (d.x+10)>width/2 ? d.x-100 : d.x+10;
    tooltip_www.transition()
            .duration(100)
            .style("opacity", 0.8);
    tooltip_www.html(tooltipHtml)
            .style("top", pad_top+"px")
            .style("left", pad_left+"px");

}

function mouseOut_www(){
	tooltip_www.transition()
           .duration(100)
           .style("opacity", 0);
}

function dragstarted_www(d) {
    if (!d3.event.active){
        simulation_www.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged_www(d) {
    if(d3.event.x > 50 && d3.event.x < width-50){
        d.fx = d3.event.x;
    }
    if(d3.event.y > 50 && d3.event.y < height-50){
        d.fy = d3.event.y;
    }
}

function dragended_www(d) {
    if (!d3.event.active){
        simulation_www.alphaTarget(0);
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
    width_www = svg_www.node().getBoundingClientRect().width;
    height_www = svg_www.node().getBoundingClientRect().height;
    loadData(buttonid_www);
});
