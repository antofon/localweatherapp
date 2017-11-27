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
.done(function(json) {
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

        opencageAPI = 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + '+' + long + '&pretty=1&key=80f8fa6078764e978111699fa6732fa4';
        // return opencageAPI;
        $.getJSON(opencageAPI, {format:'json'}, function(json) {
          $("#location").text(json.results[0].components.city + ", " + json.results[0].components.state);
        });
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
var opencageAPI = ''

function makeUrl() {
  opencageAPI = 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + '+' + long + '&pretty=1&key=80f8fa6078764e978111699fa6732fa4';
  // return opencageAPI;
}

// makeUrl();

// var opencageAPI = 'https://api.opencagedata.com/geocode/v1/json?q=34.690085599999996+-118.18311569999999&pretty=1&key=80f8fa6078764e978111699fa6732fa4';
// $.getJSON(opencageAPI, {format:'json'}, function(json) {
//   console.log(lat);
//   console.log(long);
//   console.log(opencageAPI);
//   console.log(json.results[5].components.city + ", " + json.results[5].components.state);
//   // $(".message").html(JSON.stringify(json));
//     /*optional stuff to do after success */
//     // lat: 34.690085599999996 long: -118.18311569999999
// });

});
