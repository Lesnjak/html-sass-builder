
$(document).ready(function(){
    ////////////move text in header/////////////
    (function () {
        var squareBox = $('.zoom');
        var text = $('.header__move-text');
        var textSpaceToTop = text[0].offsetTop;
        var headerTitle = $('.header__title');
        var headerTitleSpaceToTop = headerTitle[0].offsetTop;
        var viewportHeight = window.innerHeight;
        var moveTextHeight = text.height();
        var moveTextPosition = ((viewportHeight/2) - (moveTextHeight/2));

        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();

            if(((headerTitleSpaceToTop + headerTitle.outerHeight())-scrollTop)<0){
                squareBox.show()
            }else {
                squareBox.hide()
            }

            if(textSpaceToTop - scrollTop < moveTextPosition){
                text.addClass("header__move-text--fixed")
            }else if(text.hasClass('header__move-text--fixed')){
                text.removeClass("header__move-text--fixed")
            }

        })
    })()
    //////////////finishd move text in header///////////

})
