<?php
function ShowMarkersInCountry($country)
{
    $servername = "localhost";
    $username = "wpuser";
    $password = "028563513a";
    $dbname = "wordpress";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM Markers as m JOIN Cities as c ON c.Id = m.CityId WHERE m.CountryCode = '$country'";
    $data = $conn->query($sql);

    $arr1 = array();
    if ($data->num_rows > 0)
    {
        while ($row = $data->fetch_assoc())
        {
            array_push($arr1, $row["SearchId"], $row["CountryCode"], $row["Name"], $row["SearchId"], $row["Latitude"], $row["Longitude"], $row["Timezone"], $row["Elevation"],);
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
            'city' => $key['Name'],
            'lat' => $key['Latitude'],
            'lng' => $key['Longitude'],
            'timezone' => $key['TimeZone'],
            'elevation' => $key['Elevation']
        );
    }
    $markers = json_encode($locations);
    echo $markers;
}

if (isset($_POST['ShowMarkersInCountry']))
{
    ShowMarkersInCountry($_POST['ShowMarkersInCountry']);
}
?>
