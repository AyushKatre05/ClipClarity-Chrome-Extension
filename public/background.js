chrome.runtime.onInstalled.addListener(() => {
    console.log("ClipClarity installed");
});

// Handle the Gemini API call
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "callGeminiAPI") {
        const selectedText = request.text;
        
        // Make a request to the Gemini API (pseudo-code, replace with real implementation)
        fetch('https://gemini-api.com/explain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: selectedText })
        })
        .then(response => response.json())
        .then(data => {
            sendResponse({ result: data.explanation });
        })
        .catch(err => {
            console.error("API call failed", err);
            sendResponse({ result: "Error fetching explanation" });
        });

        return true;  // Keep the message channel open for async response
    }
});