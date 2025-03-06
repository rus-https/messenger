export default function escapeHtmlOven(unsafe) {
    return unsafe.replace(/&/g, 'amp;')
        .replace(/</g, 'lt;')
        .replace(/>/g, 'gt;')
        .replace(/"/g, 'quot;')
        .replace(/`/g, '#049;')
        .replace(/#567/g, "<br>")
        .replace(/'/g, '#039;');
}