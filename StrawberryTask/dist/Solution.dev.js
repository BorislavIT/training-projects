"use strict";

function Solve(row, col, days, firstX, firstY, secondX, secondY) {
  var strawBerries = new Array(row);

  for (var i = 0; i < strawBerries.length; i++) {
    strawBerries[i] = new Array(col);
  }

  for (var _row = 0; _row < strawBerries.length; _row++) {
    var str = '';

    for (var _i = 0; _i < strawBerries[_row].length; _i++) {
      strawBerries[_row][_i] = 0;
      str += ' ' + strawBerries[_row][_i];
    }
  }

  var firstStrawBerryX = firstX - 1;
  var firstStrawBerryY = firstY - 1;
  strawBerries[firstStrawBerryX][firstStrawBerryY] = 1;
  var secondStrawBerryX = secondX - 1;
  var secondStrawBerryY = secondY - 1;
  strawBerries[secondStrawBerryX][secondStrawBerryY] = 1;

  for (var _i2 = 0; _i2 < days; _i2++) {
    rotStrawBerriesForADay(strawBerries);
  }

  console.log(findNumberOfHealthyStrawberries(strawBerries));
}

function findNumberOfHealthyStrawberries(array) {
  var counter = 0;

  for (var _row2 = 0; _row2 < array.length; _row2++) {
    for (var i = 0; i < array[_row2].length; i++) {
      if (array[_row2][i] == 0) {
        counter++;
      }
    }
  }

  return counter;
}

function rotStrawBerriesForADay(array) {
  var arrayOfX = [];
  var arrayOfY = [];

  for (var _row3 = 0; _row3 < array.length; _row3++) {
    for (var _col = 0; _col < array[_row3].length; _col++) {
      if (array[_row3][_col] == 1) {
        arrayOfX.push(_row3);
        arrayOfY.push(_col);
      }
    }
  }

  for (var i = 0; i < arrayOfX.length; i++) {
    rotStrawberriesAroundStrawberry(array, arrayOfX[i], arrayOfY[i]);
  }
}

function logArray(array) {
  for (var _row4 = 0; _row4 < array.length; _row4++) {
    var str = '';

    for (var i = 0; i < array[_row4].length; i++) {
      str += ' ' + array[_row4][i];
    }

    console.log(str);
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

var row = 100;
var col = 100;
var days = 60;
var firstStrawBerryX = 1;
var firstStrawBerryY = 1;
var secondStrawBerryX = 100;
var secondStrawBerryY = 100;
Solve(row, col, days, firstStrawBerryX, firstStrawBerryY, secondStrawBerryX, secondStrawBerryY);