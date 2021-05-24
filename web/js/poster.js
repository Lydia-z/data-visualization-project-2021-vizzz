var width = 1200
var height = 700
var width_window = Math.min(1800, window.innerWidth)
var height_window = window.innerHeigh
var width_adjusted = width_window  - 300


// variables to initialize info
var title = "Fantasia"

var description = "Fantasia is a 1940 American animated film produced and originally released by Walt Disney Productions, with story direction by Joe Grant and Dick Huemer and production supervision by Walt Disney and Ben Sharpsteen. The third Disney animated feature film, it consists of eight animated segments set to pieces of classical music conducted by Leopold Stokowski, seven of which are performed by the Philadelphia Orchestra. Music critic and composer Deems Taylor acts as the film's Master of Ceremonies who introduces each segment in live action."
// svg for the poster_movie
var poster = d3.select("#poster_movie")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 450)
        .attr("transform", "translate("+ (width_adjusted/2 - 450)  + ","+ 10 +")");
var audioCtx = new(window.AudioContext || window.webkitAudioContext);

var song = new Audio();

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
    while (word = words.pop()) {
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width && line.length > 1) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
      }
    }
  })
}

// function to update poster_movie
function upload_poster(title,description){
          poster.selectAll("text").remove();
          poster.selectAll("image").remove();
          song.pause();

          song.src = "song/" + title + ".mp3";

          song.play();
          poster.append("svg:image")
            .attr('x', 50)
            .attr('y', 10)
            .attr('width', 246)
            .attr('height', 362)
            .attr("xlink:href", "poster/" + title + ".jpg");
          poster.append("text")
            .attr('x', 600)
            .attr('y', 90)
            .text(title)
            .attr("fill","#613659")
            .attr("font-size", "30px");
          poster.append("text")
            .attr("y", 120)
              .attr("dy",0)
            .attr("transform", "translate(400,0)")
            .text(description)
            .attr("font-size", "15px")
            .attr("font-weight", 900)
            .attr("fill","#613659")
            .call(wrap,600);
        }

// initialize header
//upload_poster("Fantasia");
//poster.selectAll("image").remove();
// Change info about games (header)
upload_poster(title,description);
