<?php
 $servername = "localhost";
    $username = "wpuser";
    $password = "028563513a";
    $dbname = "wordpress";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM Countries";
    $data = $conn->query($sql);

    $countriesArr = array();
    if ($data->num_rows > 0)
    {
        while ($row = $data->fetch_assoc())
        {
            array_push($countriesArr, $row["CountryCode"], $row["Name"]);
        }
    }
    else
    {
        echo "0 results";
    }
    foreach ($data as $key)
    {
        $countries[] = array(
            'cCode' => $key['CountryCode'],
            'Country' => $key['Name']
        );
    }
    echo '<label for="country">Choose a country:</label>';
    echo '<select name="countries" id="countries" onchange="markersCountryChange(this.value)">';
    echo '<option disabled="" selected="" value="disabledCountry">Select a country</option>';
foreach ($countries as $country) {
    $countryCode = $country['cCode'];
    $countryName = $country['Country'];
    echo "<option value=$countryCode>$countryName</option>";
}
echo '</select>';

$citiesQuery = "SELECT * FROM Cities";
$citiesData = $conn->query($citiesQuery);

$citiesArr = array();
    if ($citiesData->num_rows > 0)
    {
        while ($row = $citiesData->fetch_assoc())
        {
            array_push($citiesArr, $row["Id"], $row["Name"]);
        }
    }
    else
    {
        echo "0 results";
    }
    foreach ($citiesData as $key)
    {
        $cities[] = array(
            'Id' => $key['Id'],
            'Name' => $key['Name']
        );
    }
echo "<div id='citiesSelect' hidden=''><label for='city'>Choose a city:</label> 
<select name='cities' id='cities' onchange='markersCityChange(this.value)'>
<option disabled='' selected='' value=''>Select a city</option>
</select>
</div>";
?>