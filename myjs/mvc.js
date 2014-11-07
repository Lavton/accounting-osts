(function(){

  var transaction_id = 0;
  
  var TransactionModel = Backbone.Model.extend({
    defaults: {
      sum: 0,
      id_from: 0,
      id_to: 0
    },
  });

  var TransactionCollection = Backbone.Collection.extend({
    Model: TransactionModel,
    url: "#"
  });

  var CategoryModel = Backbone.Model.extend();
  var CategoryCollection = Backbone.Collection.extend({
    model: CategoryModel,
    url: "#"
  });

  CategoriesView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render'); 
      this.counter = 0;

    },

    setCollection: function(collection) {
      this.collection = collection;
      console.log("setCollection")
      this.render();
    },

    render: function() {
      $('#jstree').jstree({ 
      'core' : {
      'data' : this.collection.models
      } 
    }); 
    },
    appendItem: function(item){
      var billView = new BillView({
        model: item
      });
      $('ul', this.el).append(billView.render().el); //?????
    }

  })

  var Bill = Backbone.Model.extend({
    defaults: {
      sum: 0
    }
  });


  var BillList = Backbone.Collection.extend({
    model: Bill
  });


  var BillView = Backbone.View.extend({      
    events: {
      'click button.increase': 'increase',
      'click button.delete': 'remove'
    },    

    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'increase', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function(){
      var htmlCode = _.template($('#item-tpl').html(), {
        model: this.model
      });
      console.log(this.model.toJSON())
      $(this.el).html(htmlCode);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
    },

    increase: function(){
      var changed = {
        sum: this.model.get('sum') + 10
      };
      this.model.set(changed);
    },

    remove: function(){
      this.model.destroy();
    }
  });
  

  var BillListView = Backbone.View.extend({

    el: $('#bill-list'),

    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem'); 
      this.counter = 0;

    },

    setCollection: function(collection) {
      this.collection = collection;
      this.listenTo(this.collection, 'add', this.appendItem);
      this.render();
    },

    render: function() {
      var self = this;
      _(this.collection.models).each(function(item) {
        self.appendItem(item);
      }, this);
    },

    addItem: function(name, sum) {
      this.counter++;
      var item = new Item();
      item.set({
        indef: "Bill" + this.counter, 
        name: name,
        sum: sum
      });
      this.collection.add(item);
    },

    appendItem: function(item) {
      var itemView = new ItemView({
        model: item
      });
      $('#bill-list').append(itemView.render().el);
    }
  });

  window.CategoryModel = CategoryModel;
  window.CategoryCollection = CategoryCollection;
  window.CategoriesView = CategoriesView;

  window.Bill = Bill;
  window.BillList = BillList;
  window.BillView = BillView;
  window.BillListView = BillListView;
  window.TransactionModel = TransactionModel;

})();