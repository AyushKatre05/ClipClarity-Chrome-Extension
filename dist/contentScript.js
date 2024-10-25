/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./public/contentScript.js ***!
  \*********************************/



const inputElement = document.createElement("input");
inputElement.placeholder = "Enter the desired prompt for desired output";

inputElement.style.backgroundColor = "transparent"; 
inputElement.style.color = "inherit"; 
inputElement.style.width = "100%"; 
inputElement.style.border = "1px solid #ccc"; 
inputElement.style.borderRadius = "8px"; 
inputElement.style.padding = "12px"; 
inputElement.style.boxSizing = "border-box"; 
inputElement.style.fontSize = "inherit"; 
inputElement.style.fontFamily = "inherit"; 
inputElement.style.outline = "none"; 
inputElement.style.transition = "border-color 0.3s ease, box-shadow 0.3s ease"; 


inputElement.addEventListener("focus", () => {
  inputElement.style.borderColor = "#007BFF"; 
  inputElement.style.boxShadow = "0 0 4px rgba(0, 123, 255, 0.5)"; 
});


inputElement.addEventListener("blur", () => {
  inputElement.style.borderColor = "#ccc"; 
  inputElement.style.boxShadow = "none"; 
});
let userPromptValue = "";


// inputElement.addEventListener("change", (event) => {
//     userPromptValue = event.target.value;
//     console.log("Inside: " + userPromptValue);
//     InitialSetup(event);
// });


const InitialSetup = (event) => {
    event.target.value = ""; 
    inputElement.remove(); 
};


const getUserPrompt = () => {
    return userPromptValue;
};
// document.addEventListener("mouseup", function (event) {
//     const selection = window.getSelection();
//     let parentElement = window.getSelection().anchorNode.parentElement;
//     if (selection.rangeCount > 0 && selection.toString()) {
//         let selectedHTML = "";
//         parentElement?.insertAdjacentElement("afterend", inputElement)


//         let UserPrompt= getUserPrompt()
//         // Loop through all selected ranges
//         for (let i = 0; i < selection.rangeCount; i++) {
//             const range = selection.getRangeAt(i);
            
//             const container = document.createElement("div");
//             container.appendChild(range.cloneContents());
//             selectedHTML += container.innerHTML;
//             // Append each selected range 
//         }

//         if (selectedHTML && UserPrompt) {
//             console.log(selectedHTML)
//             // Send selectedHTML to the background script or handle locally
//             chrome.runtime.sendMessage({
//                 action: "ChatGpt Call",
//                 selectedHTML: selectedHTML,
//                 userPrompt: UserPrompt
//             }, function (response) {

//                 if (chrome.runtime.lastError) {
//                     console.error("Runtime error:", chrome.runtime.lastError);
//                     return;
//                 }
//                 // Assume response contains the simplified HTML for all selected content
//                 if (response && response.simplifiedText) {
//                     // Handle each range and replace its contents
//                     for (let i = 0; i < selection.rangeCount; i++) {
//                         const range = selection.getRangeAt(i);
//                         range.deleteContents(); // Remove the original content
//                         const newNode = document.createElement("div");
//                         newNode.innerHTML = response.simplifiedText[i] || response.simplifiedText[0]; // Insert simplified content
//                         range.insertNode(newNode);
//                     }
//                 }
//             });
//         }
//     }
// });





let savedRange = null; // To store the selected range
let selectedHTML = "";

