function markersCountryChange(value) {
  showCitiesDiv();
    if (checkIfResultsShouldBeCombined().checked) {
        let elevation = $('#elevation').val();
        markersCountryAndEvaluationChange(value, elevation);
    } else {
        $.ajax({
            type: "POST",
            url: "http://localhost/blog/wp-content/themes/twentynineteen/show-markers-based-on-chosen-country.php",
            data: {
                "ShowMarkersInCountry": value
            },
            success: function(response) {
                showFilteredCountries(response);
            }
        });
        $.ajax({
            type: "POST",
            url: "http://localhost/blog/wp-content/themes/twentynineteen/show-cities-based-on-chosen-country.php",
            data: {
                "ShowCitiesInCountry": value
            },
            success: function(response) {
                showCities(response);
            }
        });
    }
}

function showCitiesDiv()
{
  $("#citiesSelect").show();
 $('#cities').val( '' );
}

function markersCityChange(value) {
      $.ajax({
            type: "POST",
            url: "http://localhost/blog/wp-content/themes/twentynineteen/show-markers-based-on-chosen-city.php",
            data: {
                "ShowMarkersBasedOnCity": value
            },
            success: function(response) {
              showFilteredCountries(response);
                
            }
        });
}

function markersCountryAndEvaluationChange(value, elevation) {
    $.ajax({
        type: "POST",
        url: "http://localhost/blog/wp-content/themes/twentynineteen/show-markers-based-on-country-and-elevation.php",
        data: {
            par1: value,
            par2: elevation
        },
        success: function(response) {
            showFilteredCountries(response);
        }
    });	
    $.ajax({
        type: "POST",
        url: "http://localhost/blog/wp-content/themes/twentynineteen/show-cities-based-on-country-and-elevation.php",
        data: {
            par1: value,
            par2: elevation
        },
        success: function(response) {
            showCities(response);
        }
    });	
}

function hideOrShowElevation() {
    if (checkIfResultsShouldBeCombined().checked) {
        $("#elevationSlider").show();
    } else {
        $("#elevationSlider").hide();
    }
}

function checkIfResultsShouldBeCombined() {
    return document.getElementById('addElevation');
}

function showFilteredCountries(r) {
    if (r === '0 results') {
        document.getElementById('markersCount').textContent = 'No markers in that country =(';
        return;
    }
    let newMarkers = JSON.parse(r);
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
    document.getElementById('markersCount').textContent = 'Amount of markers: ' + newMarkers.length;
    for (var o in newMarkers) {

        lati = newMarkers[o].lat;
        lngi = newMarkers[o].lng;
        city = newMarkers[o].city;
        cCode = newMarkers[o].cCode;

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

function showCities(response) {
    let citiesSelect = $('#cities');
  citiesSelect.find('option').not(':first').remove();
    if (response === "0 results") {
        alert("No markers in this country");
        return;
    }
    let cities = JSON.parse(response);

    for (var c in cities) {


        let city = cities[c].Name;
        let id = cities[c].Id;
        citiesSelect.append(`<option value="${id}">
                                       ${city}
                                  </option>`);


    }
}
