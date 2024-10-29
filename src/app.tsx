import React, { useState } from 'react';
import "./main.css"

const App = () => {
  // const [selectedText, setSelectedText] = useState('');
  // const [apiResponse, setApiResponse] = useState('');

  // const fetchSelectedText = () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {  
  //       console.log(tabs)
  //       const tabId = tabs[0]?.id; // Use optional chaining to check if the id exists

  //       if (tabId) {
  //           console.log("Hai Bro")
  //           chrome.tabs.sendMessage(tabId, { action: "getSelectedText" }, (response) => {
  //               console.log(response)
  //               setSelectedText("Hello");
  //           });
  //       } else {
  //           console.error('No active tab found or tab id is undefined');
  //       }
  //   });
  // };

  // const callGeminiAPI = () => {
  //   chrome.runtime.sendMessage({ action: "callGeminiAPI", text: selectedText }, (response) => {
  //     if (response && response.result) {
  //       setApiResponse(response.result);

  //       // Now replace the selected text in the DOM
  //       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //         const tabId = tabs[0]?.id;
  //         if (tabId !== undefined) {
  //           chrome.tabs.sendMessage(tabId, { action: "replaceSelectedText", newText: response.result });
  //         }
  //       });
  //     }
  //   });
  // };


  console.log("From app")

  return (
    <div>
      <div className="text-white flex flex-col justify-center items-center text-center gap-1">
        <h3 className="m-0 font-bold">Welcome to Clip Clarity!</h3>
        <p className="m-0 text-sm">Highlight text on any webpage and use the extension to simplify or get desired insights instantly.</p>
      </div>
    </div>
  );
};

export default App;

