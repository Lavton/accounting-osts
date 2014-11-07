(function(){

  var Controller = {

    makePage: function() {
      $("#container").append($('#home_html').html());
      $("#container-down").append($('#gainModel'));
      $(".add").click(function() {
        var g = $(".gain_amount").val()
        if (!isNaN(g) && (g > 0)) {
          $("#num_gain").val(g);
        } else {
          $("#num_gain").val("");
        }
      });
    },
    cleanPage: function() {
      $(".content").html("");
    }
  }

  window.HomePage = Controller;
})();