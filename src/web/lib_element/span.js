export default class SPAN {
    constructor() {
      this.element = document.createElement('span');
    }
  
    appendTo(parentElement) {
      parentElement.appendChild(this.element);
    }
  }