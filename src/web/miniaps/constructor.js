import DIV from "../lib_element/div.js"
import H1 from "../lib_element/h1.js"
import P from "../lib_element/p.js"

export default await function constructor(container_chat,storage){
    if (!Array.isArray(storage)) {
        console.error("storage должен быть массивом объектов.");
        return; // Или выбросить ошибку, если это необходимо
      }
    
      for (const item of storage) {
        if (
          typeof item !== 'object' ||
          item === null ||
          !item.hasOwnProperty('name') ||
          !item.hasOwnProperty('message')
        ) {
          console.warn("Пропущен объект или объект содержит некорректные поля:", item);
          continue; // Пропускаем текущую итерацию цикла, переходим к следующему элементу
        }
    
        // Создаем элементы для отображения сообщения
        const messageContainer = new DIV();
        messageContainer.element.style.display = "flex";
        messageContainer.element.style.flexDirection = "column";
        messageContainer.element.style.width = "80%"; // Изменил на процент
        messageContainer.element.style.marginBottom = "10px"; // Добавил отступ между сообщениями
        messageContainer.element.style.padding = "5px"; // Добавил внутренний отступ
    
        const nameH1 = new H1();
        nameH1.element.textContent = item.name; // ИСПРАВЛЕНО: Используем textContent
        nameH1.element.style.color = "white"
        nameH1.element.style.fontSize = "60px";
        nameH1.element.style.fontWeight = "bold";
    
        const messageP = new P();
        messageP.element.innerHTML = item.message; // Используем innerHTML, т.к. message может содержать HTML (например, <br>)
        messageP.element.style.color = "white"
        messageP.element.style.fontSize = "40px";
        messageP.element.style.wordBreak = "break-word";  // Добавляем перенос слов
        messageP.element.style.overflowWrap = "break-word"; // Добавляем перенос слов (современный)
    
        // Добавляем элементы в контейнер сообщения
        nameH1.appendTo(messageContainer.element);
        messageP.appendTo(messageContainer.element);
    
        // Добавляем контейнер сообщения в основной контейнер
        messageContainer.appendTo(container_chat.element);
      }
}