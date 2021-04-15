<?php
function ShowCitiesBasedOnCountryAndElevation($country, $elevation)
{
    $servername = "localhost";
    $username = "wpuser";
    $password = "028563513a";
    $dbname = "wordpress";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM Markers as m JOIN Cities as c ON c.Id = m.CityId WHERE c.CountryCode = '$country' AND m.Elevation <= $elevation ";
    $data = $conn->query($sql);

    $arr1 = array();
    if ($data->num_rows > 0)
    {
        while ($row = $data->fetch_assoc())
        {
            array_push($arr1, $row["Id"], $row["Name"],);
        }
    }
    else
    {
        echo "0 results";
        exit(1);
    }
    foreach ($data as $key)
    {
        $cities[] = array(
            'Id' => $key['Id'],
            'Name' => $key['Name']
        );
    }
    $cities = json_encode($cities);
    echo $cities;
}

$value = $_POST['par1'];
$elevation = $_POST['par2'];
ShowCitiesBasedOnCountryAndElevation($value, $elevation);
?>
