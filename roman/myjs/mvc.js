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
      _.bindAll(this, 'render', 'unrender', 'increase', 'remove'); // every function that uses 'this' as the current object should be in here

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
      console.log(this.el);
      $(this.el).remove();
    },

    increase: function(){
      var swapped = {
        sum: this.model.get('sum') + 10
      };
      this.model.set(swapped);
    },

    remove: function(){
      Bills.removeBill(this.model.get("indef"));
      this.model.destroy();
    }
  });
  

  var ListView = Backbone.View.extend({
    el: $('#container'),
//    events: {
//      'click #addNewBill': 'addItem'
//    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem', 'addItemOffline'); 
      this.counter = 0;
    },
    setCollection: function(collection){
      this.collection = collection;
      this.collection.bind('add', this.appendItem); // collection event binder
      this.render();
    },
    render: function(){
      var self = this;
      $(this.el).append("<div id='billList'></div>");

//      $(this.el).append($('#button-add').html());
      _(this.collection.models).each(function(item){ // in case collection is not empty
        self.appendItem(item);
      }, this);
    },
    addItem: function(name, sum){
      this.counter++;
      var item = new Item();
      item.set({
        indef: "Bill" + this.counter, 
        name: name,
        sum: sum
      });
      this.collection.add(item);
    },
    addItemOffline: function(newItem){
      var item = new Item();
      item.set(newItem);
      this.collection.add(item);
    },
    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      Bills.addBill(item.get("indef"), item.get("name"), item.get("sum"));
      $('#billList').append(itemView.render().el);
    }
  });

  window.Item = Item;
  window.List = List;
  window.ItemView = ItemView;
  window.ListView = ListView;


})();