// Detect and save the selected range
document.addEventListener("mouseup", function () {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && selection.toString()) {
        savedRange = selection.getRangeAt(0).cloneRange(); // Save the range
        const container = document.createElement("div");
        container.appendChild(savedRange.cloneContents());
        selectedHTML = container.innerHTML;

        // Insert input element just after the selected paragraph
        savedRange.endContainer.parentElement.insertAdjacentElement("afterend", inputElement);
        inputElement.focus(); // Focus on the input


        inputElement.addEventListener("change", (event) => {
            userPromptValue = event.target.value;
            InitialSetup(event);
            console.log("User Prompt: " + userPromptValue);
        
            // Reapply the saved range to keep the selection
            const selection = window.getSelection();
            selection.removeAllRanges(); // Clear any current selection
            selection.addRange(savedRange); // Reapply the saved range
        
            if (selectedHTML && userPromptValue) {
                console.log(selectedHTML)
                // Send selectedHTML to the background script or handle locally
                chrome.runtime.sendMessage({
                    action: "ChatGpt Call",
                    selectedHTML: selectedHTML,
                    userPrompt: userPromptValue
                }, function (response) {
        
                    if (chrome.runtime.lastError) {
                        console.error("Runtime error:", chrome.runtime.lastError);
                        return;
                    }
                    // Assume response contains the simplified HTML for all selected content
                    if (response && response.simplifiedText) {
                        // Handle each range and replace its contents
                        for (let i = 0; i < selection.rangeCount; i++) {
                            const range = selection.getRangeAt(i);
                            range.deleteContents(); // Remove the original content
                            const newNode = document.createElement("div");
                            newNode.innerHTML = response.simplifiedText[i] || response.simplifiedText[0]; // Insert simplified content
                            range.insertNode(newNode);
                        }
                    }
                });
            }
        
            // Reset input for future interactions
            inputElement.value = "";
        });
    }
});












// let isActive = false;

