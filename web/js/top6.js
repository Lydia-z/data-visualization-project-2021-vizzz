const char_fact = ["Mickey Mouse is a funny animal cartoon character and the official mascot of The Walt Disney Company. He was created by Walt Disney and Ub Iwerks at the Walt Disney Studios in 1928.",
"Donald Duck is a cartoon character created in 1934 at Walt Disney Productions. Donald is good friend of Mickey Mouse.",
"The Genie is a jinn appearing in the Aladdin franchise from Disney. He is never given a proper name. He was portrayed by Robin Williams in the first film.",
"Snow White is a fictional character from Disney's first ever film, Snow White and the Seven Dwarves. She is Disney's first ever Disney Princess and is the only Disney Princess to have her own star on the Hollywood Walk of Fame.",
"Goofy is a funny-animal cartoon character created in 1932 at Walt Disney Productions. Goofy is a close friend of Mickey Mouse and Donald Duck and is one of Disney's most recognizable characters. He is normally characterized as clumsy and dimwitted, occasionally Goofy is shown as intuitive, and clever, albeit in his own unique, eccentric way.",
"Simba is a fictional character who appears in Disney's The Lion King franchise. Introduced in Walt Disney Animation's 32nd animated feature film The Lion King (1994), the character subsequently appears in its sequels The Lion King II: Simba's Pride (1998) and The Lion King 1½ (2004)."];

const char1_com = ["Mickey Mouse is the most iconic Disney character, and he is super powerful. Anyone who doesn’t think so should play Kingdom Hearts. Anyone in general should play Kingdom Hearts. It is a great game.",
"Mickey is the beginning of the long-lasting legacy of Disney. He's always cheerful and funny which gives everyone a positive feeling. Mickey rules!",
"What else to say a legend and the one that made Disney what it is today.",
"He revived the cartoon industry."];

const char2_com = ["Who doesn't love Donald? His mischievous behavior, his speech, and his bad temper make it all worth it. Not to mention, his temper makes him a quite relatable character. He's a great character!",
"If there's one thing Donald can do, it's putting a smile on your face. You know how many times he nearly put Mickey Mouse out of buisness? Mickey may be the most famous but Donald is the best and will always be the best.",
"Mickey is more famous, but Donald Duck is more popular. that is the reason why he has his own magazine in the Netherlands."];

const char3_com = ["So full of magical energy and makes the funniest jokes of any Disney character.",
"He made me embarrass myself so I love him for it.",
"Genie is super funny, how can you not like him?",
"I really like him in the live action movie.",
"Best Disney Character.",
"Genie is soooooo funny, he's the reason why I enjoyed the Aladdin movie."]

const char4_com = ["Many people say that she is so typical and all she does is cook and clean, but she cleaned because she hoped the owners of the cottage would let her stay there. She also was the only Disney Princess to boss around seven old men to make them wash up for dinner. Her voice is lovely and she is kind to everyone.",
"She's so classic and the first one, my favourite Disney princess and in my favourite disney princess movie.",
"The first princess that started it all."];

const char5_com = ["Goofy is my favorite character in the Mickey and Friends! He's so goofy, fun, and funny!",
"Hence the name GOOFY!"];

const char6_com = ["He is my favourite protagonist from Disney!",
"Just cute and clever!",
"One of the Best."];

var ranking = document.getElementById('char_rank');
var fact = document.getElementById('char_fact');
var comments = document.getElementById('char_comment');

document.getElementById('character_1').addEventListener('click', function (e) {
	ranking.textContent = "#1 Mickey Mouse";
	fact.innerHTML = char_fact[0]+'<br><br>';
	var coms = "";
	for(i = 0; i < char1_com.length; i++){
		coms += "\"";
		coms += char1_com[i];
		coms += "\" <br><br>";

	}
	comments.innerHTML = coms;
});

document.getElementById('character_2').addEventListener('click', function (e) {
	ranking.textContent = "#2 Donald Duck";
	fact.innerHTML = char_fact[1]+'<br><br>';
	var coms = "";
	for(i = 0; i < char2_com.length; i++){
		coms += "\"";
		coms += char2_com[i];
		coms += "\" <br><br>";
	}
	comments.innerHTML = coms;
});

document.getElementById('character_3').addEventListener('click', function (e) {
	ranking.textContent = "#3 Genie";
	fact.innerHTML = char_fact[2]+'<br><br>';
	var coms = "";
	for(i = 0; i < char3_com.length; i++){
		coms += "\"";
		coms += char3_com[i];
		coms += "\" <br><br>";
	}
	comments.innerHTML = coms;
});

document.getElementById('character_4').addEventListener('click', function (e) {
	ranking.textContent = "#4 Snow White";
	fact.innerHTML = char_fact[3]+'<br><br>';
	var coms = "";
	for(i = 0; i < char4_com.length; i++){
		coms += "\"";
		coms += char4_com[i];
		coms += "\" <br><br>";
	}
	comments.innerHTML = coms;
});

document.getElementById('character_5').addEventListener('click', function (e) {
	ranking.textContent = "#5 Goofy";
	fact.innerHTML = char_fact[4]+'<br><br>';
	var coms = "";
	for(i = 0; i < char5_com.length; i++){
		coms += "\"";
		coms += char5_com[i];
		coms += "\" <br><br>";
	}
	comments.innerHTML = coms;
});

document.getElementById('character_6').addEventListener('click', function (e) {
	ranking.textContent = "#6 Simba";
	fact.innerHTML = char_fact[5]+'<br><br>';
	var coms = "";
	for(i = 0; i < char6_com.length; i++){
		coms += "\"";
		coms += char6_com[i];
		coms += "\" <br><br>";
	}
	comments.innerHTML = coms;
});