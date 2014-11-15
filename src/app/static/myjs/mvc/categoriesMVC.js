(function(){
    $.jstree.defaults.core.multiple = false;

  var CategoryModel = Backbone.Model.extend();
  var CategoryCollection = Backbone.Collection.extend({
    model: CategoryModel,
    url: "#"
  });

  CategoriesView = Backbone.View.extend({
  
    initialize: function() {
      console.log("CAT")
      _.bindAll(this, 'render'); 
      this.counter = 0;
    },

    setCollection: function(collection) {
      this.collection = collection;
      console.log("setCollection")
      this.render();
    },

    render: function() {
      console.log("HELLO");
      $(this.el).append("H");
      $(this.el).jstree({ 
      'core' : {
        'data' : this.collection.models
      }, 
      "plugins" : [ "contextmenu", "wholerow" ]
    }); 
    var ref = $(this.el).jstree(true);

    $(this.el).on('select_node.jstree', function (e, data) {
      console.log("Hello!")
      console.log(e)
      console.log(data)
      console.log($(this.el))
      //console.log(ref)
      console.log(ref.get_selected())
    });
    
    }

  });

  window.CategoryModel = CategoryModel;
  window.CategoryCollection = CategoryCollection;
  window.CategoriesView = CategoriesView;
})();