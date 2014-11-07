(function(){


  var data = null;

  var Controller = {

    init: function(){
      data = {
        var2: {
          id: 0,
          name: "salary",
          sum: 0
        },
        var3: {
          id: 1,
          name: "nowhere",
          sum: 9999999,
          visible: false
        },
        var5: {
          id: 2,
          name: "products",
          sum: 0
        },
        var6: {
          id: 4,
          name: "public utilities",
          sum: 0
        },
        var7: {
          id: 3,
          name: "perquisite",
          sum: 0
        }
      };

      Controller.makeCollection();
    },

    makeCollection: function() {
      var collection = new BillCollection();
      _(data).each(function(item){
        var it = new BillModel();
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