(function(){


  var data = null;

  var Controller = {

    init: function(){
      data = {
        var2: {
          indef: "var2",
          name: "bill_1",
          sum: 187
        },
        var3: {
          indef: "var3",
          name: "bill_2",
          sum: 1543
        },
        var5: {
          indef: "var5",
          name: "bill_3",
          sum: 142300
        },
        var7: {
          indef: "var7",
          name: "bill_4",
          sum: 999
        }
      };

      Controller.makeCollection();
    },

    makeCollection: function() {
      
      var collection = new List();
      _(data).each(function(item){
        var it = new Item();
        it.set(item);
        collection.add(it);
      })

      collection.on("add", function(obj) {
        console.log("new " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));
      });

      collection.on("change", function(obj) {
        console.log("set " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));
      });

      collection.on("destroy", function(obj) {
        console.log("del " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));
      });

      window.collection = collection;
    },

    print: function(){
      console.log(data)
    }
  }

  window.BillsController = Controller;
  $(BillsController.init);

})();