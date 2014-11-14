(function(){

  var Item = Backbone.Model.extend({
    defaults: {
      delta: 0
    }
  });


  var List = Backbone.Collection.extend({
    model: Item
  });


  var TransactionView = Backbone.View.extend({      
    events: {
      'click .rclickable': 'budget'
    },    

    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'budget', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function(){
      var htmlCode = _.template($('#tpl-transaction').html(), {
        model: this.model
      });
      $(this.el).html(htmlCode);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
    },

    budget: function(){
    },

    remove: function(){
      this.model.destroy();
    }
  });
  

  var ListView = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem');
    },

    setCollection: function(collection, view, elem, func){
      this.setElement(elem);
      this.elem = elem;
      this.view = view;
      this.func = func
      this.collection = collection;
      this.listenTo(this.collection, 'add', this.appendItem);
      this.render();
    },

    render: function() {
      var self = this;
      _(this.collection.models).each(function(item){
        self.appendItem(item);
      }, this);
    },

    addItem: function(start, end, delta, comment) {
      var item = new Item();
      item.set({
        indef: (new Date()).getTime(), 
        name: name,
        delta: delta,
        start: start,
        end: end
      });
      this.collection.add(item);
    },

    appendItem: function(item) {
      var view = new this.view({
        model: item
      });
      view.func = this.func;
      this.elem.append(view.render().el);
    }
  });

  window.TransactionItem = Item;
  window.TransactionList = List;
  window.TransactionView = TransactionView;
  window.TransactionListView = ListView;
})();