var Coord = function () {};
var c = Coord.prototype;

c.plus = function (array1, array2) {
  return [array1[0] + array2[0], array1[1] + array2[1]];
};

c.equals = function (array1, array2) {
  return (array1[0] === array2[0]) && (array1[1] === array2[1]);
};

c.isOpposite = function (dir1, dir2) {
  var direcs1 = ["N", "S", "E", "W"];
  var direcs2 = ["S", "N", "W", "E"];
  return direcs1.indexOf(dir1) === direcs2.indexOf(dir2);
};

Array.prototype.equalArrays = function (array) {
  if (!array) {
    return false;
  } else if (this.length != array.length) {
    return false;
  }

  for (var i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i])) {
        return false;
      } else if (this[i] != array[i]) {
        return false;
      }
    }
    return true;
  }
};

Array.prototype.includeEquals = function (array) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].equalArrays(array)) {
      return true;
    }
  }
  return false;
};

//----------------------------------------------------------
// SNAKE
var Snake = function (board) {
  this.board = board;
  this.direction = "N";
  this.segments = [[12, 12]];
  this.dirs = { N: [-1, 0], S: [1, 0], E: [0, 1], W: [0, -1] };
  this.growing = false;
};

Snake.prototype.move = function () {
  this.segments[0] = c.plus(this.segments[0], this.dirs[this.direction]);
  // each subsequent segment becomes the previous segment
  for (i = this.segments.length - 1; i > 0; i--) {
    this.segments[i] = this.segments[i - 1];
  }
  this.checks();
};

Snake.prototype.turn = function (dir) {
  if (!c.isOpposite(this.direction, dir)) {
    this.direction = dir;
  }
};

Snake.prototype.grow = function () {
  this.growing = true;
  var direction = this.direction;
  for (var i = 0; i < 3; i++) {
    var last_segment = this.segments[this.segments.length - 1];
    this.segments.push(last_segment);
    if (i === 2) {
      this.growing = false;
    }
  }
};

Snake.prototype.checks = function () {
  if (this.board.checkEat()) {
    this.board.snakeEat();
  }

  if (this.board.checkCollision()) {
    alert("you eated yourself.");

  } else if (this.board.checkBound()) {
    console.log("you fell off the edge of earth");

  }
};

//----------------------------------------------------------
// BOARD
var Board = function () {
  this.grid = [];
  for (var i = 0; i < 25; i++) {
    this.grid.push(new Array(25));
  }
  this.snake = new Snake(this);
  this.apple = new Apple(this);
};

Board.prototype.checkEat = function () {
  return c.equals(this.snake.segments[0], this.apple.position);
};

Board.prototype.snakeEat = function () {
  this.apple.position = [];
  this.apple.generateApple();
  this.snake.grow();
};

Board.prototype.checkBound = function () {
  if (
      this.snake.segments[0][0] > 24 ||
      this.snake.segments[0][1] > 24 ||
      this.snake.segments[0][0] < 0 ||
      this.snake.segments[0][1] < 0
    ) {
    return true;
  }
};

Board.prototype.checkCollision = function () {
  var len;
  if (this.snake.segments.length - 4 <= 0) {
    len = 0;
  }
  var seg = this.snake.segments.slice().splice(len);
  if (this.snake.segments.length > 1 && seg.includeEquals(this.snake.segments[0])) {
    debugger;
    return true;
  }
};

//----------------------------------------------------------
// APPLE
var Apple = function (board) {
  this.board = board;
  this.generateApple();
};

Apple.prototype.generateApple = function () {
  var x = Math.floor(Math.random() * 25);
  var y = Math.floor(Math.random() * 25);
  this.position = [x, y];
  // debugger
  var snakeSegments = this.board.snake.segments;

  if (snakeSegments.includes(this.position)) {
    generateApple();
  }
};

//----------------------------------------------------------

module.exports = Board;
