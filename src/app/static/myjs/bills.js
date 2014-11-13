(function(){

  var Controller = {

    init: function(){
      data = {
      };

      $.ajax({
        method: 'get',
        url: 'bill'
      }).done(function(json) {
        console.log(json);
        data = json;
        Controller.makeCollection();
        console.log('success');
      }).fail(function() {
        console.log('fail');
      });

      var collection = new BillList();
      window.collection = collection;

    },

    makeCollection: function() {
      
      _(data).each(function(item){
        var it = new BillItem();
        if(item.visible == 1) { //not here
          it.set(item);
          collection.add(it);
        }
      })


     collection.on("add", function(obj) {
        console.log("new " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum")); 

        $.ajax({
            method: 'post',
            url: 'bill',
            data: {
              indef: obj.get("indef"),
              name: obj.get("name"),
              sum: obj.get("sum")
            }
        }).done(function(json) {
            console.log(json);
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
      });

      collection.on("change", function(obj) {
        console.log("set " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));
      
        $.ajax({
            method: 'put',
            url: 'bill',
            data: {
              indef: obj.get("indef"),
              name: obj.get("name"),
              sum: obj.get("sum")
            }
        }).done(function(json) {
            console.log(json);
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
      });

      collection.on("destroy", function(obj) {
        console.log("del " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));

        $.ajax({
            method: 'put',
            url: 'bill',
            data: {
              indef: obj.get("indef"),
              visible: 0
            }
        }).done(function(json) {
            console.log(json);
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
      });
      
    },

    print: function(){
      console.log(data)
    }
  }

  window.BillsController = Controller;
  $(BillsController.init);

})();
