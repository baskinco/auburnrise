
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



  $(document).ready(function() {
    //print slider value to slider textbox
    printValue('slider','rangeValue');

    //check to see if bdrm checkboxes are checked
    $("#onebdrm, #twobdrm").click(function() {
      var bdrm1 = false;
      var bdrm2 = false;
      if($("#onebdrm").is(':checked')){
        bdrm1 = true;
      }
      if ($("#twobdrm").is(':checked')){
        bdrm2 = true;
      }
      filterByBdrms(bdrm1, bdrm2);
    });

    // Link sqft slider range to condo sqft
    $("#slider").change(function() {
      var sliderRangeValue;
      sliderRangeValue = $("#rangeValue").val();
      filterBySqft(sliderRangeValue);
    });
  });

//make slider textbox equal to slider value
function printValue(sliderID, textbox) {
  var x = document.getElementById(textbox);
  var y = document.getElementById(sliderID);
  x.value = y.value;
}

//filter condos based on sqft slider postition
function filterBySqft(sqftCriteria)
{
  $.each($('.condo-box'), function() {
    $this = $(this);
    sqftData = $this.data();
    if(sqftData.sqft <= sqftCriteria){
      $this.show();
    }
    else {
      $this.hide();
    }
  });
}

//filter condos based on bdrm checkbox states
function filterByBdrms(bdrm1, bdrm2){
  $.each($('.condo-box'), function() {
    $this = $(this);
    bdrmData = $this.data();
    if(bdrm1 && !bdrm2){
      if (bdrmData.bdrms == 1){
        $this.show();
      } else {
        $this.hide();
      }
    } else if(bdrm2 && !bdrm1){
      if (bdrmData.bdrms == 2){
        $this.show();
      } else {
        $this.hide();
      }
    } else {
      $this.show();
    }
  });
}
