
function markersCountryChange(value) {
    let markersJson = document.getElementById('markersData').textContent;
    let markers = JSON.parse(markersJson);
 
    for (var o in markers) {
 
      let lati = markers[o].lat;
      let lngi = markers[o].lng;
      let city = markers[o].city;
      let cCode = markers[o].cCode;
 
 
    }
    let defaultLatLng = {
      lat: 42.271469,
      lng: 23.130453
    };
 
    var latlng = new google.maps.LatLng(defaultLatLng);
    var myOptions = {
      zoom: 2,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    };
 
    var map = new google.maps.Map(document.getElementById('map'), myOptions);
    var infowindow = new google.maps.InfoWindow(),
      marker, lat, lng;
    for (var o in markers) {
      cCode = markers[o].cCode;
      if (cCode !== value) {
        continue;
        }
        lati = markers[o].lat;
        lngi = markers[o].lng;
        city = markers[o].city;
 
        var myNewLatLng = {
          lat: parseFloat(lati),
          lng: parseFloat(lngi)
        };
        new google.maps.Marker({
          position: myNewLatLng,
          map,
          title: cCode + ' ' + city
        });
      }
 
    }
 
  function markersCityChange(value) {
    let markersJson = document.getElementById('markersData').textContent;
    let markers = JSON.parse(markersJson);
 
    for (var o in markers) {
 
      let lati = markers[o].lat;
      let lngi = markers[o].lng;
      let city = markers[o].city;
      let cCode = markers[o].cCode;
 
 
    }
    let defaultLatLng = {
      lat: 42.271469,
      lng: 23.130453
    };
 
    var latlng = new google.maps.LatLng(defaultLatLng);
    var myOptions = {
      zoom: 2,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    };
 
    var map = new google.maps.Map(document.getElementById('map'), myOptions);
    var infowindow = new google.maps.InfoWindow(),
      marker, lat, lng;
    for (var o in markers) {
      city = markers[o].city;
      cCode = markers[o].cCode;
      if (city !== value) {
        continue;
        }
        lati = markers[o].lat;
        lngi = markers[o].lng;
 
        var myNewLatLng = {
          lat: parseFloat(lati),
          lng: parseFloat(lngi)
        };
        new google.maps.Marker({
          position: myNewLatLng,
          map,
          title: cCode + ' ' + city
        });
      }
 
    }
 
 