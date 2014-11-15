(function(){

  var Controller = {

    makePage: function() {
      var gainViewFrom = new CategoriesView();
      var gainViewTo = new CategoriesView();

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
      $(".modal-body").append('<table class="whole_length">\
        <tr><td>откуда</td><td>куда</td></tr>\
        <tr><td>\
        <div id="from_g" class="centered"></div>\
        </td><td>\
        <div id="to_g" class="centered"></div>\
        </td></tr>\
        </table>');
      $("#from_g").append(gainViewFrom.el);
      $("#to_g").append(gainViewTo.el);
      gainViewFrom.setCollection(categoryCollection);
      gainViewTo.setCollection(categoryCollection);
    },
    cleanPage: function() {
      $(".content").html("");
    }
  }

  window.HomePage = Controller;
})();