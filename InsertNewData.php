<?php
$servername = "localhost";
$username = "wpuser";
$password = "028563513a";
$dbname = "wordpress";

$conn = new mysqli($servername, $username, $password, $dbname);

$requestUrl = 'https://api.3geonames.org/?randomland=yes&json=1';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $requestUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$amountOfMarkers = 10000;
for ($i = 0;$i < $amountOfMarkers;$i++)
{
    $query = 'INSERT INTO Markers(CountryCode, CityId, Latitude, Longitude, SearchId, Elevation, Timezone) VALUES';

        $output = curl_exec($ch);
        $array = json_decode($output, true);
        $searchId = $array['osmtags']['id'];
        $elevation = $array['major']['elevation'];
        $timezone = $array['major']['timezone'];
        if (!is_numeric($searchId) || !is_numeric($elevation) || !is_string($timezone))
        {
            continue;
        }
        $country = $array['major']['state'];
        if ($country == 'UK')
        {
            $country = 'GB';
        }

        $city = $array['nearest']['city'];
        $cityQuery = "SELECT * FROM Cities WHERE Name = '$city'";
        $cityData = $conn->query($cityQuery);
        if($cityData){
            $cityId = - 1;
            if ($cityData->num_rows <= 0)
            {
                $insertCityQuery = "INSERT INTO Cities(Name, CountryCode)VALUES('$city', '$country');";
                $completeCityQuery = $conn->query($insertCityQuery);
                $cityIdQuery = "SELECT * FROM Cities WHERE Name = '$city'";
                $cityIdData = $conn->query($cityIdQuery);
                while ($confirmedCityRow = $cityIdData->fetch_assoc())
                {
                    $cityId = $confirmedCityRow["Id"];
                }
    
            }
            else
            {
                while ($row = $cityData->fetch_assoc())
                {
                    $cityId = $row["Id"];
                }
            }
        }
       
        $latt = $array['nearest']['latt'];
        $longt = $array['nearest']['longt'];
        $currentValues = "('$country', $cityId, '$latt', '$longt', $searchId, $elevation, '$timezone'),";
        $query = $query . $currentValues;

    echo "i is : " . $i . "\r \n";
    $query = rtrim($query, ',');
    $query = $query . ";";
    echo "\r \n";
    $completeQuery = $conn->query($query);
}

curl_close($ch);
?>
