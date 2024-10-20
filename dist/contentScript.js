/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./public/contentScript.js ***!
  \*********************************/
alert("Hi from Content Script");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDBCQUEwQjtBQUNqRTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLHlHQUF5RztBQUN6RztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMEJBQTBCO0FBQ2xFO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0EsMEdBQTBHO0FBQzFHO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRCxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBCQUEwQjtBQUN6RTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBLGlIQUFpSDtBQUNqSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGlwY2xhcml0eS1jaHJvbWUtZXh0ZW5zaW9uLy4vcHVibGljL2NvbnRlbnRTY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYWxlcnQoXCJIaSBmcm9tIENvbnRlbnQgU2NyaXB0XCIpO1xyXG5cclxuXHJcbmNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuaW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyID0gXCJFbnRlciB0aGUgZGVzaXJlZCBwcm9tcHQgZm9yIGRlc2lyZWQgb3V0cHV0XCI7XHJcblxyXG5pbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiOyBcclxuaW5wdXRFbGVtZW50LnN0eWxlLmNvbG9yID0gXCJpbmhlcml0XCI7IFxyXG5pbnB1dEVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjsgXHJcbmlucHV0RWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjY2NjXCI7IFxyXG5pbnB1dEVsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI4cHhcIjsgXHJcbmlucHV0RWxlbWVudC5zdHlsZS5wYWRkaW5nID0gXCIxMnB4XCI7IFxyXG5pbnB1dEVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7IFxyXG5pbnB1dEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcImluaGVyaXRcIjsgXHJcbmlucHV0RWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gXCJpbmhlcml0XCI7IFxyXG5pbnB1dEVsZW1lbnQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiOyBcclxuaW5wdXRFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcImJvcmRlci1jb2xvciAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlXCI7IFxyXG5cclxuXHJcbmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4ge1xyXG4gIGlucHV0RWxlbWVudC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiIzAwN0JGRlwiOyBcclxuICBpbnB1dEVsZW1lbnQuc3R5bGUuYm94U2hhZG93ID0gXCIwIDAgNHB4IHJnYmEoMCwgMTIzLCAyNTUsIDAuNSlcIjsgXHJcbn0pO1xyXG5cclxuXHJcbmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB7XHJcbiAgaW5wdXRFbGVtZW50LnN0eWxlLmJvcmRlckNvbG9yID0gXCIjY2NjXCI7IFxyXG4gIGlucHV0RWxlbWVudC5zdHlsZS5ib3hTaGFkb3cgPSBcIm5vbmVcIjsgXHJcbn0pO1xyXG5sZXQgdXNlclByb21wdFZhbHVlID0gXCJcIjtcclxuXHJcblxyXG4vLyBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcclxuLy8gICAgIHVzZXJQcm9tcHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuLy8gICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlOiBcIiArIHVzZXJQcm9tcHRWYWx1ZSk7XHJcbi8vICAgICBJbml0aWFsU2V0dXAoZXZlbnQpO1xyXG4vLyB9KTtcclxuXHJcblxyXG5jb25zdCBJbml0aWFsU2V0dXAgPSAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IFwiXCI7IFxyXG4gICAgaW5wdXRFbGVtZW50LnJlbW92ZSgpOyBcclxufTtcclxuXHJcblxyXG5jb25zdCBnZXRVc2VyUHJvbXB0ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHVzZXJQcm9tcHRWYWx1ZTtcclxufTtcclxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbi8vICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbi8vICAgICBsZXQgcGFyZW50RWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQ7XHJcbi8vICAgICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwICYmIHNlbGVjdGlvbi50b1N0cmluZygpKSB7XHJcbi8vICAgICAgICAgbGV0IHNlbGVjdGVkSFRNTCA9IFwiXCI7XHJcbi8vICAgICAgICAgcGFyZW50RWxlbWVudD8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgaW5wdXRFbGVtZW50KVxyXG5cclxuXHJcbi8vICAgICAgICAgbGV0IFVzZXJQcm9tcHQ9IGdldFVzZXJQcm9tcHQoKVxyXG4vLyAgICAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgc2VsZWN0ZWQgcmFuZ2VzXHJcbi8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoaSk7XHJcbiAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vLyAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmFuZ2UuY2xvbmVDb250ZW50cygpKTtcclxuLy8gICAgICAgICAgICAgc2VsZWN0ZWRIVE1MICs9IGNvbnRhaW5lci5pbm5lckhUTUw7XHJcbi8vICAgICAgICAgICAgIC8vIEFwcGVuZCBlYWNoIHNlbGVjdGVkIHJhbmdlIFxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgaWYgKHNlbGVjdGVkSFRNTCAmJiBVc2VyUHJvbXB0KSB7XHJcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkSFRNTClcclxuLy8gICAgICAgICAgICAgLy8gU2VuZCBzZWxlY3RlZEhUTUwgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0IG9yIGhhbmRsZSBsb2NhbGx5XHJcbi8vICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuLy8gICAgICAgICAgICAgICAgIGFjdGlvbjogXCJDaGF0R3B0IENhbGxcIixcclxuLy8gICAgICAgICAgICAgICAgIHNlbGVjdGVkSFRNTDogc2VsZWN0ZWRIVE1MLFxyXG4vLyAgICAgICAgICAgICAgICAgdXNlclByb21wdDogVXNlclByb21wdFxyXG4vLyAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJ1bnRpbWUgZXJyb3I6XCIsIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHJlc3BvbnNlIGNvbnRhaW5zIHRoZSBzaW1wbGlmaWVkIEhUTUwgZm9yIGFsbCBzZWxlY3RlZCBjb250ZW50XHJcbi8vICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc2ltcGxpZmllZFRleHQpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZWFjaCByYW5nZSBhbmQgcmVwbGFjZSBpdHMgY29udGVudHNcclxuLy8gICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGlvbi5yYW5nZUNvdW50OyBpKyspIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTsgLy8gUmVtb3ZlIHRoZSBvcmlnaW5hbCBjb250ZW50XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlLmlubmVySFRNTCA9IHJlc3BvbnNlLnNpbXBsaWZpZWRUZXh0W2ldIHx8IHJlc3BvbnNlLnNpbXBsaWZpZWRUZXh0WzBdOyAvLyBJbnNlcnQgc2ltcGxpZmllZCBjb250ZW50XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmluc2VydE5vZGUobmV3Tm9kZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmxldCBzYXZlZFJhbmdlID0gbnVsbDsgLy8gVG8gc3RvcmUgdGhlIHNlbGVjdGVkIHJhbmdlXHJcbmxldCBzZWxlY3RlZEhUTUwgPSBcIlwiO1xyXG5cclxuLy8gRGV0ZWN0IGFuZCBzYXZlIHRoZSBzZWxlY3RlZCByYW5nZVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwICYmIHNlbGVjdGlvbi50b1N0cmluZygpKSB7XHJcbiAgICAgICAgc2F2ZWRSYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmNsb25lUmFuZ2UoKTsgLy8gU2F2ZSB0aGUgcmFuZ2VcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlZFJhbmdlLmNsb25lQ29udGVudHMoKSk7XHJcbiAgICAgICAgc2VsZWN0ZWRIVE1MID0gY29udGFpbmVyLmlubmVySFRNTDtcclxuXHJcbiAgICAgICAgLy8gSW5zZXJ0IGlucHV0IGVsZW1lbnQganVzdCBhZnRlciB0aGUgc2VsZWN0ZWQgcGFyYWdyYXBoXHJcbiAgICAgICAgc2F2ZWRSYW5nZS5lbmRDb250YWluZXIucGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpOyAvLyBGb2N1cyBvbiB0aGUgaW5wdXRcclxuXHJcblxyXG4gICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB1c2VyUHJvbXB0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIEluaXRpYWxTZXR1cChldmVudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBQcm9tcHQ6IFwiICsgdXNlclByb21wdFZhbHVlKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVhcHBseSB0aGUgc2F2ZWQgcmFuZ2UgdG8ga2VlcCB0aGUgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpOyAvLyBDbGVhciBhbnkgY3VycmVudCBzZWxlY3Rpb25cclxuICAgICAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHNhdmVkUmFuZ2UpOyAvLyBSZWFwcGx5IHRoZSBzYXZlZCByYW5nZVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRIVE1MICYmIHVzZXJQcm9tcHRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRIVE1MKVxyXG4gICAgICAgICAgICAgICAgLy8gU2VuZCBzZWxlY3RlZEhUTUwgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0IG9yIGhhbmRsZSBsb2NhbGx5XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcIkNoYXRHcHQgQ2FsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSFRNTDogc2VsZWN0ZWRIVE1MLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJQcm9tcHQ6IHVzZXJQcm9tcHRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUnVudGltZSBlcnJvcjpcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgcmVzcG9uc2UgY29udGFpbnMgdGhlIHNpbXBsaWZpZWQgSFRNTCBmb3IgYWxsIHNlbGVjdGVkIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc2ltcGxpZmllZFRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGVhY2ggcmFuZ2UgYW5kIHJlcGxhY2UgaXRzIGNvbnRlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0aW9uLnJhbmdlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7IC8vIFJlbW92ZSB0aGUgb3JpZ2luYWwgY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlLmlubmVySFRNTCA9IHJlc3BvbnNlLnNpbXBsaWZpZWRUZXh0W2ldIHx8IHJlc3BvbnNlLnNpbXBsaWZpZWRUZXh0WzBdOyAvLyBJbnNlcnQgc2ltcGxpZmllZCBjb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5pbnNlcnROb2RlKG5ld05vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVzZXQgaW5wdXQgZm9yIGZ1dHVyZSBpbnRlcmFjdGlvbnNcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIGxldCBpc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuLy8gLy8gTGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdFxyXG4vLyBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT09IFwiZGVhY3RpdmF0ZVwiKSB7XHJcbi8vICAgICAgICAgZGVhY3RpdmF0ZUNsaXBDbGFyaXR5KCk7XHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG5cclxuLy8gRnVuY3Rpb24gdG8gYWN0aXZhdGUgQ2xpcENsYXJpdHlcclxuLy8gZnVuY3Rpb24gYWN0aXZhdGVDbGlwQ2xhcml0eSgpIHtcclxuLy8gICAgIGlzQWN0aXZlID0gdHJ1ZTtcclxuLy8gICAgIC8vIEFkZCB5b3VyIGFjdGl2YXRpb24gbG9naWMgaGVyZSAoZS5nLiwgc2hvd2luZyBpbnB1dCBmaWVsZHMsIGV0Yy4pXHJcbi8vICAgICBjb25zb2xlLmxvZyhcIkNsaXBDbGFyaXR5IGFjdGl2YXRlZC5cIik7XHJcbi8vICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4vLyAgICAgICAgIGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCA+IDAgJiYgc2VsZWN0aW9uLnRvU3RyaW5nKCkpIHtcclxuLy8gICAgICAgICAgICAgc2F2ZWRSYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmNsb25lUmFuZ2UoKTsgLy8gU2F2ZSB0aGUgcmFuZ2VcclxuLy8gICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy8gICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNhdmVkUmFuZ2UuY2xvbmVDb250ZW50cygpKTtcclxuLy8gICAgICAgICAgICAgc2VsZWN0ZWRIVE1MID0gY29udGFpbmVyLmlubmVySFRNTDtcclxuICAgIFxyXG4vLyAgICAgICAgICAgICAvLyBJbnNlcnQgaW5wdXQgZWxlbWVudCBqdXN0IGFmdGVyIHRoZSBzZWxlY3RlZCBwYXJhZ3JhcGhcclxuLy8gICAgICAgICAgICAgc2F2ZWRSYW5nZS5lbmRDb250YWluZXIucGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBpbnB1dEVsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTsgLy8gRm9jdXMgb24gdGhlIGlucHV0XHJcbiAgICBcclxuICAgIFxyXG4vLyAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIHVzZXJQcm9tcHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuLy8gICAgICAgICAgICAgICAgIEluaXRpYWxTZXR1cChldmVudCk7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgUHJvbXB0OiBcIiArIHVzZXJQcm9tcHRWYWx1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICAgICAgLy8gUmVhcHBseSB0aGUgc2F2ZWQgcmFuZ2UgdG8ga2VlcCB0aGUgc2VsZWN0aW9uXHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbi8vICAgICAgICAgICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7IC8vIENsZWFyIGFueSBjdXJyZW50IHNlbGVjdGlvblxyXG4vLyAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHNhdmVkUmFuZ2UpOyAvLyBSZWFwcGx5IHRoZSBzYXZlZCByYW5nZVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhUTUwgJiYgdXNlclByb21wdFZhbHVlKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRIVE1MKVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIFNlbmQgc2VsZWN0ZWRIVE1MIHRvIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdCBvciBoYW5kbGUgbG9jYWxseVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcIkNoYXRHcHQgQ2FsbFwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhUTUw6IHNlbGVjdGVkSFRNTCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdXNlclByb21wdDogdXNlclByb21wdFZhbHVlXHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUnVudGltZSBlcnJvcjpcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgcmVzcG9uc2UgY29udGFpbnMgdGhlIHNpbXBsaWZpZWQgSFRNTCBmb3IgYWxsIHNlbGVjdGVkIGNvbnRlbnRcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnNpbXBsaWZpZWRUZXh0KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZWFjaCByYW5nZSBhbmQgcmVwbGFjZSBpdHMgY29udGVudHNcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0aW9uLnJhbmdlQ291bnQ7IGkrKykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoaSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTsgLy8gUmVtb3ZlIHRoZSBvcmlnaW5hbCBjb250ZW50XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZS5pbm5lckhUTUwgPSByZXNwb25zZS5zaW1wbGlmaWVkVGV4dFtpXSB8fCByZXNwb25zZS5zaW1wbGlmaWVkVGV4dFswXTsgLy8gSW5zZXJ0IHNpbXBsaWZpZWQgY29udGVudFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmluc2VydE5vZGUobmV3Tm9kZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgICAgICAvLyBSZXNldCBpbnB1dCBmb3IgZnV0dXJlIGludGVyYWN0aW9uc1xyXG4vLyAgICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbi8vIH1cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIGRlYWN0aXZhdGUgQ2xpcENsYXJpdHlcclxuLy8gZnVuY3Rpb24gZGVhY3RpdmF0ZUNsaXBDbGFyaXR5KCkge1xyXG4vLyAgICAgaXNBY3RpdmUgPSBmYWxzZTtcclxuLy8gICAgIC8vIEFkZCB5b3VyIGRlYWN0aXZhdGlvbiBsb2dpYyBoZXJlIChlLmcuLCBoaWRpbmcgaW5wdXQgZmllbGRzLCBldGMuKVxyXG4vLyAgICAgY29uc29sZS5sb2coXCJDbGlwQ2xhcml0eSBkZWFjdGl2YXRlZC5cIik7XHJcbi8vICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlKCk7XHJcbi8vIH1cclxuXHJcbi8vIC8vIEF1dG9tYXRpY2FsbHkgYWN0aXZhdGUgd2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGV4dGVuc2lvbiBpY29uXHJcbi8vIGNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcclxuLy8gICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4vLyAgICAgICAgIGlmIChtc2cuYWN0aW9uID09PSBcImFjdGl2YXRlXCIpIHtcclxuLy8gICAgICAgICAgICAgYWN0aXZhdGVDbGlwQ2xhcml0eSgpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG4vLyB9KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=