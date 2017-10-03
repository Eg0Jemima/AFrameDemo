//Function to remove elements from the scene within a component
function removeElement(element){
    element.sceneEl.removeChild(element);
}

//Function to set multiple attributes at the same time
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
