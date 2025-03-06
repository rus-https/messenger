export default class TEXTAREA {
    constructor() {
      this.element = document.createElement('textarea');
    }
  
    appendTo(parentElement) {
      parentElement.appendChild(this.element);
    }
  }