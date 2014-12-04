(function(){
  this.incomeView = null;

  var Controller = {
    makePage: function() {
      $("#container").append("<div id='incomes-div'></div>");
        this.incomeView = new CategoriesView({
          el: $("#incomes-div"),
          cCollection: categoryCollection,
          type:'incomes'
        });
    },
  
    cleanPage: function() {
      $(".content").html("");
    }
  }
  window.IncomesPage = Controller;
})();