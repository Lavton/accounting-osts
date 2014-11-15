(function(){
  var HomeView = Backbone.View.extend({
    initialize: function(){
      _.bindAll("render");
      this.render();
    },

    render: function() {
      delete this.options.el;
      $(this.el).append('<div id="gain_button">\
    <input type="text" placeholder="add gain" class="gain_amount" id="pre_num_gain"/>\
    <button class="btn btn-info add btn-primary btn-lg" data-toggle="modal" data-target="#gainModel">>Add</button>\
  </div>');
    }
  })

  window.HomeView = HomeView;
})();