<?php
function ShowMarkersInCountryWithElevation($country, $elevation)
{
    $servername = "localhost";
    $username = "wpuser";
    $password = "028563513a";
    $dbname = "wordpress";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM Markers WHERE Markers.CountryCode = '$country' AND Markers.Elevation <= $elevation ";
    $data = $conn->query($sql);

    $arr1 = array();
    if ($data->num_rows > 0)
    {
        while ($row = $data->fetch_assoc())
        {
            array_push($arr1, $row["SearchId"], $row["CountryCode"], $row["City"], $row["SearchId"], $row["Latitude"], $row["Longitude"], $row["Timezone"], $row["Elevation"],);
        }
    }
    else
    {
        echo "0 results";
        exit(1);
    }
    foreach ($data as $key)
    {
        $locations[] = array(
            'cCode' => $key['CountryCode'],
            'searchID' => $key['SearchId'],
            'city' => $key['City'],
            'lat' => $key['Latitude'],
            'lng' => $key['Longitude'],
            'timezone' => $key['TimeZone'],
            'elevation' => $key['Elevation']
        );
    }
    $markers = json_encode($locations);
    echo $markers;
}

    $value = $_POST['par1'];
    $elevation = $_POST['par2'];
    ShowMarkersInCountryWithElevation($value, $elevation);
?>
