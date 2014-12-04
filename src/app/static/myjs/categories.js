(function(){


  var data = null;

  var Controller = {

    init: function(){

      data = [
        {
          "indef" : "gains",
          "parent" : "#",
          "name" : "Приобретения",
          "type" : "gains",
          "sum" : 0,
          "opened"    : true  // is the node open
        },
        {
          "indef" : "incomes",
          "parent" : "#",
          "name" : "Доходы",
          "type" : "incomes",
          "sum" : 0,
          "opened"    : true  // is the node open

        },


      ]
       Controller.makeCollection();
    },

    makeCollection: function() {
      var collection = new CategoryCollection(data);

      collection.on("add", function(obj) {
        console.log("new " + obj.get("id"));
      });

      collection.on("change", function(obj) {
        console.log("set " + obj.get("id"));
      });

      collection.on("destroy", function(obj) {
        console.log("del " + obj.get("id"));
      });

      window.categoryCollection = collection;
    },

    print: function(){
      console.log(data)
    }
  }

  window.CategoryController = Controller;
  $(CategoryController.init);

})();