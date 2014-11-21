(function(){

  var Controller = {

    init: function() {

      window.transactionCollection = new List();

      $.ajax({
        method: 'get',
        url: 'transaction'
      }).done(function(json) {
        console.log(json);
        data = json;
        Controller.makeCollection();
      }).fail(function() {
        console.log('fail');
        data = JSON.parse(localStorage["transaction"]);
        Controller.makeCollection();
      });

    },

    makeCollection: function() {

    _(data).each(function(item){
      var it = new Item();
      it.set(item);
      transactionCollection.add(it);
    })

     transactionCollection.on("add", function(obj) {
        console.log("new " + obj.get("from") + " " + obj.get("to") + " " + obj.get("delta")); 
        localStorage["transaction"] = JSON.stringify(transactionCollection.toJSON());

        requestQuery.push({
          method: 'post',
          url: 'transaction',
          data: {
            indef: obj.get("indef"),
            data: obj.get("data"),
            from: obj.get("from"),
            fromClass: obj.get("fromClass"),
            to: obj.get("to"),
            toClass: obj.get("toClass"),
            delta: obj.get("delta")
          }
        });
        localStorage["request"] = JSON.stringify(requestQuery);
      });

      transactionCollection.on("destroy", function(obj) {
        console.log("del " + obj.get("from") + " " + obj.get("to") + " " + obj.get("delta"));
        localStorage["transaction"] = JSON.stringify(transactionCollection.toJSON());

        requestQuery.push({
          method: 'put',
          url: 'transaction',
          data: {
            indef: obj.get("indef"),
            visible: obj.get("visible")
          }
        });
        localStorage["request"] = JSON.stringify(requestQuery);
      });
    },

    print: function(){
      console.log(data)
    }
  }

  window.TransactionController = Controller;
  $(TransactionController.init);

})();
