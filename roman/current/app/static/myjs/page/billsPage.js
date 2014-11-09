(function(){
  this.listView = null;

  var Controller = {

    makePage: function(){
      var listView = new ListView();
      $("#container").append("<div id='bill-list'></div>");
      this.listView = listView;
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
      $(".content").html("");
    }
  }

  window.BillsPage = Controller;
})();