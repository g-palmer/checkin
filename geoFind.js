/*jshint multistr: true */
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    $output = document.getElementsByClassName('output')[0];
    $map = document.getElementsByClassName('map')[0];
    $button = document.getElementsByClassName('locate')[0];
    $button.addEventListener('click', geoFind);
  }
};

var geoFind = function() {

  $output.innerHTML = '<p>where in the world are you...?</p>';

  var mapOptions = {
   zoom: 18,
   size: {width: 300, height: 300, scale: 1},
   markers: {style: {color: 'blue'}}
  };

  var success = function(pos) {
    console.log(pos);
    var coords = pos.coords,
      date = new Date(pos.timestamp);

    if (coords.accuracy < 10) {
      $output.firstChild.innerHTML = '\
        <span>Current latitude: ' + coords.latitude + '</span><br>\
        <span>Current longitude: ' + coords.longitude + '</span><br>\
        <span>Accuracy within: ' + coords.accuracy + ' meters</span><br>\
        <span>As of: ' + date + '</span><br>\
        ';

      var $mapElement = document.createElement('div');
      $mapElement.innerHTML = '<img src="http://maps.googleapis.com/maps/api/staticmap?center='+coords.latitude+','+coords.longitude+'&zoom='+mapOptions.zoom+'&size='+mapOptions.size.width+'x'+mapOptions.size.height+'&markers=color:'+mapOptions.markers.style.color+'%7C'+coords.latitude+','+coords.longitude+'&sensor=true"></img>';
      $output.appendChild($mapElement);

      window.navigator.geolocation.clearWatch(getPosition);
    }
  };

  var error = function(error) {
    $output.innerText = 'There was some error: ' + error.code + ', ' + error.message;
  };

  var getPosOptions = {
    enableHighAccuracy: true,
    timeout: 5000
  };

  var getPosition = window.navigator.geolocation.watchPosition(success, error, getPosOptions);
};

    // $('<p>').text('Current latitude: ' + coords.latitude).appendTo($output);
    // $('<p>').text('Current longitude: ' + coords.longitude).appendTo($output);
    // $('<p>').text('Accuracy: ' + coords.accuracy + ' meters').appendTo($output);
    // $('<p>').text('As of: ' + date).appendTo($output);

    // $('<img>').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center='+coords.latitude+','+coords.longitude+'&zoom='+mapOptions.zoom+'&size='+mapOptions.size.width+'x'+mapOptions.size.height+'&markers=color:'+mapOptions.markers.style.color+'%7C'+coords.latitude+','+coords.longitude+'&sensor=true').appendTo($output);
