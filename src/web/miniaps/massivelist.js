import decrypt from "./decrypt.js";

export default async function massiveList(storage, key) {
  // Проверяем, что storage - это массив
  if (!Array.isArray(storage)) {
    console.error("storage должен быть массивом объектов.");
    return []; // Или выбросить ошибку, если это необходимо
  }

  const decryptedStorage = [];

  for (const item of storage) {
    // Проверяем, что item - это объект и содержит необходимые поля
    if (
      typeof item !== 'object' ||
      item === null ||
      !item.hasOwnProperty('tag') ||
      !item.hasOwnProperty('name') ||
      !item.hasOwnProperty('message')
    ) {
      console.warn("Пропущен объект или объект содержит некорректные поля:", item);
      decryptedStorage.push({...item});
      continue; // Пропускаем текущую итерацию цикла, переходим к следующему элементу
    }

    let decryptedMessage;
    try {
      decryptedMessage = await decrypt(item.message, key);
    } catch (error) {
      console.error("Ошибка расшифровки сообщения:", error, "Сообщение:", item.message);
      decryptedMessage = "Ошибка расшифровки"; // Или какое-то значение по умолчанию
    }

    const decryptedItem = {
      tag: item.tag,
      name: item.name,
      message: decryptedMessage,
    };

    decryptedStorage.push(decryptedItem);
  }

  return decryptedStorage;
}