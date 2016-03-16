var Board = require("./snake.js");

var $ = require("./jquery-2.1.1.js");
var View = function ($el) {
  this.board = new Board();
  this.apple = this.board.apple;
  this.badApples = this.board.badApples;
  this.snake = this.board.snake;
  this.$el = $el;
  this.setupView();
  this.bindKeyEvents();

  setInterval(this.step.bind(this), 100);
};

View.prototype.bindKeyEvents = function () {
  $(document).on("keydown", function (e) {
    var keycodes = [37, 38, 39, 40];
    var direction = ["W", "N", "E", "S"];
    if (keycodes.includes(e.keyCode)) {
      e.preventDefault();
      var movement = keycodes.indexOf(e.keyCode);
      this.snake.turn(direction[movement]);
    } else if (e.keyCode === 192) {
      debugger;
      console.log("youre in debugger");
    }
  }.bind(this));
};

View.prototype.step = function () {
  this.snake.move();
  if (this.board.checkBound() && !this.board.gameOver) {
    this.board.gameOver = true;
    document.location.href = "#openModal";
    // alert("you fell off the edge of earth");
    document.location.reload();
  }
  this.render();
};

View.prototype.render = function () {
  var board = this.board;
  var apple = this.apple;
  var badapples = this.badApples;
  var snake = this.snake;
  var positions = snake.segments;
  var equals = function (array1, array2) {
    return (array1[0] === array2[0]) && (array1[1] === array2[1]);
  };

  $("li").each(function (idx, el) {
    $(el).removeClass().addClass("open");
    if (equals(apple.position, $(el).data('pos'))) {
      $(el).addClass("apple");
    }

    for (var i = 0; i < badapples.length; i++) {
      if (equals(badapples[i].position, $(el).data('pos'))) {
        $(el).addClass("bad-apple");
      }
    }


    for (var j = 0; j < positions.length; j++) {
      if (equals(positions[j], $(el).data('pos'))) {
        $(el).removeClass().addClass("has-snake");
      }
    }
  });
};

View.prototype.setupView = function () {
  this.$el.append("<ul>");
  var boardlen = this.board.grid.length;
  var $ul = $("<ul>").addClass("snake-grid group");
  for (var i = 0; i < Math.pow(boardlen, 2); i++) {
    var pos = [parseInt(i / boardlen), i % boardlen];
    $("<li>").addClass("open").data("pos", pos).appendTo($ul);
  }
  this.$el.html($ul);
};

module.exports = View;
