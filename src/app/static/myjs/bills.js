(function() {

  Backbone.Model.prototype.save = function() {
//    this. = $.extend({}, this.defaults, options);
  }

  var Controller = {

    init: function() {

      window.collection = new List();

      $.ajax({
        method: 'get',
        url: 'bill'
      }).done(function(json) {
        console.log(json);
        data = json;
        Controller.makeCollection();
        console.log('success');
      }).fail(function() {
        data = JSON.parse(localStorage["bill"]);
        Controller.makeCollection();
        console.log('fail');
      });

    },

    makeCollection: function() {
      
      _(data).each(function(item){
        var it = new Item();
        if(item.visible == 1) { //not here
          it.set(item);
          collection.add(it);
        }
      })


     collection.on("add", function(obj) {
        console.log("new " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum")); 
        localStorage["bill"] = JSON.stringify(collection.toJSON());

        requestQuery.push({
          method: 'post',
          url: 'bill',
          data: {
            indef: obj.get("indef"),
            name: obj.get("name"),
            sum: obj.get("sum")
          }
        });
        localStorage["request"] = JSON.stringify(requestQuery);
      });

      collection.on("change", function(obj) {
        console.log("set " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));
        localStorage["bill"] = JSON.stringify(collection.toJSON());
      
        requestQuery.push({
            method: 'put',
            url: 'bill',
            data: {
              indef: obj.get("indef"),
              name: obj.get("name"),
              sum: obj.get("sum")
            }
        });
        localStorage["request"] = JSON.stringify(requestQuery);
      });

      collection.on("destroy", function(obj) {
        console.log("del " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));
        localStorage["bill"] = JSON.stringiflocalStorage["bills"] = JSON.stringify(collection.toJSON());y(collection.toJSON());

        requestQuery.push({
            method: 'put',
            url: 'bill',
            data: {
              indef: obj.get("indef"),
              visible: 0
            }
        });
        localStorage["request"] = JSON.stringify(requestQuery);
      });
      
    },

    print: function(){
      console.log(data)
    }
  }

  window.BillsController = Controller;
  $(BillsController.init);

})();
