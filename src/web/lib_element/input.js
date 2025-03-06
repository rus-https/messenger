export default class INPUT{
    constructor(){
       this.element = document.createElement('input')
    }
    appendTo(parentElement) {
        parentElement.appendChild(this.element);
      }
    animationShadow(mouse,boxShadow){
        this.element.addEventListener(mouse,() => {
         this.element.style.boxShadow  = boxShadow
        });
      }
}