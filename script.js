$(document).ready(function() {
  console.log("DOM Content loaded.")
  var celsius = "C";
  var farenheit = "F";
  var curTempScale = $("#temp-scale").text();
  var oppositeTempScale = $("#opposite-temp-scale").text();
  var lat = 0;
  var long = 0;

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

      lat = position.coords.latitude;
      long = position.coords.longitude;


      // var geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
      //
      // $.getJSON(geocoding).done(function(results) {
      //     alert(results[1]);
      // });

      $("#location").text("lat: " + position.coords.latitude + " long: " + position.coords.longitude);
    });
  }

  // $.getJSON('https://fcc-weather-api.glitch.me/api/current?lon=:longitude&lat=:latitude', {param1: 'value1'}, function(json) {
  //   $(".message").html(JSON.stringify(json));
  //     /*optional stuff to do after success */
  // });
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});
});
