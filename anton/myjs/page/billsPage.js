(function(){
  this.listView = null;

  var Controller = {

    makePage: function(){
      $("#container").append("<div id='bill-list'></div>");
      $("#bill-list").append("<h1>HELLO</h1>");
      var listView = new BillListView();
      $('#bill-list').append(listView.el)
      //$("#container").append("<div id='bill-list-old'></div>");
      this.listView = listView;
      console.log("make page")
      listView.setCollection(collection);

      $("#container-down").append($('#tpl-btn-add').html());
      $("#container-down").append($('#tpl-popwindow-add').html());
      $("#bills-btn-add").click(function() {
        if($("#bills-in-sum").val()) 
          name = $("#bills-in-name").val() || "default"
          listView.addItem(name, +$("#bills-in-sum").val());
      });
    },
    cleanPage: function(){
      this.listView.unbind();
      this.listView.stopListening();
      this.listView.remove();
      $("#container").html("");
    }
  }

  window.BillsPage = Controller;
})();