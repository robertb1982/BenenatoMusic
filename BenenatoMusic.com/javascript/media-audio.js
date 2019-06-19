var audio;
var audio2;

//Hide Pause Initially
$('#pause').hide();
$('#pause2').hide();
	
//Initializer - Play First Song
initAudio($('#playlist li:first-child'));
initAudio2($('#playlist2 li:first-child'));
	
function initAudio(element){
	var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

	//Create a New Audio Object
	audio = new Audio('media/' + song);
	
	if(!audio.currentTime){
		$('#duration').html('0.00');
	}

	$('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);
	
	//Insert Cover Image
	$('img.cover').attr('src','images/covers/' + cover);
	
	$('#playlist li').removeClass('active');
    element.addClass('active');
}

function initAudio2(element){
	var song2 = element.attr('songtwo');
    var title2 = element.text();
    var cover2 = element.attr('covertwo');
    var artist2 = element.attr('artisttwo');

	//Create a New Audio Object
	audio2 = new Audio('media/' + song2);
	
	if(!audio2.currentTime){
		$('#duration2').html('0.00');
	}

	$('#audio-player2 .title2').text(title2);
    $('#audio-player2 .artist2').text(artist2);
	
	//Insert Cover Image
	$('img.cover2').attr('src','images/covers/' + cover2);
	
	$('#playlist2 li').removeClass('active');
    element.addClass('active');
}


//Play Button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

$('#play2').click(function(){
	audio2.play();
	$('#play2').hide();
	$('#pause2').show();
	$('#duration2').fadeIn(400);
	showDuration2();
});

//Pause Button
$('#pause').click(function(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});

$('#pause2').click(function(){
	audio2.pause();
	$('#pause2').hide();
	$('#play2').show();
});
	
//Stop Button
$('#stop').click(function(){
	audio.pause();		
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
});

$('#stop2').click(function(){
	audio2.pause();		
	audio2.currentTime = 0;
	$('#pause2').hide();
	$('#play2').show();
	$('#duration2').fadeOut(400);
});

//Next Button
$('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
	audio.play();
	showDuration();
});

$('#next2').click(function(){
    audio2.pause();
    var next = $('#playlist2 li.active').next();
    if (next.length == 0) {
        next = $('#playlist2 li:first-child');
    }
    initAudio2(next);
	audio2.play();
	showDuration2();
});

//Prev Button
$('#prev').click(function(){
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
	audio.play();
	showDuration();
});

$('#prev2').click(function(){
    audio2.pause();
    var prev = $('#playlist2 li.active').prev();
    if (prev.length == 0) {
        prev = $('#playlist2 li:last-child');
    }
    initAudio2(prev);
	audio2.play();
	showDuration2();
});

//Playlist Song Click
$('#playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});

$('#playlist2 li').click(function () {
    audio2.pause();
    initAudio2($(this));
	$('#play2').hide();
	$('#pause2').show();
	$('#duration2').fadeIn(400);
	audio2.play();
	showDuration2();
});

//Volume Control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});

$('#volume2').change(function(){
	audio2.volume = parseFloat(this.value / 10);
});
	
//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + '.' + s);	
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');
	});
}

function showDuration2(){
	$(audio2).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio2.currentTime % 60);
		var m = parseInt((audio2.currentTime / 60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration2').html(m + '.' + s);	
		var value = 0;
		if (audio2.currentTime > 0) {
			value = Math.floor((100 / audio2.duration) * audio2.currentTime);
		}
		$('#progress2').css('width',value+'%');
	});
}