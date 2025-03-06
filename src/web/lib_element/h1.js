export default class H1 {
    constructor() {
      this.element = document.createElement('h1');
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
    
    animationAdvent(speed){
      this.element.style.opacity = 0
      let opacity = 0;
      const fadeIn = () =>{
         opacity += 0.01
         this.element.style.opacity = opacity
         if (opacity < 1){
           requestAnimationFrame(fadeIn)
         }
        }
        setTimeout(fadeIn,speed)
      }
  }