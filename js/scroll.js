var screenH = window.innerHeight;
var org_height = $('header').outerHeight();
var org_padding = parseInt($('header').css('padding-top').replace('px', ''));
var org_size = $('.circular').outerHeight();
var org_top_margin = parseInt($('.caption').css('margin-top').replace('px', ''));

function updateSizes() {
   // $('header').stop(true, true);
   var y = $('.snappy-scroll').scrollTop();
   console.log("screenH", screenH);
   console.log("y", y);

   var limit = screenH / 4;
   var target = Math.max(limit, org_height - y);
   $('header').outerHeight(target + 'px');
   /*$('.cover').css({ 'margin-top': 2*y/3});
   $('.cover').css({ 'height': screenH - 2*y/3});*/

   var new_padding = Math.max(limit / 6, org_padding - y / 2);
   $('header').css({ 'padding-top': new_padding + 'px' });
   $('header').css({ 'padding-bottom': new_padding + 'px' });

   var new_size = target - 5 - 2 * new_padding;
   $('.circular').outerHeight(new_size + 'px');
   $('.circular').outerWidth(new_size + 'px');
   $('.circular').css({ 'background-size': new_size + 'px ' + new_size + 'px' });

   var new_top_margin = org_top_margin / org_size * new_size;
   $('.caption').css({ 'margin-top': new_top_margin + 'px' });
}

$(document).ready(function() {
   updateSizes();
   cssScrollSnapPolyfill();
});
$(window).scroll(function() {
   console.log('salam az window');
   updateSizes();
});
$('header').scroll(function () {
   console.log('salam az header');
   updateSizes();
});
$('.snappy-scroll').scroll(function () {
   console.log('salam az snappy');
   updateSizes();
});