export default function escapeHtmlUp(unsafe) {
    return unsafe.replace(/&/g, 'amp;')
        .replace(/</g, 'lt;')
        .replace(/>/g, 'gt;')
        .replace(/"/g, 'quot;')
        .replace(/`/g, '#049;')
        .replace(/\n/g, "#567")
        .replace(/'/g, '#039;');
}