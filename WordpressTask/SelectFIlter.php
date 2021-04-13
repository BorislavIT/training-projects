<?php
 $servername = "localhost";
    $username = "wpuser";
    $password = "028563513a";
    $dbname = "wordpress";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM Countries";
    $data = $conn->query($sql);

    $arr1 = array();
    if ($data->num_rows > 0)
    {
        while ($row = $data->fetch_assoc())
        {
            array_push($arr1, $row["CountryCode"], $row["Country"]);
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
            'Country' => $key['Country']
        );
    }
    echo '<label for="country">Choose a country:</label>';
    echo '<select name="countries" id="countries" onchange="markersCountryChange(this.value)">';
    echo '<option disabled="" selected="" value="">Select a country</option>';
foreach ($countries as $country) {
    $countryCode = $country['cCode'];
    $countryName = $country['Country'];
    echo "<option value=$countryCode>$countryName</option>";
}
echo '</select>';


// <select name="cities" id="cities" onchange="markersCityChange(this.value)">
//  <option disabled="" selected="" value="">Select a city</option>
//   <option value="Sofia">Sofia</option>
//   <option value="Warren">Warren</option>
//   <option value="Chapuka">Chapuka</option>
// </select>';

?>