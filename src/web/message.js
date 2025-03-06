import DIV from "./lib_element/div.js"
import TEXTAREA from "./lib_element/textarea.js"

import escapeHtmlUp from "./escapehtmlup.js"
import add from "./post/add.js"
import list from "./post/list.js"
import massiveList from "./miniaps/massivelist.js"
import constructor from "./miniaps/constructor.js"

export default async function message(name,key,tag) {
const name_post = escapeHtmlUp(name)
const tag_post = escapeHtmlUp(tag)

const container_chat = new DIV()
container_chat.element.style.width = "100%"
container_chat.element.style.height = (window.innerHeight / 100) * 80 + "px"
container_chat.element.style.display = "flex";
container_chat.element.style.flexDirection = "column";
container_chat.element.style.justifyContent = "flex-start";
container_chat.element.style.alignItems = "center";
container_chat.element.style.padding = "10px";
container_chat.element.style.boxSizing = "border-box";
container_chat.element.style.overflowY = "auto";
container_chat.appendTo(document.body);

const container_message = new DIV();
container_message.element.style.display = "flex";
container_message.element.style.flexDirection = "column"; 
container_message.element.style.justifyContent = "center";
container_message.element.style.alignItems = "center";
container_message.element.style.width = "100%";
container_message.element.style.height = (window.innerHeight / 100) * 20 + "px"; 
container_message.element.style.padding = "10px"; 
container_message.appendTo(document.body);

const message = new TEXTAREA();
message.element.style.width = "90%"; 
message.element.style.height = "70%"; 
message.element.style.backgroundColor = "black";
message.element.style.color = "white";
message.element.style.boxShadow = "0px 0px 7px 2px red";
message.element.style.borderRadius = "10px";
message.element.style.fontSize = "16px"; 
message.element.style.padding = "10px"; 
message.element.style.resize = "none"; 
message.appendTo(container_message.element);

const button = new DIV();
button.element.style.width = "50%"; 
button.element.style.height = "30%"; 
button.element.style.borderRadius = "10px";
button.element.style.boxShadow = "0px 0px 7px 2px red";
button.element.style.display = "flex";
button.element.style.alignItems = "center";
button.element.style.justifyContent = "center";
button.element.style.cursor = "pointer";
button.element.style.fontSize = "20px"; 
button.element.style.color = "white";
button.element.innerText = "Отправить";
button.animationShadow('mouseover', '0px 5px 100px 10px red');
button.animationShadow('mouseleave', '0px 0px 7px 2px red');
button.appendTo(container_message.element);

let storage  = []
let storage_end = []
let intervalId; // Переменная для хранения ID интервала

storage =  await list(tag_post) 
storage = await massiveList(storage, key);
container_chat.element.innerHTML = "";
await constructor(container_chat, storage);
container_chat.element.scrollTop = container_chat.element.scrollHeight;

async function chat() {
    try {
     storage_end =  await list(tag_post) 

    if(storage_end.length !== storage.length){
        storage = storage_end
        storage = await massiveList(storage, key);
        container_chat.element.innerHTML = "";
        await constructor(container_chat, storage);
        container_chat.element.scrollTop = container_chat.element.scrollHeight;
    }
  } catch (error) {
    console.error("Ошибка в функции chat:", error);
  } 
}

// Функция для запуска интервала
function startChatInterval(params) {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      chat();
    }, 1000);
  }
  startChatInterval("your_tag_post_value");
  

button.element.addEventListener("click", async()=>{
    button.element.style.boxShadow = "0px 5px 100px 10px red"; 
    await new Promise(resolve => setTimeout(resolve, 100));
    button.element.style.boxShadow = "0px 0px 7px 2px red"
    let textToSave = escapeHtmlUp(message.element.value);
    textToSave = CryptoJS.AES.encrypt(textToSave, key).toString();
    message.element.value = ""
    await add(tag_post,name_post,textToSave)
})
}
