$(document).ready(function() {
  console.log("DOM Content loaded.")
  var degrees = "C";
  var curTempScale = $("#temp-scale").text();

  // $(".pushme").click(function () {
  //     $(this).text(function(i, text){
  //         return text === "PUSH ME" ? "DON'T PUSH ME" : "PUSH ME";
  //     })
  //  });
  $("button").click(function(){
    $("#temp-scale").text(function(i, text){
        return text === "PUSH ME" ? "DON'T PUSH ME" : "PUSH ME";
    })
    // if(curTempScale === "F") {
    //   curTempScale = "C";
    //   $("#temp-scale").text("C");
    // }
    //
    // if(curTempScale === "C") {
    //   curTempScale = "F";
    //   $("#temp-scale").text("F");
    // }
    // $("#temp-scale").text(curTempScale === degrees ? "F" : "C");
  });


});
