(function(){
  $.jstree.defaults.core.multiple = false;

  var CategoryModel = Backbone.Model.extend({
    parse: function(resp) {
      return resp;
    }
  });

  var CategoryCollection = Backbone.Collection.extend({
    model: CategoryModel,
    url: "#"
  });

  CategoriesView = Backbone.View.extend({
    defaults : {
      collection: null,
    },


    initialize: function(options) {
      this.options = $.extend({}, this.defaults, options);
      this.collection = this.options.cCollection
      _.bindAll(this, 'render'); 
      this.counter = 0;
      console.log("initialize")
      console.log(options)
      this.render();
    },


    render: function() {

          function customMenu(node) {
        // The default set of all items
        var items = {
            createItem: {
              label: "Create",
              action: function() {console.log(node)}
            },
            renameItem: { // The "rename" menu item
                label: "Rename",
                action: function () {console.log(node)}
            },
            deleteItem: { // The "delete" menu item
                label: "Delete",
                action: function () {console.log(node)}
            }
        };

        return items;
    }
      $(this.el).jstree({ 
      'core' : {
        'data' : this.collection.models
      },
      "plugins" : [ "contextmenu", "wholerow" ],
      contextmenu: {items: customMenu}
    }); 
    var ref = $(this.el).jstree(true);

    $(this.el).on('select_node.jstree', function (e, data) {
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