'use strict';

// Returns random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Returns array with numbers
function getRandNumPool(size) {
  const nums = [];
  for (var i = 1; i <= size; i++) nums.push(i);

  return shuffle(nums);
}

// Shuffle items in array
function shuffle(arr) {
  let currentIndex = arr.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}

// Id generator
function makeId(length = 6) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

// Deep copy of array
function copyArray(array) {
  return JSON.parse(JSON.stringify(array));
}

// Random color string
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
