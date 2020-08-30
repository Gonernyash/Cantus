$(function () {

    //fixed header
    const header = $('#header');

    checkTopOffset();

    $(window).on('scroll', function () {
        checkTopOffset();
    });



    //Slider at "Members" block
    $('#members-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: $('#members-slider-prev'),
        nextArrow: $('#members-slider-next'),
        responsive: [{
            breakpoint: 770,
            settings: {
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });



    //Slider at "Concerts" block
    const concertsSlider = $('#concerts-slider');
    const concertsCount = $('[data-concert]').length;
    const dragPart = 100/concertsCount;

    $('#drag').css('width', (dragPart+'%'));

    concertsSlider.slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
    });

    concertsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {

        $('#drag').css('left', (dragPart * nextSlide) + '%');
    });



    //Video player
    let playerList = [];
    playerList[0] = new Playerjs({
        id:"player0",
        file:"https://www.youtube.com/watch?v=WwVMed4fuvA"
    });
    playerList[1] = new Playerjs({
        id:"player1",
        file:"https://www.youtube.com/watch?v=XxthmuqWF1Q"
    });
    playerList[2] = new Playerjs({
        id:"player2",
        file:"https://www.youtube.com/watch?v=LNQaDxkSpP4"
    });



    //Slider at "Video" block
    const videoSlider = $('#video-slider');
    videoSlider.slick({
        infinite: true,
        draggable: false,
        prevArrow: $('#video-slider-prev'),
        nextArrow: $('#video-slider-next')
    });

    videoSlider.on('beforeChange', function(event) {
        playerList.forEach(function (player) {
            player.api("stop");
        });
    });



    //Song change at Soundcloud block
    const soundcloud = $('#soundcloud');
    const URLprops = "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";
    $('[data-songURL]').on('click', function (event) {
        event.preventDefault();

        let songURL = $(this).data('songurl') + URLprops;
        soundcloud.attr('src', songURL);
    });



    $('#nav-toggle').on('click', function(event){
        event.preventDefault();

        $('#header').toggleClass('toggled');
        $('#nav').toggleClass('toggled');
        $('#nav-toggle').toggleClass('toggled');
        $('#blackout').toggleClass('toggled');
    });



    $('#search').on('input', function(event){
        event.preventDefault();

        if ($('#search').val() === '') {
            $('#search-hints').addClass('none');
        } else {
            $('#search-hints').removeClass('none');
        }
    });

    const searchOffset = 700;
    $('#discover-more').on('click', function (event) {
         event.preventDefault();

         $('#intro').addClass('intro--search');

        $('#intro').animate({
            scrollTop: searchOffset
        }, 1000)
    });


    const songWidth = $('[data-songURL]').width(),
        testSong = $('#test-song');

    $('[data-songURL]').each(function () {
        let song = $(this).find('.song__name'),
            songName = song.text();

        testSong.css('width', songWidth);
        testSong.text(songName);

        let result = checkSongHeight(songName, testSong);
        console.log(result);
        song.text(result);
    });

    function checkSongHeight(song, songBlock) {
        if (songBlock.height() > 37) {
            song = song.slice(0,-1);
            songBlock.text(song);
            return checkSongHeight(song, songBlock);
        } else return song;
    }

    function checkTopOffset() {
        let introHeight = $('#intro').innerHeight(),
            scrollOffset = $(window).scrollTop();
        if (scrollOffset > introHeight) {
            header.addClass('header--fixed');
        } else {
            header.removeClass('header--fixed')
        }
    }

});