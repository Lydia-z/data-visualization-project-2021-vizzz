//the button will show after 6 seconds
var button = document.getElementById('welcome_button');
var sec = 6;
var intervalId = undefined;
var intervalId = setInterval(function(){
	if (sec < 1) {
		clearInterval(intervalId);
		document.getElementById('welcome_button').style.visibility = 'visible';
	}
	sec--;
}, 1000);

//the button will show after the video finish playing
//var video = document.getElementById('bgvideo');
//video.onended = function() {
//	document.getElementById('welcome_button').style.visibility = 'visible';
//};