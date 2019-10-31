var screenH = window.innerHeight;
var screenW = window.innerWidth;
var org_height = $('header').outerHeight();
var org_size = $('.circular').outerHeight();
var org_left_padding  = parseInt($('.logowrapper').css('padding-left'));
var org_top_margin = parseInt($('.caption').css('margin-top'));
var org_caption_height = parseInt($('.caption').css('height'));

function get_y() {
    var y = $('.snappy-scroll').scrollTop();
    return y;
}

function updateSizes() {
   // $('header').stop(true, true);
   var y = get_y();
   /*console.log("screenH", screenH);
   console.log("y", y);*/

   var limit = screenH / 4;
   var target = Math.max(limit, org_height - y);
   if (target > 2 * limit) {
      $('.hides').css({ 'display': 'block' });
      $('.appears').css({ 'display': 'none' });
   }
   else {
       $('.hides').css({'display': 'none'});
       $('.appears').css({'display': 'block'});
   }
   $('header').outerHeight(target + 'px');

   var progress = (org_height - target) / (org_height - limit);

   var new_size = progress  * 0.75 * limit + (1 - progress) * org_size;
   $('.circular').outerHeight(new_size + 'px');
   $('.circular').outerWidth(new_size + 'px');
   $('.circular').css({ 'background-size': new_size + 'px ' + new_size + 'px' });

   var new_padding = progress * screenW * 0.12 + (1 - progress) * org_left_padding;
   $('.logowrapper').css('padding-left', new_padding + 'px');

   /*var new_margin = progress * screenH / 8 + (1 - progress) * org_top_margin;
   $('.caption').css('margin-top', new_margin + 'px');*/

   //var new_caption_height = progress * screen / 4 + (1 - progress) * org_caption_height;
   //$('.caption').css('height', new_caption_height + 'px');
    if (screenH > screenW) {
        $('.cover').css('background', 'url(../img/umd-blurred-vertical.png) no-repeat');
    }
}

function clickableButtons() {
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
    //console.log('nearest', nearest, $('h3.page').firstChild.innerHTML());
    $('h3.page').html(nearest);
}

function correctBackground(){
    if (screenH > screenW)
        $('.cover').css('background', 'url(../img/umd-blurred-vertical.png) no-repeat');
    else
        $('.cover').css('background', 'url(../img/umd-blurred.jpg) no-repeat');
}

$(document).ready(function() {
    correctBackground();
    updateSizes();
    cssScrollSnapPolyfill();
    pageTitle();
    clickableButtons();
    $(window).resize(function () {
       correctBackground();
       updateSizes();
    })
});

$('.snappy-scroll').scroll(function () {
   var y = updateSizes();
   pageTitle(y);
});
$('window').on("scroll", function (e) {
   /*console.log('WINDOW');*/
   //$('.snappy-scroll').trigger("scroll", e);
});