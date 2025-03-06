export default class IMG {
    constructor() {
      this.element = document.createElement('img');
    }
  
    appendTo(parentElement) {
      parentElement.appendChild(this.element);
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
    AnimationRotate(mouse,side){
        this.element.addEventListener(mouse,()=>{
          if ( side === "right"){
          this.element.style.transition = 'transform 1s'
          this.element.style.transform = 'rotate(360deg)'
          }
          else{
            this.element.style.transition = 'transform 1s'
            this.element.style.transform = 'rotate(0deg)'
          }
        })
  }
  link(mouse,link){
    this.element.addEventListener(mouse,()=> {
      window.location.href = link;
      });
  }
}