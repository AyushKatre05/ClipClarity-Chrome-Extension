console.log("Hi from Content Script");


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











