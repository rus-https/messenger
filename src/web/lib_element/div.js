export default class DIV {
    constructor() {
      this.element = document.createElement('div');
    }
  
    appendTo(parentElement) {
      parentElement.appendChild(this.element);
    }

    animationShadow(mouse,boxShadow){
      this.element.addEventListener(mouse,() => {
       this.element.style.boxShadow  = boxShadow
      });
    }
    autoScroll(speed) {
      const element = this.element;
      let scrollHeight = element.scrollHeight;
      let clientHeight = element.clientHeight;
  
      if (scrollHeight <= clientHeight) {
        return; // Не прокручивать, если контента недостаточно
      }
  
      let currentScrollTop = element.scrollTop; // Начинаем с текущей позиции
      const maxScrollTop = scrollHeight - clientHeight; // Максимальная позиция прокрутки
  
      function scrollStep() {
        if (currentScrollTop < maxScrollTop) {
          currentScrollTop += 1; // Шаг прокрутки
          element.scrollTop = currentScrollTop;
  
          if (currentScrollTop < maxScrollTop) {
            setTimeout(scrollStep, speed); // Продолжаем прокрутку
          } else {
            // Достигли конца
            console.log("Достигнут конец прокрутки");
          }
        }
      }
  
      scrollStep(); // Запускаем прокрутку
    }
  }