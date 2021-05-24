var char_name = ["Buzz Lightyear","Jessie","Alien","Dumbo","Stitch","Princess Jasmine","Donald Duck","Slinky Dog","Tinker Bell","Bambi"]
var res = document.getElementById('respond');

function color_char(id_name){
	var ind = parseInt(id_name.split("_")[1]);
	var text = char_name[ind] + "? Nice choice!";
	res.innerHTML = text;

	//color the image
	var image = document.getElementById(id_name);
	image.style.filter = 'grayscale(0%)';
}
