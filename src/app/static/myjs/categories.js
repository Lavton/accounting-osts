
(function(){


  var data = null;

  var Controller = {

    init: function() {

      $.ajax({
        method: 'get',
        url: 'category'
      }).done(function(json) {
        console.log(json);
        data = json;
        Controller.makeCollection();
        console.log('success');
      }).fail(function() {
        data = JSON.parse(localStorage["category"]);
        Controller.makeCollection();
        console.log('fail');
      });

    },

    makeCollection: function() {
      var catCollection = new CategoryCollection();
      _(data).each(function(item){
        var it = new CategoryModel();
        it.set(item);
        catCollection.add(it);
      })


      catCollection.on("add", function(obj) {
        console.log("new " + obj.get("indef") + " " + obj.get("name") + " " + obj.get("sum"));         localStorage["category"] = JSON.stringify(categoryCollection.toJSON());
        requestQuery.push({
          method: 'post',
          url: 'category', 
          data: {
            indef: obj.get("indef"),
            parent: obj.get("parent"),
            name: obj.get("name"),
            type: obj.get("type"),
            opened: obj.get("opened"),
            sum: obj.get("sum"),
          }
        });
        localStorage["request"] = JSON.stringify(requestQuery);


      });

      catCollection.on("change", function(obj) {
        console.log("change " + obj.get("indef") + " " + obj.get("name"));       
        localStorage["category"] = JSON.stringify(categoryCollection.toJSON());
      
        requestQuery.push({
            method: 'put',
            url: 'category',
            data: {
              indef: obj.get("indef"),
              name: obj.get("name"),
              sum: obj.get("sum"),
            }
        });
        localStorage["request"] = JSON.stringify(requestQuery);


      });

      catCollection.on("remove", function(obj) {
        console.log("remove " + obj.get("indef") + " " + obj.get("name")); 
        localStorage["category"] = JSON.stringify(categoryCollection.toJSON());

        requestQuery.push({
            method: 'put',
            url: 'category',
            data: {
              indef: obj.get("indef"),
              type: "none"
            }
        });
        localStorage["request"] = JSON.stringify(requestQuery);

      });

      window.categoryCollection = catCollection;
    },

    print: function(){
      console.log(data)
    }
  }

  window.CategoryController = Controller;
  $(CategoryController.init);

})();