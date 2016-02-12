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

Array.prototype.includeEquals = function (array) {
  for (var i = 0; i < this.length; i++) {
    if (equals(this[i], array)) {
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
  this.turning = false;
  this.last_segment = this.segments[0];
  this.growLength = 0;
};

Snake.prototype.oppositeDirection = function(dir) {
  var oppositeDirs = {N: "S", S: "N", E: "W", W: "E"};
  return oppositeDirs[dir];
};

Snake.prototype.move = function () {
  if (!this.board.gameOver) {
    this.turning = false;
    if (this.segments.length === 1) {
      var opposite = this.dirs[this.oppositeDirection(this.direction)];
      var first = this.segments[0];
      var second = c.plus(first, opposite);
      var third = c.plus(second, opposite);
      this.last_segments = [first, second, third];
    } else {
      var l = this.segments.length;
      this.last_segments = [this.segments[l-1], this.segments[l-2], this.segments[l-3]];
    }
    for (i = this.segments.length - 1; i > 0; i--) {
      this.segments[i] = this.segments[i - 1];
    }
    this.segments[0] = c.plus(this.segments[0], this.dirs[this.direction]);
    this.checks();
  }
};

Snake.prototype.turn = function (dir) {
  if (!c.isOpposite(this.direction, dir) && !this.turning) {
    this.turning = true;
    this.direction = dir;
  }
};

Snake.prototype.grow = function () {
  this.segments = this.segments.concat(this.last_segments);
};

Snake.prototype.checks = function () {
  if (this.board.checkEat() === 1) {
    this.board.snakeEat();
  } else if (this.board.checkEat() === 2) {
    // alert("that wasn't starbucks... you couldn't even");
    alert("that wasn't starbucks... #firstworldproblems");
    // alert("Josh is allergic to generic coffee.");

    document.location.reload();
  }
  else if (this.board.checkCollision()) {
    alert("you eated yourself.");
    document.location.reload();
  }
};

//----------------------------------------------------------
// BOARD
var Board = function () {
  this.grid = [];
  this.gameOver = false;
  for (var i = 0; i < 25; i++) {
    this.grid.push(new Array(25));
  }
  this.snake = new Snake(this);
  this.apple = new Apple(this);
  this.badApples = [];
};

Board.prototype.checkEat = function () {
  if (c.equals(this.snake.segments[0], this.apple.position)) {
    return 1;
  }

  for (var i = 0; i < this.badApples.length; i++) {
    if (c.equals(this.badApples[i].position, this.snake.segments[0])) {
      return 2;
    }
  }

  return 0;
};

Board.prototype.snakeEat = function () {
  this.apple.position = [];
  this.apple.generateApple();
  this.badApples.push(new BadApple(this));
  this.snake.grow();
};

Board.prototype.checkBound = function () {
  if (
      this.snake.segments[0][0] >= 25 ||
      this.snake.segments[0][1] >= 25 ||
      this.snake.segments[0][0] < 0 ||
      this.snake.segments[0][1] < 0
    ) {
    return true;
  }
};

Board.prototype.occupied = function (pos) {
  segments = this.snake.segments;
  for (var i = 0; i < segments.length; i++) {
    if (c.equals(pos, segments[i])) {
      return true;
    }
  }
  return false;
};

Board.prototype.checkCollision = function () {
  if (this.snake.segments.length === 1) { return false; }
  var head= this.snake.segments[0];
  var piece;
  for (var i = 1; i < this.snake.segments.length; i++) {
    piece = this.snake.segments[i];
    if (c.equals(head, piece)) {
      return true;
    }
  }
  return false;
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
  while (this.board.occupied([x, y])) {
    x = Math.floor(Math.random() * 25);
    y = Math.floor(Math.random() * 25);
  }
  this.position = [x, y];
};

//----------------------------------------------------------

// BAD APPLE

var BadApple = function (board) {
  this.board = board;
  this.generateBadApple();
};

BadApple.prototype.generateBadApple = function () {
  var x = Math.floor(Math.random() * 25);
  var y = Math.floor(Math.random() * 25);
  while (this.board.occupied([x, y])) {
    x = Math.floor(Math.random() * 25);
    y = Math.floor(Math.random() * 25);
  }
  this.position = [x, y];
};

module.exports = Board;
