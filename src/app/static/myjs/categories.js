(function(){


  var data = null;

  var Controller = {

    init: function(){

      new_data = [
        {
        "idef" : "com_trans",
        "parent" : "#",
        "name" : "Транспорт",
        "icon":"http://jstree.com/tree.png",
        "type": "gains",
        "sum": 20,
        },
        {
        "idef" : "food",
        "parent" : "#",
        "name" : "Еда",
        "type": "gains",
        "sum": 20,

        },
        {
        "idef" : "trans_car",
        "parent" : "com_trans",
        "name" : "На бензин",
        "type": "gains",
        "sum": 20,
        },
        {
        "idef" : "metro",
        "parent" : "com_trans",
        "name" : "На метро",
        "type": "gains",
        "sum": 20,
        },
      ]


      data = [
        {
        "id" : "com_trans",
        "parent" : "#",
        "text" : "Транспорт",
        "icon":"http://jstree.com/tree.png",

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
      var collection = new CategoryCollection(new_data);

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