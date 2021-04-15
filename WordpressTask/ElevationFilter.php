<?php
 $servername = "localhost";
    $username = "wpuser";
    $password = "028563513a";
    $dbname = "wordpress";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT MIN(Elevation) AS minElevation, MAX(Elevation) AS maxElevation FROM Markers LIMIT 2;";
    $data = $conn->query($sql);

    $arr1 = array();
    if ($data->num_rows > 0)
    {
        while ($row = $data->fetch_assoc())
        {
            array_push($arr1, $row["minElevation"], $row["maxElevation"]);
        }
    }
    else
    {
        echo "0 results";
    }
    foreach ($data as $key)
    {
        $minElevation = $key['minElevation'];
        $maxElevation = $key['maxElevation'];
    }
  echo "<div class='slidecontainer' id='elevationSlider' hidden=''>
  <center>
    <label for='elevation'>Elevation[m]</label><br>
    <input type='range' min='$minElevation' max='$maxElevation' value='0' class='slider' id='elevation' oninput='this.nextElementSibling.value = \"-9999 -> \" + this.value'> <output>-9999 -> 0</output>
  </center>
  </div>";
?>