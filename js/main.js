var View = require("./view.js");
var $ = require("./jquery-2.1.1.js");
$('button').click(
  setTimeout(function() {
    var view = new View($('.snake'));
  }, 1500)
);
