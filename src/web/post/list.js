export default async function list(tag_post) {
    const url = "https://localhost:3003/list"; 
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                 tag: tag_post
             }), 
        });

        if (!response.ok) {
            const message = `Ошибка HTTP: ${response.status} ${response.statusText}`;
            throw new Error(message); 
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return { error: "Ошибка при выполнении запроса к API", details: error.message }; 
    }
}