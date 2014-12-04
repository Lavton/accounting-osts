(function(){
  this.incomeView = null;

  var Controller = {
  makePage: function () {
          var self = this;
          window.CategoryController.getCategoryCollection(function () {
              $("#container").append("<div id='incomes-div'></div>");
              self.incomeView = new CategoriesView({
                  el: $("#incomes-div"),
                  cCollection: categoryCollection,
                  type: 'incomes'
              });
          });
      },  
    cleanPage: function() {
      $(".content").html("");
    }
  }
  window.IncomesPage = Controller;
})();