function Menu1(options) {
  var self = this;
  var visible = true;
  var elem = options.elem;

  // отмена выделения при клике на меню
  elem.on('mousedown selectstart', false);
  elem.on('click', '.menu-title', onTitleClick);

  // ---------- методы ----------

  function onTitleClick() {  
    if (visible) {
      self.close();
    } else {
      self.open();
    }
  }

  this.open = function() {
    $('#items')[0].style.display = "block"
    visible = !visible
  };

  this.close = function() {
    $('#items')[0].style.display = "none"
    visible = !visible
  };

}