<?php
$servername = "localhost";
$username = "wpuser";
$password = "028563513a";
$dbname = "wordpress";

$conn = new mysqli($servername, $username, $password, $dbname);

$requestUrl = 'https://api.3geonames.org/?randomland=UK&json=1';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $requestUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$amountOfMarkers = 100;
$secondLoop = 2;
for ($i=0; $i < $amountOfMarkers; $i++) { 
    $query = 'INSERT INTO Markers(CountryCode, SearchId, Latitude, Longitude, TimeZone, Elevation, City) VALUES';

    for ($j=0; $j < $secondLoop ; $j++) { 
        $output = curl_exec($ch);
        $array = json_decode($output, true);
        $searchId = $array['osmtags']['id'];
        $elevation = $array['major']['elevation'];
        $timezone = $array['major']['timezone'];
        if(!is_numeric($searchId) || !is_numeric($elevation) || !is_string($timezone)){
        continue;
        }
        $country = $array['major']['state'];
        if($country == 'UK'){
            $country = 'GB';
        }
      
        $city = $array['nearest']['city'];
        $latt = $array['nearest']['latt'];
        $longt = $array['nearest']['longt'];
        if($j == $secondLoop - 1){
            $currentValues = "('$country', $searchId, '$latt', '$longt', '$timezone', $elevation, '$city');";
        }
        else{
            $currentValues = "('$country', $searchId, '$latt', '$longt', '$timezone', $elevation, '$city'),";
        }
        $query = $query . $currentValues;

}
echo "i is : " . $i . "\r \n";
echo $query . "\r\n";

$completeQuery = $conn->query($query);
}

curl_close($ch);
?> 
