export default class H3 {
    constructor(id, innerText, color, textAlign) {
      this.element = document.createElement('h3');
      this.element.id = id
      this.element.innerText = innerText;
      this.element.style.color = color
      this.element.style.textAlign = textAlign
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