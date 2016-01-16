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

//----------------------------------------------------------
// SNAKE
var Snake = function (board) {
  this.board = board;
  this.direction = "N";
  var x = Math.floor(Math.random() * 20)
  var y = Math.floor(Math.random() * 20)
  this.segments = [[x, y]];
  this.dirs = { N: [-1, 0], S: [1, 0], E: [0, 1], W: [0, -1] };
  this.head = this.segments[0]
};

Snake.prototype.move = function () {
  this.segments[0] = c.plus(this.segments[0], this.dirs[this.direction]);
  // each subsequent segment becomes the previous segment
  for (i = this.segments.length - 1; i > 0; i--) {
    this.segments[i] = this.segments[i - 1];
  }
  this.board.checkEat();
  // this.board.selfCollision();
};

Snake.prototype.turn = function (dir) {
  if (!c.isOpposite(this.direction, dir)) {
    this.direction = dir;
  }
};

Snake.prototype.grow = function () {
  var direction = this.direction;
  for (var i = 0; i < 3; i++) {
    var last_segment = this.segments[this.segments.length - 1]
    this.segments.push(last_segment)
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
  if (c.equals(this.snake.segments[0], this.apple.position)) {
    this.apple.position = [];
    this.apple.generateApple();
    this.snake.grow();
  }
};

Board.prototype.selfCollision = function () {
  debugger;
  if (this.snake.segments.slice(1).includes(this.snake.head)) {

    alert("you lose!");
  }
}

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



module.exports = Board;
