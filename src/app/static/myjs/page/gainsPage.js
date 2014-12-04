(function(){
  this.gainView = null;

  var Controller = {

    makePage: function() {
      var self = this;
      window.CategoryController.getCategoryCollection(function () {
      $("#container").append("<div id='gains-div'></div>");
              self.incomeView = new CategoriesView({
          el: $("#gains-div"),
          cCollection: categoryCollection,
          type:'gains'
              });
          });
    },
  
    cleanPage: function() {
      $(".content").html("");
    }
  }
  window.GainsPage = Controller;
})();