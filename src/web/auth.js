import DIV from "./lib_element/div.js"
import INPUT from "./lib_element/input.js"

import message from "./message.js"

export async function auth(){

document.body.style.backgroundColor = "black";
document.documentElement.style.msOverflowStyle = "none";
document.documentElement.style.scrollbarWidth = "none";
document.body.style.backgroundPosition = "center center";
document.body.style.backgroundColor = "black";
document.body.style.margin = "0";

  const container = new DIV() 
  container.element.style.display = "flex";
  container.element.style.flexDirection = "column"; 
  container.element.style.justifyContent = "center"; 
  container.element.style.alignItems = "center"; 
  container.element.style.width = "100%"
  container.element.style.height = window.innerHeight + "px"
  container.appendTo(document.body)

  const name = new INPUT()
  name.element.placeholder = "Имя пользователя"
  name.element.style.width = "90%"
  name.element.style.height = "5%"
  name.element.style.borderRadius = "3%"
  name.element.style.background = "black"
  name.element.style.color = "white"
  name.element.style.fontSize = "50px";
  name.element.style.boxShadow = "0px 0px 7px 2px red"
  name.animationShadow('mouseover','0px 5px 100px 10px red')
  name.animationShadow('mouseleave','0px 0px 7px 2px red')
  name.appendTo(container.element)

  const pass = new INPUT()
  pass.element.placeholder = "Закрытый ключ"
  pass.element.type = "password"
  pass.element.style.width = "90%"
  pass.element.style.height = "5%"
  pass.element.style.borderRadius = "3%"
  pass.element.style.background = "black"
  pass.element.style.color = "white"
  pass.element.style.marginTop = "4%"
  pass.element.style.fontSize = "50px";
  pass.element.style.boxShadow = "0px 0px 7px 2px red"
  pass.animationShadow('mouseover','0px 5px 100px 10px red')
  pass.animationShadow('mouseleave','0px 0px 7px 2px red')
  pass.appendTo(container.element)

  const input = new DIV()
  input.element.style.width = "50%"
  input.element.style.height = "5%"
  input.element.style.boxShadow = "0px 0px 7px 2px red";
  input.element.style.display = "flex";
  input.element.style.alignItems = "center";
  input.element.style.justifyContent = "center";
  input.element.style.cursor = "pointer";
  input.element.style.fontSize = "24px";
  input.element.style.color = "white";
  input.element.innerText = "Авторизация";
  input.element.style.marginTop = "4%"
  input.animationShadow('mouseover','0px 5px 100px 10px red')
  input.animationShadow('mouseleave','0px 0px 7px 2px red')
  input.appendTo(container.element)

  input.element.addEventListener("click", async() =>{ 
    input.element.style.boxShadow = "0px 5px 100px 10px red"; 
    await new Promise(resolve => setTimeout(resolve, 100));
    input.element.style.boxShadow = "0px 0px 7px 2px red"
    container.element.style.width = "0px"
    container.element.style.height = "0px"
    container.element.style.opacity = "0"
    container.element.innerHTML = ""
    const urlParts = window.location.pathname.split('/');
    let tag = urlParts[urlParts.length - 1];

if (!tag) {
  tag = urlParts[urlParts.length - 2];
}

    await message(name.element.value,pass.element.value,tag)
  })
}

