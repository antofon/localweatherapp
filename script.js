$(document).ready(function() {
  console.log("DOM Content loaded.")
  var celsius = "C";
  var farenheit = "F";
  var curTempScale = $("#temp-scale").text();
  var oppositeTempScale = $("#opposite-temp-scale").text();
  var opencageURL = '';
  var weatherURL = '';
  var convertToCelsius = 0;
  var convertToFarenheit = 0;
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

/* === AJAX CALL TO WEATHER & GEOCODER API === */
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

        //build URL, the parameter passed to get the JSON data: https://api.opencagedata.com/geocode/v1/json?q=LAT+LONG&pretty=1&key=<YOURAPIKEY>
        opencageURL = 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + '+' + long + '&pretty=1&key=80f8fa6078764e978111699fa6732fa4';
        $.getJSON(opencageURL, {format:'json'}, function(json) {
          //results array is returned upon getJSON function call. Subsequent properties shown when traverse in results array
          console.log(json.results[0]);
          $("#location").text(json.results[0].components.city + ", " + json.results[0].components.state);
        });

        weatherURL = 'https://fcc-weather-api.glitch.me/api/current?lon=' + long + '&' + 'lat=' + lat;
        $.getJSON(weatherURL, {format:'json'}, function(json) {
          convertToFarenheit = (json.main.temp* 9/5) + 32;

          $('#create-temp-image').attr('src', json.weather[0].icon);
          $('#create-temp-image').attr('width', '75');
          $('#create-temp-image').attr('height', '75');

          if(convertToFarenheit >= convertToFarenheit + 0.5) {
            $('#temp-value').text(Math.ceil(convertToFarenheit));
          }

          else {
            $('#temp-value').text(Math.floor(convertToFarenheit));
          }
          $('#temp-description').text(json.weather[0].description);
        });
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
