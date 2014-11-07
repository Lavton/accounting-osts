(function(){


  var data = null;

  var Controller = {

    init: function(){
      data = [
        {
        "id" : "com_trans",
        "parent" : "#",
        "text" : "Транспорт"
        },
        {
        "id" : "food",
        "parent" : "#",
        "text" : "Еда"
        },
        {
        "id" : "trans_car",
        "parent" : "com_trans",
        "text" : "На бензин"
        },
        {
        "id" : "metro",
        "parent" : "com_trans",
        "text" : "На метро"
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