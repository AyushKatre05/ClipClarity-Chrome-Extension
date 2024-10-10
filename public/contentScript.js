console.log("Hi from Content Script");

const inputElement = document.createElement("input");
inputElement.placeholder = "Enter the desired prompt for desired output";
inputElement.style.backgroundColor = "lightblue";
inputElement.style.color = "black";
inputElement.style.width = "100%";
inputElement.style.border = "none";
inputElement.style.borderRadius = "15px";
inputElement.style.textAlign = "center";
inputElement.style.userSelect = "none";

let userPromptValue = "";


inputElement.addEventListener("change", (event) => {
    userPromptValue = event.target.value;
    console.log("Inside: " + userPromptValue);
    InitialSetup(event);
});


const InitialSetup = (event) => {
    event.target.value = ""; 
    inputElement.remove(); 
};

// Return user prompt value when needed
const getUserPrompt = () => {
    return userPromptValue;
};
document.addEventListener("mouseup", function (event) {
    const selection = window.getSelection();
    let parentElement = window.getSelection().anchorNode.parentElement;
    if (selection.rangeCount > 0 && selection.toString()) {
        let selectedHTML = "";
        parentElement?.insertAdjacentElement("afterend", inputElement)
        let UserPrompt= getUserPrompt()
        // Loop through all selected ranges
        for (let i = 0; i < selection.rangeCount; i++) {
            const range = selection.getRangeAt(i);
            
            const container = document.createElement("div");
            container.appendChild(range.cloneContents());
            selectedHTML += container.innerHTML;
            // Append each selected range 
        }

        if (selectedHTML && UserPrompt) {
            console.log(selectedHTML)
            // Send selectedHTML to the background script or handle locally
            chrome.runtime.sendMessage({
                action: "ChatGpt Call",
                selectedHTML: selectedHTML,
                userPrompt: UserPrompt
            }, function (response) {
                // Assume response contains the simplified HTML for all selected content
                if (response && response.simplifiedText) {
                    // Handle each range and replace its contents
                    for (let i = 0; i < selection.rangeCount; i++) {
                        const range = selection.getRangeAt(i);
                        range.deleteContents(); // Remove the original content
                        const newNode = document.createElement("div");
                        newNode.innerHTML = response.simplifiedText[i]; // Insert simplified content
                        range.insertNode(newNode);
                    }
                }
            });
        }
    }
});




// // Listen for the mouseup event to trigger selection capture
// document.addEventListener("mouseup", function (event) {
//     const selection = window.getSelection();
//     console.log(selection)
//     let parentElement = window.getSelection().anchorNode?.parentElement;

//     // Check if there is a selection with content
//     if (selection.rangeCount > 0 && selection.toString()) {
//         console.log(" I am Here")
//         let selectedHTML = "";
//         parentElement?.insertAdjacentElement("afterend", inputElement); // Insert input after the selection

//         inputElement.focus(); // Automatically focus the input field for better UX

//         const checkUserPrompt = setInterval(() => {
//             let UserPrompt = getUserPrompt();
            
//             // Only proceed when we have both the selectedHTML and user prompt
//             if (selectedHTML && UserPrompt) {
//                 clearInterval(checkUserPrompt); // Stop the interval once we have the data
//                 console.log("I am Here Now")
//                 // Loop through all selected ranges and capture the selected HTML
//                 for (let i = 0; i < selection.rangeCount; i++) {
//                     const range = selection.getRangeAt(i);
//                     const container = document.createElement("div");
//                     container.appendChild(range.cloneContents());
//                     selectedHTML += container.innerHTML; // Append selected range HTML
//                 }

//                 console.log("Selected HTML:", selectedHTML);

//                 // Send the selectedHTML and userPrompt to the background script
//                 chrome.runtime.sendMessage({
//                     action: "ChatGpt Call",
//                     selectedHTML: selectedHTML,
//                     userPrompt: UserPrompt
//                 }, function (response) {
//                     if (chrome.runtime.lastError) {
//                         console.error("Runtime error: ", chrome.runtime.lastError.message);
//                         return;
//                     }

//                     // Log the response from background.js
//                     console.log(response);

//                     // If the response has simplifiedText, replace original selection content
//                     if (response && response.simplifiedText) {
//                         // Handle each range and replace its contents
//                         for (let i = 0; i < selection.rangeCount; i++) {
//                             const range = selection.getRangeAt(i);
//                             range.deleteContents(); // Remove the original content
//                             const newNode = document.createElement("div");
//                             newNode.innerHTML = response.simplifiedText[i]; // Insert the simplified text
//                             range.insertNode(newNode);
//                         }
//                     }
//                 });
//             }
//         }, 500); // Check for user input every 500ms
//     }
// });
