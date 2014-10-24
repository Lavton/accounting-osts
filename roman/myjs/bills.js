(function(){

  var data = {
    var2: {
      indef: "var2",
      name: "bill_1",
      sum: 187
    },
    var3: {
      indef: "var3",
      name: "bill_2",
      sum: 1543
    },
    var5: {
      indef: "var5",
      name: "bill_3",
      sum: 142300
    },
    var7: {
      indef: "var7",
      name: "bill_4",
      sum: 999
    }
  };

  var Controller = {
    init: function(){},

    makeCollection: function(){
      var collection = new List();
      _(data).each(function(item){
        var it = new Item();
        it.set(item);
        collection.add(it);
      })
      window.collection = collection;
    },

    clearCollection: function(){

    },

    addBill: function(indef, name, sum){
      data[indef] = {
        indef: indef,
        name: name,
        sum: sum
      }
    },

    changeBill: function(indef){

    },

    removeBill: function(indef){
      delete data[indef]
    },

    print: function(){
      console.log(data)
    }
  }
  window.Bills = Controller;

  $(Bills.makeCollection);

})();