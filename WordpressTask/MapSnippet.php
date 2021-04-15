<?php
$servername = "localhost";
$username = "wpuser";
$password = "028563513a";
$dbname = "wordpress";

$conn = new mysqli($servername, $username, $password, $dbname);

$allMarkersSql = "SELECT * FROM Markers AS m JOIN Cities AS c ON c.Id = m.CityId";
$markersData = $conn->query($allMarkersSql); 

$markersArray = array();
if ($markersData->num_rows > 0) {
  while($row = $markersData->fetch_assoc()) {
    array_push(
      $markersArray, 
      $row["SearchId"],
      $row["CountryCode"],
      $row["Name"],
      $row["SearchId"],
      $row["Latitude"],
      $row["Longitude"],
      $row["Timezone"],
      $row["Elevation"],
    );
  }
} else {
  echo "0 results";
}
foreach ($markersData as $key)
{
$locations[]=array( 
  'cCode'=>$key['CountryCode'],
  'searchID' => $key['SearchId'],
  'city'=>$key['Name'], 
  'lat'=>$key['Latitude'],
  'lng'=>$key['Longitude'] ,
  'timezone'=>$key['TimeZone'],
  'elevation'=>$key['Elevation']);
}
echo "<p id='markersCount'></p>";
echo "<div id='map'></div>";
$markers = json_encode( $locations ); 
echo "<p id='markersData' hidden>$markers</p>";
echo '<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>';
echo "<script>
var element = document.getElementById('markersData');
var elements = element.textContent;
      function initMap() 
{
            let defaultLatLng = {lat: 42.271469, lng: 23.130453};

            var latlng = new google.maps.LatLng(defaultLatLng);
            var myOptions = {
                zoom: 2,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            };

            var map = new google.maps.Map(document.getElementById('map'),myOptions);
            var infowindow = new google.maps.InfoWindow(), marker, lat, lng;
            var json=JSON.parse(elements);
            document.getElementById('markersCount').textContent = 'Amount of markers: ' + json.length;
            for( var o in json ){
				
                lati = json[ o ].lat;
                lngi=json[ o ].lng;
                city=json[ o ].city;
                cCode=json[ o ].cCode;

				      var myNewLatLng = { lat: parseFloat(lati), lng: parseFloat(lngi) };
				      new google.maps.Marker({
                position: myNewLatLng,
                map,
                title: cCode + ' ' + city
                });
            }
}
</script>";
$googleApiKey = "AIzaSyBTf4Og1FxCEzwl2QCylqDOeld4AUvvwsg";
echo "<script async defer src='https://maps.googleapis.com/maps/api/js?key=$googleApiKey&callback=initMap'></script>";

?>