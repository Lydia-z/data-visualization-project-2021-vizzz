var char_name = ["Buzz Lightyear! Do you know his name was in honor of Edwin \"Buzz\" Aldrin, the second person to walk on the Moon?",
				"Jessie? She is a super cool cow girl!",
				"The Alien! Wish you have the claw!",
				"Jumbo Jr. Dumbo is also a cute nickname.",
				"Stitch! He does look like a blue koala!",
				"Princess Jasmine? She is the first non-Caucasian princess!",
				"Donald Duck? He is an old popular one!",
				"Slinky Dog? Do you also like his graveled Southern accent?",
				"Tinker Bell? She is definitely one of Disney’s most popular and iconic characters!",
				"Bambi! He is a mule deer from Arrowhead, California!"]
var res = document.getElementById('respond');

function color_char(id_name){
	console.log(id_name);
	var ind = parseInt(id_name.split("_")[1]);
	var text = char_name[ind];
	res.innerHTML = text;

	//color the image
	var image = document.getElementById(id_name);
	image.style.filter = 'grayscale(0%)';
}