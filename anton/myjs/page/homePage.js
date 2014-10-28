(function(){

  var Controller = {

    makePage: function() {
      $("#container").append($('#home_html > #gain_button').html());
      $("#container-down").append($('#home_html > #gainModel'));
      $(".add").click(function() {
        var g = $(".gain_amount").val()
        if (!isNaN(g) && (g > 0)) {
          $("#num_gain").val(g);
        }
      });
    },
    cleanPage: function() {
      $(".content").html("");
    }
  }

  window.HomePage = Controller;
})();