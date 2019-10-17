
$(document).ready(function(){
    //questions
    $('.question-item').on('click', function() {
        var openQuestion = $('.open');
        $(this).toggleClass('open').find('.question-item__vertical').toggleClass('question-item__vertical--open');
        openQuestion.not(this).find('.question-item__text').slideToggle();
        openQuestion.not(this).toggleClass('open').find('.question-item__vertical').toggleClass('question-item__vertical--open');
        $(this).find('.question-item__text').slideToggle();

    });
    /////////video/////////////////
    const videoItem = $('.video-group__item');
    videoItem.each((idx,item)=>{
        var playButton = $(item).find('.video-group__play');
        var pauseButton = $(item).find('.video-group__pause');
        var redoButton = $(item).find('.video-group__redo');
        var durationBlock = $(item).find('.video-group__duration');
        $(item).find('video').attr('id','player-'+idx);
        var player = videojs('player-'+idx, {controls: false,}, function() {
            this.on('ended', function() {
                pauseButton.hide();
                redoButton.show();
                durationBlock.show();
            });
        })
        playButton.on('click',function () {
            player.play();
            $(this).hide();
            durationBlock.hide();
            pauseButton.show();


        })
        redoButton.on('click',function () {
            player.play();
            $(this).hide();
            pauseButton.show();
            durationBlock.hide();

        })
        pauseButton.on('click',function () {
            player.pause();
            $(this).hide();
            playButton.show();
        })



    })
    //////////////callback/////////////////////
    $('.call-back__for').slick({
        slidesToShow: 1,
        nextArrow:'.call-back__next',
        prevArrow:'.call-back__prev',
        slidesToScroll: 1,
        asNavFor: '.call-back__nav'
    });
    $('.call-back__nav').slick({
        slidesToShow: 1,
        speed:0,
        slidesToScroll: 1,
        asNavFor: '.call-back__for',
        dots: false,
        arrows: false,
    });
    /////////////////burger///////////////
    var burger = $('.header__burger');
    var links = $('.header__links');
    burger.on('click',function () {
        links.slideToggle()

    })
    ///////////////////language///////////////
    var swither = $('.language-wrapper');
    var switherMenu = $('.language-switcher__menu');
        swither.on('click',function () {
            switherMenu.slideToggle()
        })

    //////////////////audio//////////////
    function calculateTotalValue(length) {
        var minutes = Math.floor(length / 60),
            seconds_int = length - minutes * 60,
            seconds_str = seconds_int.toString(),
            seconds = seconds_str.substr(0, 2),
            time = minutes + ':' + seconds

        return time;
    }

    function calculateCurrentValue(currentTime) {
        var current_hour = parseInt(currentTime / 3600) % 24,
            current_minute = parseInt(currentTime / 60) % 60,
            current_seconds_long = currentTime % 60,
            current_seconds = current_seconds_long.toFixed(),
            current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

        return current_time;
    }

    var audioItem = $('.audio-group');
    audioItem.each((idx,item)=>{
        var playButton = $(item).find('.audio-group__play');
        var pauseButton = $(item).find('.audio-group__pause');
        var redoButton = $(item).find('.audio-group__redo');
        var durationBlock = $(item).find('.audio-group__progress');
        var durationBar = $(item).find('.audio-group__progress-bar');
        var durationCircle = $(item).find('.audio-group__circle');
        var startTime =$(item).find(".audio-group__start-time");
        var endTime =$(item).find(".audio-group__end-time");
        var player = $(item).find('audio')[0];
        var timer;
        var percent = 0;
        var circleSpace = ((durationCircle.width()/durationBar.width())*100)/2;

        


        var advance = function(duration, element) {
            var increment = 10/duration;
            percent = Math.min(increment * element.currentTime * 10, 100);
            durationBlock[0].style.width = percent+'%';
            durationCircle[0].style.left = percent-circleSpace+'%';
            startTimer(duration, element);
        }
        var startTimer = function(duration, element){
            if(percent < 100) {
                timer = setTimeout(function (){advance(duration, element)}, 100);
            }
        }
        player.onended = function() {
            pauseButton.hide();
            redoButton.show();
        };
        $(window).on('load', function () {
            var totalLength = calculateTotalValue(player.duration);
            endTime.html(totalLength);
        });
        setTimeout(function () {
            var totalLength = calculateTotalValue(player.duration);
            endTime.html(totalLength);
        },1000);

        player.addEventListener("timeupdate", function() {
            var currentTime = player.currentTime;
            var duration = player.duration;
            var current_time = calculateCurrentValue(currentTime);
            startTime.html(current_time);
            advance(duration,player)
        });
        playButton.on('click',function () {
            player.play();
            $(this).hide();
            pauseButton.show();
        })
        redoButton.on('click',function () {
            player.play();
            $(this).hide();
            pauseButton.show();
        })
        pauseButton.on('click',function () {
            player.pause();
            $(this).hide();
            playButton.show();
        })
    })




})
