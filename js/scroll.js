var screenH;
var screenW;
var isSmartphone;
var org_height;
var org_size;
var org_left_padding;;

function setIsSmartphone() {
    screenH = window.innerHeight;
    screenW = window.innerWidth;
    isSmartphone = (screenW < screenH);
}

function addTooltips() {
    console.log('yo! what are you looking at?');
    $('p span.box').each(function() {
        console.log('registering ' + $(this).attr('class') + $(this).attr('title'));
        $(this).on("mouseenter", function () {
            const message = $(this).attr('title');
            console.log('the title is ' + message);
            $(this).addClass('light');
            $(this).parent().parent().children(".tooltipX").each(function () {
                $(this).html(message);
            });
        }).on("mouseleave", function (){
            $(this).parent().parent().children(".tooltipX").each(function () {
                $(this).html("");
            });

            $(this).removeClass('light');
        });
    });

    console.log($('p a span.box'));
}

function init() {
    setIsSmartphone();
    org_height = $('header').outerHeight();
    org_size = $('.profilepic').outerHeight();
    org_left_padding  = parseInt($('.logowrapper').css('padding-left'));
}

init();

function get_y() {
    var y = $('.scroll-wrapper').scrollTop();
    return y;
}

function updateSizes() {
    console.log('updatesizes');
   var y = get_y();
   var limit = screenH/4 + 1;
   var target = Math.max(limit, org_height - y);
   if (target > 2 * limit && !isSmartphone) {
      $('.hides').css({ 'display': 'block' });
      $('.appears').css({ 'display': 'none' });
   }
   else if (target < 2 * limit && isSmartphone) {
       $('.hides').css({'display': 'none'});
       $('.appears').css({'display': 'block'});
       $('.appears.hidesinsp').css({'display': 'none'});
       $('h1.caption').css({'font-size': '1.5em'});
   }
   else {
       $('.hides').css({'display': 'none'});
       $('.appears').css({'display': 'block'});
       $('h1.caption').css({'font-size': '2em'});
   }
   $('header').outerHeight(target + 'px');

   var progress = (org_height - target) / (org_height - limit);

   var new_size = progress  * 0.75 * limit + (1 - progress) * org_size;
   $('.profilepic').outerHeight(new_size + 'px');
   $('.profilepic').outerWidth(new_size + 'px');
   $('.profilepic').css({ 'background-size': new_size + 'px ' + new_size + 'px' });

   var new_padding = progress * screenW * (isSmartphone? 0.05 : 0.12) + (1 - progress) * org_left_padding;
   $('.logowrapper').css('padding-left', new_padding + 'px');
}

function pageTitle() {
    var pagemap = {
        '': 0,
        'About Me': screenH,
        'Publications': 5 * screenH / 2,
        'Codes': 6 * screenH / 2
    };
    var y = get_y();
    var nearest = '', distance = 1000 * 1000;
    for (var page in pagemap)  {
      if (Math.abs(y - pagemap[page]) < distance) {
         distance = Math.abs(y - pagemap[page]);
         nearest = page;
      }
    }
    $('h3.page').html(nearest);
}

function correctBackground() {
    const oldIsSmartphone = isSmartphone;
    setIsSmartphone();
    if (oldIsSmartphone !== isSmartphone) {
        init();
    }
    else if (isSmartphone) {
        $('.cover').addClass('vertical');
        $('.cover').css('background-size', '100% auto');
    }
}

$(document).ready(function() {
    correctBackground();
    updateSizes();
    if (!isSmartphone) {
        console.log('not a smartphone.');
        cssScrollSnapPolyfill();
        pageTitle();
    }
    else {
        $('article').addClass('vertical');
        $('span.button').addClass('vertical');
        $('.scroll-wrapper').removeClass('snappy-scroll');
        $('.logowrapper').css('padding-top', '5%');
    }
    addTooltips();
	updateSize();
});

$('.scroll-wrapper').scroll(function () {
    updateSizes();
    correctBackground();
    if (!isSmartphone) {
        pageTitle();
    }
});