// // Listen for messages from the background script
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "deactivate") {
//         deactivateClipClarity();
//     }
// });

// Function to activate ClipClarity
// function activateClipClarity() {
//     isActive = true;
//     // Add your activation logic here (e.g., showing input fields, etc.)
//     console.log("ClipClarity activated.");
//     document.addEventListener("mouseup", function () {
//         const selection = window.getSelection();
//         if (selection.rangeCount > 0 && selection.toString()) {
//             savedRange = selection.getRangeAt(0).cloneRange(); // Save the range
//             const container = document.createElement("div");
//             container.appendChild(savedRange.cloneContents());
//             selectedHTML = container.innerHTML;
    
//             // Insert input element just after the selected paragraph
//             savedRange.endContainer.parentElement.insertAdjacentElement("afterend", inputElement);
//             inputElement.focus(); // Focus on the input
    
    
//             inputElement.addEventListener("change", (event) => {
//                 userPromptValue = event.target.value;
//                 InitialSetup(event);
//                 console.log("User Prompt: " + userPromptValue);
            
//                 // Reapply the saved range to keep the selection
//                 const selection = window.getSelection();
//                 selection.removeAllRanges(); // Clear any current selection
//                 selection.addRange(savedRange); // Reapply the saved range
            
//                 if (selectedHTML && userPromptValue) {
//                     console.log(selectedHTML)
//                     // Send selectedHTML to the background script or handle locally
//                     chrome.runtime.sendMessage({
//                         action: "ChatGpt Call",
//                         selectedHTML: selectedHTML,
//                         userPrompt: userPromptValue
//                     }, function (response) {
            
//                         if (chrome.runtime.lastError) {
//                             console.error("Runtime error:", chrome.runtime.lastError);
//                             return;
//                         }
//                         // Assume response contains the simplified HTML for all selected content
//                         if (response && response.simplifiedText) {
//                             // Handle each range and replace its contents
//                             for (let i = 0; i < selection.rangeCount; i++) {
//                                 const range = selection.getRangeAt(i);
//                                 range.deleteContents(); // Remove the original content
//                                 const newNode = document.createElement("div");
//                                 newNode.innerHTML = response.simplifiedText[i] || response.simplifiedText[0]; // Insert simplified content
//                                 range.insertNode(newNode);
//                             }
//                         }
//                     });
//                 }
            
//                 // Reset input for future interactions
//                 inputElement.value = "";
//             });
//         }
//     });
// }

// Function to deactivate ClipClarity
// function deactivateClipClarity() {
//     isActive = false;
//     // Add your deactivation logic here (e.g., hiding input fields, etc.)
//     console.log("ClipClarity deactivated.");
//     inputElement.remove();
// }

// // Automatically activate when the user clicks the extension icon
// chrome.runtime.onInstalled.addListener(() => {
//     chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//         if (msg.action === "activate") {
//             activateClipClarity();
//         }
//     });
// });












/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDBCQUEwQjtBQUNqRTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLHlHQUF5RztBQUN6RztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMEJBQTBCO0FBQ2xFO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0EsMEdBQTBHO0FBQzFHO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRCxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBCQUEwQjtBQUN6RTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBLGlIQUFpSDtBQUNqSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGlwY2xhcml0eS1jaHJvbWUtZXh0ZW5zaW9uLy4vcHVibGljL2NvbnRlbnRTY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG5pbnB1dEVsZW1lbnQucGxhY2Vob2xkZXIgPSBcIkVudGVyIHRoZSBkZXNpcmVkIHByb21wdCBmb3IgZGVzaXJlZCBvdXRwdXRcIjtcclxuXHJcbmlucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7IFxyXG5pbnB1dEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcImluaGVyaXRcIjsgXHJcbmlucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiOyBcclxuaW5wdXRFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNjY2NcIjsgXHJcbmlucHV0RWxlbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjhweFwiOyBcclxuaW5wdXRFbGVtZW50LnN0eWxlLnBhZGRpbmcgPSBcIjEycHhcIjsgXHJcbmlucHV0RWxlbWVudC5zdHlsZS5ib3hTaXppbmcgPSBcImJvcmRlci1ib3hcIjsgXHJcbmlucHV0RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiaW5oZXJpdFwiOyBcclxuaW5wdXRFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSBcImluaGVyaXRcIjsgXHJcbmlucHV0RWxlbWVudC5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7IFxyXG5pbnB1dEVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiYm9yZGVyLWNvbG9yIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2VcIjsgXHJcblxyXG5cclxuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiB7XHJcbiAgaW5wdXRFbGVtZW50LnN0eWxlLmJvcmRlckNvbG9yID0gXCIjMDA3QkZGXCI7IFxyXG4gIGlucHV0RWxlbWVudC5zdHlsZS5ib3hTaGFkb3cgPSBcIjAgMCA0cHggcmdiYSgwLCAxMjMsIDI1NSwgMC41KVwiOyBcclxufSk7XHJcblxyXG5cclxuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHtcclxuICBpbnB1dEVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiNjY2NcIjsgXHJcbiAgaW5wdXRFbGVtZW50LnN0eWxlLmJveFNoYWRvdyA9IFwibm9uZVwiOyBcclxufSk7XHJcbmxldCB1c2VyUHJvbXB0VmFsdWUgPSBcIlwiO1xyXG5cclxuXHJcbi8vIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4vLyAgICAgdXNlclByb21wdFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4vLyAgICAgY29uc29sZS5sb2coXCJJbnNpZGU6IFwiICsgdXNlclByb21wdFZhbHVlKTtcclxuLy8gICAgIEluaXRpYWxTZXR1cChldmVudCk7XHJcbi8vIH0pO1xyXG5cclxuXHJcbmNvbnN0IEluaXRpYWxTZXR1cCA9IChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gXCJcIjsgXHJcbiAgICBpbnB1dEVsZW1lbnQucmVtb3ZlKCk7IFxyXG59O1xyXG5cclxuXHJcbmNvbnN0IGdldFVzZXJQcm9tcHQgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gdXNlclByb21wdFZhbHVlO1xyXG59O1xyXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuLy8gICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuLy8gICAgIGxldCBwYXJlbnRFbGVtZW50ID0gd2luZG93LmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUucGFyZW50RWxlbWVudDtcclxuLy8gICAgIGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCA+IDAgJiYgc2VsZWN0aW9uLnRvU3RyaW5nKCkpIHtcclxuLy8gICAgICAgICBsZXQgc2VsZWN0ZWRIVE1MID0gXCJcIjtcclxuLy8gICAgICAgICBwYXJlbnRFbGVtZW50Py5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBpbnB1dEVsZW1lbnQpXHJcblxyXG5cclxuLy8gICAgICAgICBsZXQgVXNlclByb21wdD0gZ2V0VXNlclByb21wdCgpXHJcbi8vICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBzZWxlY3RlZCByYW5nZXNcclxuLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGlvbi5yYW5nZUNvdW50OyBpKyspIHtcclxuLy8gICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpKTtcclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xyXG4vLyAgICAgICAgICAgICBzZWxlY3RlZEhUTUwgKz0gY29udGFpbmVyLmlubmVySFRNTDtcclxuLy8gICAgICAgICAgICAgLy8gQXBwZW5kIGVhY2ggc2VsZWN0ZWQgcmFuZ2UgXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBpZiAoc2VsZWN0ZWRIVE1MICYmIFVzZXJQcm9tcHQpIHtcclxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRIVE1MKVxyXG4vLyAgICAgICAgICAgICAvLyBTZW5kIHNlbGVjdGVkSFRNTCB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHQgb3IgaGFuZGxlIGxvY2FsbHlcclxuLy8gICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4vLyAgICAgICAgICAgICAgICAgYWN0aW9uOiBcIkNoYXRHcHQgQ2FsbFwiLFxyXG4vLyAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIVE1MOiBzZWxlY3RlZEhUTUwsXHJcbi8vICAgICAgICAgICAgICAgICB1c2VyUHJvbXB0OiBVc2VyUHJvbXB0XHJcbi8vICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUnVudGltZSBlcnJvcjpcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgcmVzcG9uc2UgY29udGFpbnMgdGhlIHNpbXBsaWZpZWQgSFRNTCBmb3IgYWxsIHNlbGVjdGVkIGNvbnRlbnRcclxuLy8gICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zaW1wbGlmaWVkVGV4dCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBlYWNoIHJhbmdlIGFuZCByZXBsYWNlIGl0cyBjb250ZW50c1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0aW9uLnJhbmdlQ291bnQ7IGkrKykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KGkpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpOyAvLyBSZW1vdmUgdGhlIG9yaWdpbmFsIGNvbnRlbnRcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG5ld05vZGUuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc2ltcGxpZmllZFRleHRbaV0gfHwgcmVzcG9uc2Uuc2ltcGxpZmllZFRleHRbMF07IC8vIEluc2VydCBzaW1wbGlmaWVkIGNvbnRlbnRcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZShuZXdOb2RlKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxubGV0IHNhdmVkUmFuZ2UgPSBudWxsOyAvLyBUbyBzdG9yZSB0aGUgc2VsZWN0ZWQgcmFuZ2VcclxubGV0IHNlbGVjdGVkSFRNTCA9IFwiXCI7XHJcblxyXG4vLyBEZXRlY3QgYW5kIHNhdmUgdGhlIHNlbGVjdGVkIHJhbmdlXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgIGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCA+IDAgJiYgc2VsZWN0aW9uLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICBzYXZlZFJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkuY2xvbmVSYW5nZSgpOyAvLyBTYXZlIHRoZSByYW5nZVxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNhdmVkUmFuZ2UuY2xvbmVDb250ZW50cygpKTtcclxuICAgICAgICBzZWxlY3RlZEhUTUwgPSBjb250YWluZXIuaW5uZXJIVE1MO1xyXG5cclxuICAgICAgICAvLyBJbnNlcnQgaW5wdXQgZWxlbWVudCBqdXN0IGFmdGVyIHRoZSBzZWxlY3RlZCBwYXJhZ3JhcGhcclxuICAgICAgICBzYXZlZFJhbmdlLmVuZENvbnRhaW5lci5wYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7IC8vIEZvY3VzIG9uIHRoZSBpbnB1dFxyXG5cclxuXHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJQcm9tcHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgSW5pdGlhbFNldHVwKGV2ZW50KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIFByb21wdDogXCIgKyB1c2VyUHJvbXB0VmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZWFwcGx5IHRoZSBzYXZlZCByYW5nZSB0byBrZWVwIHRoZSBzZWxlY3Rpb25cclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7IC8vIENsZWFyIGFueSBjdXJyZW50IHNlbGVjdGlvblxyXG4gICAgICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2Uoc2F2ZWRSYW5nZSk7IC8vIFJlYXBwbHkgdGhlIHNhdmVkIHJhbmdlXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhUTUwgJiYgdXNlclByb21wdFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZEhUTUwpXHJcbiAgICAgICAgICAgICAgICAvLyBTZW5kIHNlbGVjdGVkSFRNTCB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHQgb3IgaGFuZGxlIGxvY2FsbHlcclxuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiQ2hhdEdwdCBDYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIVE1MOiBzZWxlY3RlZEhUTUwsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlclByb21wdDogdXNlclByb21wdFZhbHVlXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSdW50aW1lIGVycm9yOlwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFzc3VtZSByZXNwb25zZSBjb250YWlucyB0aGUgc2ltcGxpZmllZCBIVE1MIGZvciBhbGwgc2VsZWN0ZWQgY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zaW1wbGlmaWVkVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZWFjaCByYW5nZSBhbmQgcmVwbGFjZSBpdHMgY29udGVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTsgLy8gUmVtb3ZlIHRoZSBvcmlnaW5hbCBjb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld05vZGUuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc2ltcGxpZmllZFRleHRbaV0gfHwgcmVzcG9uc2Uuc2ltcGxpZmllZFRleHRbMF07IC8vIEluc2VydCBzaW1wbGlmaWVkIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmluc2VydE5vZGUobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZXNldCBpbnB1dCBmb3IgZnV0dXJlIGludGVyYWN0aW9uc1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gbGV0IGlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG4vLyAvLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIGZyb20gdGhlIGJhY2tncm91bmQgc2NyaXB0XHJcbi8vIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuLy8gICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gXCJkZWFjdGl2YXRlXCIpIHtcclxuLy8gICAgICAgICBkZWFjdGl2YXRlQ2xpcENsYXJpdHkoKTtcclxuLy8gICAgIH1cclxuLy8gfSk7XHJcblxyXG4vLyBGdW5jdGlvbiB0byBhY3RpdmF0ZSBDbGlwQ2xhcml0eVxyXG4vLyBmdW5jdGlvbiBhY3RpdmF0ZUNsaXBDbGFyaXR5KCkge1xyXG4vLyAgICAgaXNBY3RpdmUgPSB0cnVlO1xyXG4vLyAgICAgLy8gQWRkIHlvdXIgYWN0aXZhdGlvbiBsb2dpYyBoZXJlIChlLmcuLCBzaG93aW5nIGlucHV0IGZpZWxkcywgZXRjLilcclxuLy8gICAgIGNvbnNvbGUubG9nKFwiQ2xpcENsYXJpdHkgYWN0aXZhdGVkLlwiKTtcclxuLy8gICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbi8vICAgICAgICAgaWYgKHNlbGVjdGlvbi5yYW5nZUNvdW50ID4gMCAmJiBzZWxlY3Rpb24udG9TdHJpbmcoKSkge1xyXG4vLyAgICAgICAgICAgICBzYXZlZFJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkuY2xvbmVSYW5nZSgpOyAvLyBTYXZlIHRoZSByYW5nZVxyXG4vLyAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vLyAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2F2ZWRSYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xyXG4vLyAgICAgICAgICAgICBzZWxlY3RlZEhUTUwgPSBjb250YWluZXIuaW5uZXJIVE1MO1xyXG4gICAgXHJcbi8vICAgICAgICAgICAgIC8vIEluc2VydCBpbnB1dCBlbGVtZW50IGp1c3QgYWZ0ZXIgdGhlIHNlbGVjdGVkIHBhcmFncmFwaFxyXG4vLyAgICAgICAgICAgICBzYXZlZFJhbmdlLmVuZENvbnRhaW5lci5wYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGlucHV0RWxlbWVudCk7XHJcbi8vICAgICAgICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpOyAvLyBGb2N1cyBvbiB0aGUgaW5wdXRcclxuICAgIFxyXG4gICAgXHJcbi8vICAgICAgICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgdXNlclByb21wdFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4vLyAgICAgICAgICAgICAgICAgSW5pdGlhbFNldHVwKGV2ZW50KTtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBQcm9tcHQ6IFwiICsgdXNlclByb21wdFZhbHVlKTtcclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgICAgICAvLyBSZWFwcGx5IHRoZSBzYXZlZCByYW5nZSB0byBrZWVwIHRoZSBzZWxlY3Rpb25cclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuLy8gICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTsgLy8gQ2xlYXIgYW55IGN1cnJlbnQgc2VsZWN0aW9uXHJcbi8vICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2Uoc2F2ZWRSYW5nZSk7IC8vIFJlYXBwbHkgdGhlIHNhdmVkIHJhbmdlXHJcbiAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSFRNTCAmJiB1c2VyUHJvbXB0VmFsdWUpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZEhUTUwpXHJcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCBzZWxlY3RlZEhUTUwgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0IG9yIGhhbmRsZSBsb2NhbGx5XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiQ2hhdEdwdCBDYWxsXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSFRNTDogc2VsZWN0ZWRIVE1MLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyUHJvbXB0OiB1c2VyUHJvbXB0VmFsdWVcclxuLy8gICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSdW50aW1lIGVycm9yOlwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc3VtZSByZXNwb25zZSBjb250YWlucyB0aGUgc2ltcGxpZmllZCBIVE1MIGZvciBhbGwgc2VsZWN0ZWQgY29udGVudFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc2ltcGxpZmllZFRleHQpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBlYWNoIHJhbmdlIGFuZCByZXBsYWNlIGl0cyBjb250ZW50c1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpOyAvLyBSZW1vdmUgdGhlIG9yaWdpbmFsIGNvbnRlbnRcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlLmlubmVySFRNTCA9IHJlc3BvbnNlLnNpbXBsaWZpZWRUZXh0W2ldIHx8IHJlc3BvbnNlLnNpbXBsaWZpZWRUZXh0WzBdOyAvLyBJbnNlcnQgc2ltcGxpZmllZCBjb250ZW50XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZShuZXdOb2RlKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICAgICAgICAgIC8vIFJlc2V0IGlucHV0IGZvciBmdXR1cmUgaW50ZXJhY3Rpb25zXHJcbi8vICAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gfVxyXG5cclxuLy8gRnVuY3Rpb24gdG8gZGVhY3RpdmF0ZSBDbGlwQ2xhcml0eVxyXG4vLyBmdW5jdGlvbiBkZWFjdGl2YXRlQ2xpcENsYXJpdHkoKSB7XHJcbi8vICAgICBpc0FjdGl2ZSA9IGZhbHNlO1xyXG4vLyAgICAgLy8gQWRkIHlvdXIgZGVhY3RpdmF0aW9uIGxvZ2ljIGhlcmUgKGUuZy4sIGhpZGluZyBpbnB1dCBmaWVsZHMsIGV0Yy4pXHJcbi8vICAgICBjb25zb2xlLmxvZyhcIkNsaXBDbGFyaXR5IGRlYWN0aXZhdGVkLlwiKTtcclxuLy8gICAgIGlucHV0RWxlbWVudC5yZW1vdmUoKTtcclxuLy8gfVxyXG5cclxuLy8gLy8gQXV0b21hdGljYWxseSBhY3RpdmF0ZSB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgZXh0ZW5zaW9uIGljb25cclxuLy8gY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4vLyAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2csIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICAgICAgaWYgKG1zZy5hY3Rpb24gPT09IFwiYWN0aXZhdGVcIikge1xyXG4vLyAgICAgICAgICAgICBhY3RpdmF0ZUNsaXBDbGFyaXR5KCk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbi8vIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==