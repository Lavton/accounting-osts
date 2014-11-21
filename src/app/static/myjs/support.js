
window.indefToName = function(indef, cls) {
  if(cls == "bill")
    return collection.find(function(model){return model.get('indef') == indef;}).get("name");
};