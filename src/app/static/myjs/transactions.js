(function(){

  var Controller = {

    init: function(){
      data = {
      };

      var collection = new TransactionList();
      window.transactionCollection = collection;

    },

    makeCollection: function() {


     collection.on("add", function(obj) {
        console.log("new " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum")); 
      });

      collection.on("change", function(obj) {
        console.log("set " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));
      });

      collection.on("destroy", function(obj) {
        console.log("del " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));
      });
    },

    print: function(){
      console.log(data)
    }
  }

  window.TransactionController = Controller;
  $(TransactionController.init);

})();
