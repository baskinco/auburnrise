/* ---------- MODAL POPUP ---------- */

function onPopupMobileOpen() {
  $("#myInput").focus();
  $("#modal-mobile-content").show();
}

function onPopupMobileClose() {
  $("#modal-mobile-content").hide();
  Cookies.set('colorboxShown','yes', { expires: 1 });
  lastFocus.focus();
}

function onPopupDesktopOpen() {
  $("#myInput").focus();
  $("#modal-desktop-content").show();
}

function onPopupDesktopClose() {
  $("#modal-desktop-content").hide();
  Cookies.set('colorboxShown','yes', { expires: 1 });
}

function displayDesktopPopup(){
  $.colorbox({
    inline: true,
    href: "#modal-desktop-content",
    className: "cta",
    opacity: .4,
    width: "570px",
    height: "607px",
    onComplete: onPopupDesktopOpen,
    onClosed: onPopupDesktopClose
  });
}

function displayMobilePopup(){
  $.colorbox({
    inline: true,
    href: "#modal-mobile-content",
    className: "cta",
    opacity: .4,
    width: "320px",
    height: "475px",
    onComplete: onPopupMobileOpen,
    onClosed: onPopupMobileClose
  });
}

setTimeout(function(){
  var popupShown = Cookies.get('colorboxShown');

  if (popupShown){
    console.log("Cookie found. No action necessary");
  } else {
    lastFocus = document.activeElement;
    if (window.matchMedia("(min-width: 768px)").matches) {
      displayDesktopPopup();
    } else {
      displayMobilePopup();
    }
  }
}, 3000);

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
