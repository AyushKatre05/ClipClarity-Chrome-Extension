
chrome.runtime.onInstalled.addListener(() => {
    console.log("ClipClarity is set for work");
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request);
    const selectedHTML = request.selectedHTML;
    const UserPrompt = request.userPrompt;
    if (request.action === "ChatGpt Call") {
        return new Promise(async (resolve, reject) => {
           const actualUserPrompt = `You are a helpful assistant. Here is the HTML content I want to process:\n${selectedHTML}\nPlease ${UserPrompt} while preserving the structure of the HTML.`;
           try {
              const gptResponse = await callOpenAI(actualUserPrompt); // Async API call
              console.log("Response from OpenAI:", gptResponse);
              resolve({ simplifiedText: gptResponse });
            } catch (error) {
              console.error("Error while calling OpenAI:", error);
              reject({ error: "Failed to communicate with GPT" });
            }
        }).then(sendResponse).catch(sendResponse);
    }
    return true; // Keeps the message port open for async response
});

async function callOpenAI(prompt) {
    const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch the API");
    }

    const data = await response.json();
    return data; // Ensure the data is returned
}
