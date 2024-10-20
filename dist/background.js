/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./public/background.js ***!
  \******************************/

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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9IQUFvSCxhQUFhLFdBQVcsWUFBWTtBQUN4SjtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBLCtCQUErQiw0QkFBNEI7QUFDM0Q7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxnQ0FBZ0Msa0RBQWtEO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixrQ0FBa0MsUUFBUTtBQUMxQyxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhCQUE4QjtBQUMvQztBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlIQUFpSCxhQUFhLFdBQVcsWUFBWTtBQUNySixvTUFBb00sYUFBYSxRQUFRLFdBQVc7QUFDcE87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw2QkFBNkI7QUFDNUQsYUFBYTtBQUNiO0FBQ0E7QUFDQSwrQkFBK0Isa0RBQWtEO0FBQ2pGLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUMsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULCtCQUErQixRQUFRO0FBQ3ZDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG1DQUFtQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUJBQWlCO0FBQ2pELGlCQUFpQjtBQUNqQixnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsc0JBQXNCO0FBQ2xFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpcGNsYXJpdHktY2hyb21lLWV4dGVuc2lvbi8uL3B1YmxpYy9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBjaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZyhcIkNsaXBDbGFyaXR5IGlzIHNldCBmb3Igd29ya1wiKTtcclxuLy8gfSk7XHJcblxyXG4vLyBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcclxuLy8gICAgIGNvbnN0IHNlbGVjdGVkSFRNTCA9IHJlcXVlc3Quc2VsZWN0ZWRIVE1MO1xyXG4vLyAgICAgY29uc3QgVXNlclByb21wdCA9IHJlcXVlc3QudXNlclByb21wdDtcclxuLy8gICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gXCJDaGF0R3B0IENhbGxcIikge1xyXG4vLyAgICAgICAgICAgIGNvbnN0IGFjdHVhbFVzZXJQcm9tcHQgPSBgWW91IGFyZSBhIGhlbHBmdWwgYXNzaXN0YW50LiBIZXJlIGlzIHRoZSBIVE1MIGNvbnRlbnQgSSB3YW50IHRvIHByb2Nlc3M6XFxuJHtzZWxlY3RlZEhUTUx9XFxuUGxlYXNlICR7VXNlclByb21wdH0gd2hpbGUgcHJlc2VydmluZyB0aGUgc3RydWN0dXJlIG9mIHRoZSBIVE1MLmA7XHJcbi8vICAgICAgICAgICAgdHJ5IHtcclxuLy8gICAgICAgICAgICAgICBjb25zdCBncHRSZXNwb25zZSA9IGF3YWl0IGNhbGxPcGVuQUkoYWN0dWFsVXNlclByb21wdCk7IC8vIEFzeW5jIEFQSSBjYWxsXHJcbi8vICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBmcm9tIE9wZW5BSTpcIiwgZ3B0UmVzcG9uc2UpO1xyXG4vLyAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7c2ltcGxpZmllZFRleHQ6IGdwdFJlc3BvbnNlfSlcclxuLy8gICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuLy8gICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igd2hpbGUgY2FsbGluZyBPcGVuQUk6XCIsIGVycm9yKTtcclxuLy8gICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzaW1wbGlmaWVkVGV4dDogXCJGYWlsZWQgdG8gY29tbXVuaWNhdGUgd2l0aCBHUFRcIiB9KTtcclxuLy8gICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyAgICAgcmV0dXJuIHRydWU7XHJcbi8vIH0pXHJcblxyXG4vLyBhc3luYyBmdW5jdGlvbiBjYWxsT3BlbkFJKHByb21wdCkge1xyXG4vLyAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkvY2hhdFwiLCB7XHJcbi8vICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuLy8gICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBwcm9tcHQgfSksXHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbi8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHRoZSBBUElcIik7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuLy8gICAgIHJldHVybiBkYXRhOyAvLyBFbnN1cmUgdGhlIGRhdGEgaXMgcmV0dXJuZWRcclxuLy8gfVxyXG5cclxuXHJcblxyXG4vLyBiYWNrZ3JvdW5kLmpzXHJcblxyXG4vLyBiYWNrZ3JvdW5kLmpzXHJcbmNocm9tZS5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKCh0YWIpPT57XHJcbiAgICBjb25zb2xlLmxvZyh0YWIuaWQpXHJcbiAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xyXG4gICAgICAgIHRhcmdldDoge3RhYklkOiB0YWIuaWQsIGFsbEZyYW1lczp0cnVlfSxcclxuICAgICAgICBmaWxlczogW1wiZGlzdC9jb250ZW50U2NyaXB0LmpzXCJdXHJcbiAgICB9KVxyXG59KVxyXG5jb25zb2xlLmxvZyhcIkJhY2tncm91bmQgc2NyaXB0IGxvYWRlZFwiKTtcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2xpcENsYXJpdHkgaXMgc2V0IGZvciB3b3JrXCIpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIG1lc3NhZ2U6XCIsIHJlcXVlc3QpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIVE1MID0gcmVxdWVzdC5zZWxlY3RlZEhUTUw7XHJcbiAgICBjb25zdCBVc2VyUHJvbXB0ID0gcmVxdWVzdC51c2VyUHJvbXB0O1xyXG5cclxuICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gXCJDaGF0R3B0IENhbGxcIikge1xyXG4gICAgICAgIC8vIGNvbnN0IGFjdHVhbFVzZXJQcm9tcHQgPSBgWW91IGFyZSBhIGhlbHBmdWwgYXNzaXN0YW50LiBIZXJlIGlzIHRoZSBIVE1MIGNvbnRlbnQgSSB3YW50IHRvIHByb2Nlc3M6XFxuJHtzZWxlY3RlZEhUTUx9XFxuUGxlYXNlICR7VXNlclByb21wdH0gd2hpbGUgcHJlc2VydmluZyB0aGUgc3RydWN0dXJlIG9mIHRoZSBIVE1MLmA7XHJcbiAgICAgICAgY29uc3QgYWN0dWFsVXNlclByb21wdD0gYE91dHB1dCBvbmx5IHRoZSB0cmFuc2Zvcm1lZCBIVE1MIGNvbnRlbnQgd2l0aG91dCBhbnkgZXh0cmEgY29tbWVudHMsIGV4cGxhbmF0aW9ucywgb3Igbm90ZXMuIERvIG5vdCBpbmNsdWRlIHBocmFzZXMgbGlrZSBcIkhlcmUgaXNcIiBvciBcIlBsZWFzZSBub3RlLlwiSFRNTCBDb250ZW50OiR7c2VsZWN0ZWRIVE1MfVRhc2s6ICR7VXNlclByb21wdH1gXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25zdHJ1Y3RlZCBQcm9tcHQ6XCIsIGFjdHVhbFVzZXJQcm9tcHQpO1xyXG5cclxuICAgICAgICBjYWxsT3BlbkFJKGFjdHVhbFVzZXJQcm9tcHQpXHJcbiAgICAgICAgICAgIC50aGVuKChncHRSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHUFQgUmVzcG9uc2U6XCIsIGdwdFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHNpbXBsaWZpZWRUZXh0OiBncHRSZXNwb25zZSB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHdoaWxlIGNhbGxpbmcgT3BlbkFJOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzaW1wbGlmaWVkVGV4dDogXCJGYWlsZWQgdG8gY29tbXVuaWNhdGUgd2l0aCBHUFRcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0cnVlIHRvIGluZGljYXRlIHRoYXQgdGhlIHJlc3BvbnNlIGlzIHNlbnQgYXN5bmNocm9ub3VzbHlcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIlVua25vd24gYWN0aW9uOlwiLCByZXF1ZXN0LmFjdGlvbik7XHJcbiAgICAvLyBPcHRpb25hbGx5LCBzZW5kIGEgZGVmYXVsdCByZXNwb25zZVxyXG4gICAgc2VuZFJlc3BvbnNlKHsgZXJyb3I6IFwiVW5rbm93biBhY3Rpb25cIiB9KTtcclxufSk7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjYWxsT3BlbkFJKHByb21wdCkge1xyXG4gICAgY29uc29sZS5sb2coXCJDYWxsaW5nIE9wZW5BSSB3aXRoIHByb21wdDpcIiwgcHJvbXB0KTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXBpL2NoYXRcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcHJvbXB0IH0pLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJSZWNlaXZlZCByZXNwb25zZSBmcm9tIHNlcnZlcjpcIiwgcmVzcG9uc2Uuc3RhdHVzKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHRoZSBBUElcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIGNvbnNvbGUubG9nKFwiRGF0YSBmcm9tIHNlcnZlcjpcIiwgZGF0YSk7XHJcbiAgICByZXR1cm4gZGF0YTsgLy8gRXhwZWN0aW5nIGFuIGFycmF5XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gbGV0IGFjdGl2ZVRhYklkID0gbnVsbDtcclxuXHJcbi8vIGNocm9tZS5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKCh0YWIpID0+IHtcclxuLy8gICAgIGFjdGl2ZVRhYklkID0gdGFiLmlkOyAvLyBTdG9yZSB0aGUgY3VycmVudCBhY3RpdmUgdGFiIElEXHJcbi8vICAgICBjb25zb2xlLmxvZyhhY3RpdmVUYWJJZClcclxuLy8gICAgIGNvbnNvbGUubG9nKHRhYi51cmwpXHJcbi8vICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xyXG4vLyAgICAgICAgIHRhcmdldDogeyB0YWJJZDogdGFiLmlkIH0sXHJcbi8vICAgICAgICAgZmlsZXM6IFsnLi9jb250ZW50U2NyaXB0LmpzJ11cclxuLy8gICAgIH0sKG1zZyk9PntcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNjcmlwdCBJbmplY3RlZFwiKVxyXG4vLyAgICAgfSk7XHJcbiAgICBcclxuLy8gfSk7XHJcblxyXG5cclxuXHJcblxyXG4vLyBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbi8vICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnaW5qZWN0Q29udGVudFNjcmlwdCcpIHtcclxuLy8gICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XHJcbi8vICAgICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRhYnNbMF07XHJcblxyXG4vLyAgICAgICBpZiAoYWN0aXZlVGFiKSB7XHJcbi8vICAgICAgICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KFxyXG4vLyAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICB0YXJnZXQ6IHsgdGFiSWQ6IGFjdGl2ZVRhYi5pZCB9LFxyXG4vLyAgICAgICAgICAgICBmaWxlczogWycuL3B1YmxpYy9jb250ZW50U2NyaXB0LmpzJ10sXHJcbi8vICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgKCkgPT4ge1xyXG4vLyAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbi8vICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSW5qZWN0aW9uIGZhaWxlZDonLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG4vLyAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXR1czogJ2Vycm9yJyB9KTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6ICdzdWNjZXNzJyB9KTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIHJldHVybiB0cnVlOyAvLyBLZWVwcyB0aGUgbWVzc2FnaW5nIGNoYW5uZWwgb3BlbiBmb3IgYXN5bmMgcmVzcG9uc2VcclxuLy8gICB9XHJcbi8vIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIExpc3RlbiBmb3IgdGFiIHVwZGF0ZXMgdG8gZGVhY3RpdmF0ZSBDbGlwQ2xhcml0eSB3aGVuIG5hdmlnYXRpbmcgYXdheVxyXG4vLyBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpID0+IHtcclxuLy8gICAgIGNvbnNvbGUubG9nKGNoYW5nZUluZm8uc3RhdHVzKVxyXG4vLyAgICAgY29uc29sZS5sb2codGFiSWQpXHJcbi8vICAgICBpZiAodGFiSWQgPT09IGFjdGl2ZVRhYklkICYmIGNoYW5nZUluZm8uc3RhdHVzID09PSAnY29tcGxldGUnICYmIHRhYi51cmwpIHtcclxuLy8gICAgICAgICAvLyBPcHRpb25hbGx5LCB5b3UgY2FuIGFsc28gc2VuZCBhIG1lc3NhZ2UgdG8gY29udGVudC5qcyB0byBkZWFjdGl2YXRlXHJcbi8vICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIHsgYWN0aW9uOiBcImRlYWN0aXZhdGVcIiB9KTtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgLy8gQ2xlYXIgdGhlIGFjdGl2ZSB0YWIgSUQgd2hlbiBsZWF2aW5nIHRoZSB0YWJcclxuLy8gICAgICAgICBpZiAoYWN0aXZlVGFiSWQgPT09IHRhYklkKSB7XHJcbi8vICAgICAgICAgICAgIGFjdGl2ZVRhYklkID0gbnVsbDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9