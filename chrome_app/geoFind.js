$(document).ready(function() {
  var geoFind = function() {

    $output = $('.output');

    var mapOptions = {
     zoom: 18,
     size: {width: 300, height: 300, scale: 1},
     markers: {style: {color: 'blue'}}
    };

    var success = function(pos) {
      var coords = pos.coords,
        date = new Date(pos.timestamp);

      $($output).empty();
      $('<p>').text('Current latitude: ' + coords.latitude).appendTo($output);
      $('<p>').text('Current longitude: ' + coords.longitude).appendTo($output);
      $('<p>').text('Accuracy: ' + coords.accuracy + ' meters').appendTo($output);
      $('<p>').text('As of: ' + date).appendTo($output);

      // $('<img>').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center='+coords.latitude+','+coords.longitude+'&zoom='+mapOptions.zoom+'&size='+mapOptions.size.width+'x'+mapOptions.size.height+'&markers=color:'+mapOptions.markers.style.color+'%7C'+coords.latitude+','+coords.longitude+'&sensor=true').appendTo($output);
    };

    var error = function(error) {
      $output.text('There was some error: ' + error.code + ', ' + error.message);
    };

    var getPosOptions = {
      enableHighAccuracy: true,
      timeout: 5000
    };

    $output.html('<p>where in the world are you...?</p>');

    navigator.geolocation.getCurrentPosition(success, error, getPosOptions);
  };

  $('button').on('click', geoFind);
});