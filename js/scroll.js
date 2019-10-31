var screenH = window.innerHeight;
var screenW = window.innerWidth;
var isSmartphone = (screenW < screenH);
var org_height = $('header').outerHeight();
var org_size = $('.circular').outerHeight();
var org_left_padding  = parseInt($('.logowrapper').css('padding-left'));

function get_y() {
    var y = $('.scroll-wrapper').scrollTop();
    return y;
}

function updateSizes() {
   var y = get_y();
   var limit = isSmartphone? screenH / 4 : screenH / 4;
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
   $('.circular').outerHeight(new_size + 'px');
   $('.circular').outerWidth(new_size + 'px');
   $('.circular').css({ 'background-size': new_size + 'px ' + new_size + 'px' });

   var new_padding = progress * screenW * (isSmartphone? 0.05 : 0.12) + (1 - progress) * org_left_padding;
   $('.logowrapper').css('padding-left', new_padding + 'px');
}

function clickableButtons() {
    if (isSmartphone) {
        $('span.button').addClass('vertical');
    }
   $('span.button').click(function () {
      window.open($(this).attr('href'));
      return false;
   });
}


function pageTitle() {
    var pagemap = {
        '': 0,
        'About Me': screenH / 2,
        'Publications': 3 * screenH / 2
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

function correctBackground(){
    if (isSmartphone)
        $('.cover').addClass('vertical');
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
        $('.scroll-wrapper').removeClass('snappy-scroll');
        $('.logowrapper').css('padding-top', '5%');
    }
    clickableButtons();
});

$('.scroll-wrapper').scroll(function () {
    updateSizes();
    if (!isSmartphone) {
        pageTitle();
    }
});