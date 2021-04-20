function Solve(row, col, days, firstX, firstY, secondX, secondY) {
  var strawBerries = new Array(row);

  for (var i = 0; i < strawBerries.length; i++) {
    strawBerries[i] = new Array(col);
  }
  for (let row = 0; row < strawBerries.length; row++) {
    let str = "";
    for (let i = 0; i < strawBerries[row].length; i++) {
      strawBerries[row][i] = 0;
      str += " " + strawBerries[row][i];
    }
  }

  let firstStrawBerryX = firstX - 1;
  let firstStrawBerryY = firstY - 1;
  strawBerries[firstStrawBerryX][firstStrawBerryY] = 1;

  let secondStrawBerryX = secondX - 1;
  let secondStrawBerryY = secondY - 1;

  strawBerries[secondStrawBerryX][secondStrawBerryY] = 1;

  for (let i = 0; i < days; i++) {
    rotStrawBerriesForADay(strawBerries);
  }

  
  let totalHealthyStrawBerries =  findNumberOfHealthyStrawberries(strawBerries);
  let divToAppendResult = $("#result").text("Result: " +  totalHealthyStrawBerries);
  printArray(strawBerries)
  logArray(strawBerries)
}

function findNumberOfHealthyStrawberries(array) {
  let counter = 0;

  for (let row = 0; row < array.length; row++) {
    for (let i = 0; i < array[row].length; i++) {
      if (array[row][i] == 0) {
        counter++;
      }
    }
  }

  return counter;
}

function rotStrawBerriesForADay(array) {
  let arrayOfX = [];
  let arrayOfY = [];
  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      if (array[row][col] == 1) {
        arrayOfX.push(row);
        arrayOfY.push(col);
      }
    }
  }

  for (let i = 0; i < arrayOfX.length; i++) {
    rotStrawberriesAroundStrawberry(array, arrayOfX[i], arrayOfY[i]);
  }
}

function logArray(array) {
  for (let row = 0; row < array.length; row++) {
    let str = "";
    for (let i = 0; i < array[row].length; i++) {
      str += " " + array[row][i];
    }
    console.log(str);
  }
}

function printArray(array) {
    let element = $("#visualizeStrawberries")
    element.empty();
    let healthyStrawberry = '<button type="button" class="btn btn-success"></button>';
    let illStrawberry = '<button type="button" class="btn btn-danger"></button>';
  for (let row = 0; row < array.length; row++) {
    let berries = '<div class="col-md-12">';
    // if(row == 0){
    //     berries+='<button type="button" class="btn btn-danger" id="dummy-btn"></button>';
    // }
    for (let i = 0; i < array[row].length; i++) {
        
      if(array[row][i] == 1){
        berries+=illStrawberry;
      }
      else{
        berries+=healthyStrawberry
      }
    }
    berries+= "</div>"
    element.append(berries)
  }
}

function checkRightForError(array, x, y) {
  if (array[x][y + 1] == undefined) {
    return true;
  }
  return false;
}

function checkLeftForError(array, x, y) {
  if (array[x][y - 1] == undefined) {
    return true;
  }
  return false;
}

function checkTopForError(array, x, y) {
  if (array[x - 1] == undefined) {
    return true;
  }
  return false;
}

function checkBotForError(array, x, y) {
  if (array[x + 1] == undefined) {
    return true;
  }
  return false;
}

function checkTopLeftForError(array, x, y) {
  if (array[x - 1] == undefined) {
    if (array[x - 1][y - 1] == undefined) {
      return true;
    }
    return true;
  }
  return false;
}

function checkTopRightForError(array, x, y) {
  if (array[x - 1] == undefined) {
    if (array[x - 1][y + 1] == undefined) {
      return true;
    }
    return true;
  }
  return false;
}

function checkBotRightForError(array, x, y) {
  if (array[x + 1] == undefined) {
    if (array[x + 1][y + 1] == undefined) {
      return true;
    }
    return true;
  }
  return false;
}

function checkBotLeftForError(array, x, y) {
  if (array[x + 1] == undefined) {
    if (array[x + 1][y - 1] == undefined) {
      return true;
    }
    return true;
  }
  return false;
}

function rotStrawBerryToTheLeft(array, x, y) {
  array[x][y - 1] = 1;
}

function rotStrawBerryToTheRight(array, x, y) {
  array[x][y + 1] = 1;
}

function rotStrawBerryToTheTop(array, x, y) {
  array[x - 1][y] = 1;
}

function rotStrawBerryToTheBot(array, x, y) {
  array[x + 1][y] = 1;
}

function rotStrawberriesAroundStrawberry(array, x, y) {
  if (!checkLeftForError(array, x, y)) {
    rotStrawBerryToTheLeft(array, x, y);
  }
  if (!checkRightForError(array, x, y)) {
    rotStrawBerryToTheRight(array, x, y);
  }
  if (!checkTopForError(array, x, y)) {
    rotStrawBerryToTheTop(array, x, y);
  }
  if (!checkBotForError(array, x, y)) {
    rotStrawBerryToTheBot(array, x, y);
  }
}

function attachEventHandler() {
  $("#inputForm").submit(function (event) {
    let formData = $("form").serializeArray();
    let rows = formData[0]["value"];
    let cols = formData[1]["value"];
    let days = formData[2]["value"];
    let fBerry = formData[3]["value"];
    let sBerry = formData[4]["value"];

    if (isNaN(rows) || isNaN(cols) || isNaN(days)) {
      if (rows <= 0 || cols <= 0 || days <= 0 || cols>40) {
        alert("invalid input");
        return;
      }
    }
    let re = new RegExp("[\\d+, \\d+]+");
    let match = fBerry.match(re);
    if (match) {
      let result = match[0];
      let resultArr = result.split(", ");
      let firstStrawBerryX = resultArr[0];
      let firstStrawBerryY = resultArr[1];
      let secondMatch = sBerry.match(re);
      if (secondMatch) {
        let secondResult = secondMatch[0];
        let secondResultArr = secondResult.split(", ");
        let secondStrawBerryX = secondResultArr[0];
        let secondStrawBerryY = secondResultArr[1];
        try {
          Solve(
            parseInt(rows),
            parseInt(cols),
            parseInt(days),
            parseInt(firstStrawBerryX),
            parseInt(firstStrawBerryY),
            parseInt(secondStrawBerryX),
            parseInt(secondStrawBerryY)
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Invalid input");
    }

    event.preventDefault();
  });
}

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

attachEventHandler();