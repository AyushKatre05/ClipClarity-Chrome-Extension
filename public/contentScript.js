// Capture the user's selected text on the webpage
function getSelectedText() {
    const selection = window.getSelection();
    console.log(selection)
    return selection ? selection.toString() : '';
}

// Replace the selected text in the DOM with the API's response
function replaceSelectedText(newText) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(newText);
    range.insertNode(textNode);
}

// Listen for messages from popup or background scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getSelectedText") {
        const selectedText = getSelectedText();
        sendResponse({ text: selectedText });
    }
    if (message.action === "replaceSelectedText") {
        replaceSelectedText(message.newText);
    }
});