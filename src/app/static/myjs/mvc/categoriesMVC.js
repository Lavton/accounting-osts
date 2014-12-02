(function(){
  $.jstree.defaults.core.multiple = false;

  var CategoryModel = Backbone.Model.extend({
    parse: function(resp) {
      return resp;
    }
  });

  var CategoryCollection = Backbone.Collection.extend({
    model: CategoryModel,
    url: "#",
    get_jstree: function(type) {
      var struc = []
      this.each(function(model) {
        var item = model.toJSON()
        item.id = item.indef;
        item.text = item.name;
        item.text += " "+"<i class="+type+">"+item.sum+"</i>"
        if (item.type == type) {
          struc.push(item);
        }
      })
      return struc;
    }
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

      $("body").on("click:close", function() {
        console.log("YEEEEEEEEEEEEEEEEEEEE")
        this.render();
      });
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
                action: function () {
                  console.log(node)
                  var body = 
                  '<input type="text" value="" id="node_name">\
                  </input>';

                  var footer = 
                ' <button type="button" class="btn btn-primary rename" data-dismiss="modal">Rename</button> \
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';

                  var RenameBody = Backbone.View.extend({
                    initialize: function (options) {
                      _.bindAll(this, 'render', 'unrender');
                      this.options = $.extend({}, this.defaults, options);
                      this.render();
                    },

                    render: function() {
                      $(this.el).html(body);
                      $("#node_name").val(categoryCollection.where({"indef": node.id})[0].get("name"));
                      return this;
                    },

                    unrender: function(){
                      $(this.el).remove();
                      this.remove();
                    }
                  });


                  var RenameFooter = Backbone.View.extend({
                    events: {
                      'click button.rename': function() {
                        this.trigger("click:rename");
                      }
                    },

                    initialize: function (options) {
                      _.bindAll(this, 'render', 'unrender');
                      this.options = $.extend({}, this.defaults, options);
                      this.on("click:rename", function() {
                        console.log($("#node_name").val())
                        categoryCollection.where({"indef": node.id})[0].set({"name": $("#node_name").val()});
                        $("body").trigger("click:close");
                      }, this);
                      this.render();
                    },

                    render: function() {
                      $(this.el).html(footer);
                      return this;
                    },

                    unrender: function(){
                      $(this.el).remove();
                      this.remove();
                    }
                  });

                  $("#container-tmp").append("<div></div>")
                  popwindow = new PopupView({
                    el: $("div", $("#container-tmp")),
                    body: RenameBody,
                    footer: RenameFooter,
                  });
                }
            },
            abracadabraItem: {
              label: "EEE",
              action: function() {}
            },
            deleteItem: { // The "delete" menu item
                label: "Delete",
                action: function () {console.log(node)}
            },
        };
        return items;
      };
      $(this.el).jstree({ 
      'core' : {
        'data' : this.collection.get_jstree(this.options.type),
      },
      "plugins" : [ "contextmenu", "wholerow" ],
      contextmenu: {items: customMenu}
    }); 
    var ref = $(this.el).jstree(true);
    //a.jstree-anchor
/*    $(this.el).on('select_node.jstree', function (e, data) {
      console.log(e)
      console.log(data)
      console.log($(this.el))
      //console.log(ref)
      console.log(ref.get_selected())
    });
*/    
    }

  });

  window.CategoryModel = CategoryModel;
  window.CategoryCollection = CategoryCollection;
  window.CategoriesView = CategoriesView;
})();