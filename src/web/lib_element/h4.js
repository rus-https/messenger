export default class H4 {
    constructor() {
      this.element = document.createElement('h3');
    }
  
    appendTo(parentElement) {
      parentElement.appendChild(this.element);
    }
  
    animationShiftText(speed) {
      const text = this.element.innerText;
      this.element.innerText = '';
  
      let index = 0;
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (index < text.length) {
            const char = text.charAt(index);
            if (char === ' ') {
              this.element.innerHTML += '<span>&nbsp;</span>'
            } else if (char === '^') {
              this.element.innerHTML += '<br>'
            } else {
              this.element.innerText += char
            }
            index++
          } else {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      });
    }
  }