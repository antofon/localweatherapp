$(document).ready(function() {
  console.log("DOM Content loaded.")
  var celsius = "C";
  var farenheit = "F";
  var curTempScale = $("#temp-scale").text();
  var oppositeTempScale = $("#opposite-temp-scale").text();

  //at every click toggle between celsius and farenheit
  $("button").on("click",function() {
    //if toggle button is C, need to change to F and be applied (i.e. 73 C becomes 73 F)
    if(curTempScale === celsius) {
      curTempScale = farenheit;
      $("#temp-scale").text(curTempScale);
      oppositeTempScale = celsius;
      $("#opposite-temp-scale").text(oppositeTempScale);
    }

    else if(curTempScale === farenheit) {
      curTempScale = celsius;
      $("#temp-scale").text(curTempScale);
      oppositeTempScale = farenheit;
      $("#opposite-temp-scale").text(oppositeTempScale);
    }
});

/* === USE OF WEATHER API BELOW === */
$.ajax({
  url: 'https://fcc-weather-api.glitch.me/api/current?lon=:longitude&lat=:latitude',
  type: 'GET',
  dataType: 'json',
  // data: {lon:':longitude', lat:':latitude' }.
})
.done(function() {
  console.log("success");
  // if the user allows access to their location, get their current position which includes longitude and latitude
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#location").text("lat: " + position.coords.latitude + " long: " + position.coords.longitude);
  });
}
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});
});
