var Board = require("./snake.js");

var $ = require("./jquery-2.1.1.js");
var View = function ($el) {
  this.board = new Board();
  this.snake = this.board.snake;
  this.apple = this.board.apple;
  this.$el = $el;
  this.setupView();
  this.bindKeyEvents();

  setInterval(this.step.bind(this), 70);
};

View.prototype.bindKeyEvents = function () {
  $(document).on("keydown", function (e) {
    var keycodes = [37, 38, 39, 40];
    var direction = ["W", "N", "E", "S"];
    if (keycodes.includes(e.keyCode)) {
      var movement = keycodes.indexOf(e.keyCode);
      this.snake.turn(direction[movement]);
    }
  }.bind(this));
};

View.prototype.step = function () {
  this.snake.move();
  this.render();
};

View.prototype.render = function () {
  var board = this.board;
  var apple = this.apple;
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

    for (var i = 0; i < positions.length; i++) {
      if (equals(positions[i], $(el).data('pos'))) {
        $(el).removeClass().addClass("has-snake");
      }
    }
  });
};

View.prototype.setupView = function () {
  this.$el.append("<ul>");
  var boardlen = this.board.grid.length
  var $ul = $("<ul>").addClass("snake-grid group");
  for (var i = 0; i < Math.pow(boardlen, 2); i++) {
    var pos = [parseInt(i / boardlen), i % boardlen];
    $("<li>").addClass("open").data("pos", pos).appendTo($ul);
  }
  this.$el.html($ul);
};

module.exports = View;
