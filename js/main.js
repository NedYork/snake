var View = require("./view.js");
document.addEventListener('DOMContentLoaded', function () {
  $('.start').click(
    function () {
      setTimeout(function() {
        var view = new View($('.snake'));
      }, 1500);
    }
  );

});
