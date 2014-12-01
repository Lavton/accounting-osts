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
          "state" : {
            "opened"    : true  // is the node open
          },
        },

        {
        "indef" : "com_trans",
        "parent" : "gains",
        "name" : "Транспорт",
        "icon":"http://jstree.com/tree.png",
        "type": "gains",
        "sum": 0
        },
        {
        "indef" : "food",
        "parent" : "gains",
        "name" : "Еда",
        "type": "gains",
        "sum": 0

        },
        {
        "indef" : "trans_car",
        "parent" : "com_trans",
        "name" : "На бензин",
        "type": "gains",
        "sum": 0
        },
        {
        "indef" : "metro",
        "parent" : "com_trans",
        "name" : "На метро",
        "type": "gains",
        "sum": 0
        },


        {
          "indef" : "incomes",
          "parent" : "#",
          "name" : "Доходы",
          "type" : "incomes",
          "sum" : 0,
          "state" : {
            "opened"    : true  // is the node open
          },

        },

        {
        "indef" : "salary",
        "parent" : "incomes",
        "name" : "Зарплата",
        "icon":"http://jstree.com/tree.png",
        "type": "incomes",
        "sum": 0
        },
        {
        "indef" : "reps",
        "parent" : "incomes",
        "name" : "Репетиторство",
        "type": "incomes",
        "sum": 0

        },
        {
        "indef" : "prems",
        "parent" : "salary",
        "name" : "На бензин",
        "type": "incomes",
        "sum": 0
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