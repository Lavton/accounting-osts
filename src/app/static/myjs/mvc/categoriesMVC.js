(function(){
  $.jstree.defaults.core.multiple = false;
  this.ref_jstree = null
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
      if (item.sum > 0) {
          item.text += " "+"<i class="+type+">"+item.sum+"</i>"
        }
        if (item.opened == true) {
          if (item.state == null){
            item.state = {}
          }
          item.state.opened = true          
        }

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

      this.on("click:close", function() {
        this.render();
      });
      this.render();
    },

    

    render: function() {

      var self = this;
      function customMenu(node) {
        // The default set of all items
        var items = {
            createItem: {
              label: "Create",
              action: function() {
                  console.log(node)
                  var body = 
                  '<input type="text" value="" id="node_name">\
                  </input> name';

                  var footer = 
                ' <button type="button" class="btn btn-primary create" data-dismiss="modal">Create</button> \
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';

                  var CreateBody = Backbone.View.extend({
                    initialize: function (options) {
                      _.bindAll(this, 'render', 'unrender');
                      this.options = $.extend({}, this.defaults, options);
                      this.render();
                    },

                    render: function() {
                      $(this.el).html(body);
                      // $("#node_name").val(categoryCollection.where({"indef": node.id})[0].get("name"));
                      return this;
                    },

                    unrender: function(){
                      $(this.el).remove();
                      this.remove();
                    }
                  });


                  var CreateFooter = Backbone.View.extend({
                    events: {
                      'click button.create': function() {
                        this.trigger("click:create");
                      }
                    },

                    initialize: function (options) {
                      _.bindAll(this, 'render', 'unrender');
                      this.options = $.extend({}, this.defaults, options);
                      this.on("click:create", function() {
                        var new_node = {
                          "indef" :  (new Date()).getTime() + "",
                          "parent" : node.id,
                          "name" : $("#node_name").val(),
                          "type" : categoryCollection.where({"indef": node.id})[0].get("type"),
                          "sum" : 0,
                        }
                        categoryCollection.add(new_node);
                        self.trigger("click:close");
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
                    body: CreateBody,
                    footer: CreateFooter,
                  });


              }

            },
            renameItem: { // The "rename" menu item
                label: "Rename",
                action: function () {
                  console.log(node)
                  var body = 
                  '<input type="text" value="" id="node_name">\
                  </input> name';

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
                      $("#node_name").select();

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
                        self.trigger("click:close");
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
            addItem: {
              label: "Add " + categoryCollection.where({"indef": node.id})[0].get("type"),
              action: function() {
                var res = categoryCollection.where({"indef": node.id})[0]
                res.set({"state": {
                  selected: true,
                }})
                $("#container-tmp").append("<div></div>")
                popwindow = new PopupView({
                  el: $("div", $("#container-tmp")),
                  body: (categoryCollection.where({"indef": node.id})[0].get("type") == "gains") ? AddGainBody : AddIncomeBody,
                  footer: (categoryCollection.where({"indef": node.id})[0].get("type") == "gains") ? AddGainFooter : AddIncomeFooter,
                });
                categoryCollection.where({"indef": node.id})[0].set({"state": {
                  selected: false,
                }})
                $("body").on("close:adding", function() {
                  self.trigger("click:close");
                });
              }
            },
            deleteItem: { // The "delete" menu item
                label: "Delete",
                action: function () {
                  if (node.parent != "#") {
                    var queue = []
                    node.children.forEach(function(item, i, arr) {queue.push(item)})
                    categoryCollection.remove(categoryCollection.where({"indef": node.id})[0])

                    while (queue.length != 0) {
                      var new_id = queue.shift()
                      var new_node = self.ref_jstree.get_node(new_id);
                      new_node.children.forEach(function(item, i, arr) {queue.push(item)})
                      categoryCollection.remove(categoryCollection.where({"indef": new_node.id})[0])
                    }

                    self.trigger("click:close")
                  }
                  console.log(node)}
            },
        };
        return items;
      };
      if (this.ref_jstree != null) {
        $(this.el).jstree("destroy");
        $(this.el).html("");
      }
      $(this.el).jstree({ 
      'core' : {
        'data' : this.collection.get_jstree(this.options.type),
      },
      "plugins" : [ "contextmenu", "wholerow" ],
      contextmenu: {items: customMenu}
      }); 
      this.ref_jstree = $(this.el).jstree(true);
    }

  });

  window.CategoryModel = CategoryModel;
  window.CategoryCollection = CategoryCollection;
  window.CategoriesView = CategoriesView;
})();