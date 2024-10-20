
// chrome.runtime.onInstalled.addListener(() => {
//     console.log("ClipClarity is set for work");
// });

// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     console.log(request);
//     const selectedHTML = request.selectedHTML;
//     const UserPrompt = request.userPrompt;
//     if (request.action === "ChatGpt Call") {
//            const actualUserPrompt = `You are a helpful assistant. Here is the HTML content I want to process:\n${selectedHTML}\nPlease ${UserPrompt} while preserving the structure of the HTML.`;
//            try {
//               const gptResponse = await callOpenAI(actualUserPrompt); // Async API call
//               console.log("Response from OpenAI:", gptResponse);
//               sendResponse({simplifiedText: gptResponse})
//               return true;
//             } catch (error) {
//               console.error("Error while calling OpenAI:", error);
//               sendResponse({ simplifiedText: "Failed to communicate with GPT" });
//               return true;
//             }
//     }
//     return true;
// })

// async function callOpenAI(prompt) {
//     const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt }),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to fetch the API");
//     }

//     const data = await response.json();
//     return data; // Ensure the data is returned
// }



// background.js

// background.js
chrome.action.onClicked.addListener((tab)=>{
    console.log(tab.id)
    chrome.scripting.executeScript({
        target: {tabId: tab.id, allFrames:true},
        files: ["dist/contentScript.js"]
    })
})
console.log("Background script loaded");

chrome.runtime.onInstalled.addListener(() => {
    console.log("ClipClarity is set for work");
});





chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message:", request);
    const selectedHTML = request.selectedHTML;
    const UserPrompt = request.userPrompt;

    if (request.action === "ChatGpt Call") {
        // const actualUserPrompt = `You are a helpful assistant. Here is the HTML content I want to process:\n${selectedHTML}\nPlease ${UserPrompt} while preserving the structure of the HTML.`;
        const actualUserPrompt= `Output only the transformed HTML content without any extra comments, explanations, or notes. Do not include phrases like "Here is" or "Please note."HTML Content:${selectedHTML}Task: ${UserPrompt}`
        console.log("Constructed Prompt:", actualUserPrompt);

        callOpenAI(actualUserPrompt)
            .then((gptResponse) => {
                console.log("GPT Response:", gptResponse);
                sendResponse({ simplifiedText: gptResponse });
            })
            .catch((error) => {
                console.error("Error while calling OpenAI:", error);
                sendResponse({ simplifiedText: "Failed to communicate with GPT" });
            });

        // Return true to indicate that the response is sent asynchronously
        return true;
    }

    console.log("Unknown action:", request.action);
    // Optionally, send a default response
    sendResponse({ error: "Unknown action" });
});

async function callOpenAI(prompt) {
    console.log("Calling OpenAI with prompt:", prompt);
    const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    console.log("Received response from server:", response.status);

    if (!response.ok) {
        throw new Error("Failed to fetch the API");
    }

    const data = await response.json();
    console.log("Data from server:", data);
    return data; // Expecting an array
}









// let activeTabId = null;

// chrome.action.onClicked.addListener((tab) => {
//     activeTabId = tab.id; // Store the current active tab ID
//     console.log(activeTabId)
//     console.log(tab.url)
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ['./contentScript.js']
//     },(msg)=>{
//         console.log("Script Injected")
//     });
    
// });




// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'injectContentScript') {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab = tabs[0];

//       if (activeTab) {
//         chrome.scripting.executeScript(
//           {
//             target: { tabId: activeTab.id },
//             files: ['./public/contentScript.js'],
//           },
//           () => {
//             if (chrome.runtime.lastError) {
//               console.error('Injection failed:', chrome.runtime.lastError);
//               sendResponse({ status: 'error' });
//             } else {
//               sendResponse({ status: 'success' });
//             }
//           }
//         );
//       }
//     });

//     return true; // Keeps the messaging channel open for async response
//   }
// });





// Listen for tab updates to deactivate ClipClarity when navigating away
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log(changeInfo.status)
//     console.log(tabId)
//     if (tabId === activeTabId && changeInfo.status === 'complete' && tab.url) {
//         // Optionally, you can also send a message to content.js to deactivate
//         chrome.tabs.sendMessage(tabId, { action: "deactivate" });
//     } else {
//         // Clear the active tab ID when leaving the tab
//         if (activeTabId === tabId) {
//             activeTabId = null;
//         }
//     }
// });

