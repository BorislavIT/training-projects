<?php
$servername = "localhost";
$username = "wpuser";
$password = "028563513a";
$dbname = "wordpress";

$conn = new mysqli($servername, $username, $password, $dbname);

$requestUrl = 'https://api.3geonames.org/?randomland=yes&json=1';


$cityQuery = "SELECT * FROM Cities WHERE Name = 'Dupnitsa'";
$cityData = $conn->query($cityQuery);

if ($cityData->num_rows <= 0)
{
  echo "none";
}
else{
    while ($row = $cityData->fetch_assoc())
    {
       $cityId = $row["Id"];
    }
    echo $cityId;
}
   
?> 
