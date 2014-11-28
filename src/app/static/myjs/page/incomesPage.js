(function(){
  this.homeView = null;

  var Controller = {

    makePage: function() {
      $("#container").append("<div id='home-div'></div>");
      this.homeView = new HomeView({
        el: $("#home-div"),
      });
      $(".add").click(function() {
        var g = $(".gain_amount").val()
        $("#container-tmp").append("<div></div>")
        popwindow = new PopupView({
          el: $("div", $("#container-tmp")),
          body: AddGainBody,
          footer: AddGainFooter,
        });
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
  window.IncomesPage = Controller;
})();