(function(){

  var Item = Backbone.Model.extend({
    defaults: {
      sum: 0
    }
  });


  var List = Backbone.Collection.extend({
    model: Item
  });


  var ItemView = Backbone.View.extend({      
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
  

  var ListView = Backbone.View.extend({

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

  window.Item = Item;
  window.List = List;
  window.ItemView = ItemView;
  window.ListView = ListView;


})();