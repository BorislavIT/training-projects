function QueryTowns() {
  try {
    $.ajax({
      type: "GET",
      url: createGetUrl(),
      data: {
      },
      success: function(response) {
        let table = $("#towns");
        table.find('td').remove();
        let array = JSON.parse(response);
        array.forEach(element => {
          let townToAppend = "<tr>"
          townToAppend+= "<td>" + element["Id"] + "</td>";
          townToAppend+= "<td>" + element["Name"] + "</td>";
          townToAppend+= "<td>" + element["mName"] + "</td>";
          townToAppend+= "<td>" + element["rName"] + "</td>";
          townToAppend+= "</tr>";

          table.append(townToAppend)
        });
      }
  });
  } catch (error) {
    console.log(error)
  }
}

function createGetUrl(){
  let townName = $("#tName").val();
  townName = encode_utf8(townName)
  townName = decode_utf8(townName)
  let townURL = "http://127.0.0.1:5000/getTowns?name=";

  return townURL.concat(townName);
}

function encode_utf8( s )
{
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s )
{
  return decodeURIComponent( escape( s ) );
}
