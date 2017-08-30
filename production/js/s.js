/* ---------- SKROLLR ---------- */
$(window.onload = function () {
  // initialize skrollr if the window width is large enough
  if ($(window).width() < 768) {

    var s = skrollr.init({
        render: function(data) {
            //Debugging - Log the current scroll position.
            // console.log(data.curTop);
        }
    });
  }
  // disable/enable skrollr if the window is resized above/below 767px wide
  $(window).on('resize', function () {
    if ($(window).width() >= 767) {
      skrollr.init().destroy(); // destroy if over 767
    }
    if ($(window).width() < 768) {
      skrollr.init(); // enable if under 768
    }
  });
});
