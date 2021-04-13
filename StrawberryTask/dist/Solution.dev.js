"use strict";

function Solve() {
  var row = 8;
  var col = 10;
  var days = 2;
  var x = new Array(row);

  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(col);
  }

  for (var index = 0; index < x.length; index++) {
    var str = '';

    for (var _i = 0; _i < x[index].length; _i++) {
      x[index][_i] = _i;
      str += ' ' + x[index][_i];
    }

    console.log(str);
    console.log('');
  }

  var firstStrawberry = 5; //10 koloni
  //8 reda
}

Solve();