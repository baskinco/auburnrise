/* ---------- FILTER PANEL ---------- */
$(document).ready(function(){
    $("#open").click(function(){
        $("#slidefilter").slideToggle("fast");
    });
});

// $('.toggle_bdrms input').toggle(function() {
//   $('.toggle_bdrms input:checkbox').css('display', 'none');
//   $('.toggle_bdrms label').css({'background-color':'#FFFFFF', 'color':'#00a9b7'});
// });

$(document).ready(function(){
    $("#onebdrm").click(function(){
        $(".toggle").toggleClass("toggle_bdrms toggle_bdrms_hover");
    });
});

  //make slider textbox equal to slider value
  function printValue(sliderID, textbox) {
    var x = document.getElementById(textbox);
    var y = document.getElementById(sliderID);
    x.value = y.value;
  }

  //get bdrm and slider values
  function getValues() {
    var bdrm1 = false;
    var bdrm2 = false;
    var sliderValue;

    if($("#onebdrm").is(':checked')){
      bdrm1 = true;
    }
    if ($("#twobdrm").is(':checked')){
      bdrm2 = true;
    }
    sliderValue = $("#rangeValue").val();

    runFilter(bdrm1, bdrm2, sliderValue);
  }

  function runFilter(bdrm1, bdrm2, sliderValue) {
         $.each($('.condo-box'), function() {
              $this = $(this);
              condoData = $this.data();
              var sqftFilter = (condoData.sqft <= sliderValue);
              var bedFilter = (!bdrm1 && !bdrm2) || (condoData.bdrms == 1 && bdrm1) || (condoData.bdrms == 2 && bdrm2);
              $this.toggle(sqftFilter && bedFilter);
        });
  }

  // Set values for units
  $('#jackson').data({ id:1, sqft:897, bdrms:2 });
  $('#nicholl').data({ id:2, sqft:808, bdrms:2 });
  $('#atwood').data({ id:3, sqft:1020, bdrms:2 });
  $('#cohen').data({ id:4, sqft:976, bdrms:2 });
  $('#curnoe').data({ id:5, sqft:572, bdrms:2 });
  $('#richler').data({ id:6, sqft:624, bdrms:2 });
  $('#carr').data({ id:7, sqft:544, bdrms:1 });
  $('#mitchell').data({ id:8, sqft:705, bdrms:2 });
  $('#findlay').data({ id:9, sqft:747, bdrms:2 });
  $('#lawrence').data({ id:10, sqft:467, bdrms:1 });

//MAIN SCRIPT
  $(document).ready(function() {
    //print slider value to slider textbox
    printValue('slider','rangeValue');

    //when a bdrm box is checked ..
    $("#onebdrm, #twobdrm").click(function(){
      getValues();
    });

    //when the slider is moved
    $("#slider").change(function() {
      getValues();
    });
  });

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


/* --- SKROLLR 2.0 --- */

var skrollrStart = function() {
    var winW = $(window).width(),
        _skrollr = skrollr.get(); // See if skrollr is already initialised

    if ( winW <= 768 ) {
        if ( _skrollr ) {
            skrollr.refresh();
        } else {
            var s = skrollr.init();
            skrollr.menu.init(s);
        }
    } else {
        if ( _skrollr ) {
          skrollr.init().destroy();
        }
    }
}

// Fire initially
$(window).on('load', function () {
    skrollrStart();
});

// Fire on resize
$(window).on('resize', function () {
    skrollrStart();
});
