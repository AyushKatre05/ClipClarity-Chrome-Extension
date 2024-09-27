import React, { useState } from 'react';

const App = () => {
  const [selectedText, setSelectedText] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const fetchSelectedText = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {  
        const tabId = tabs[0]?.id; // Use optional chaining to check if the id exists

        if (tabId !== undefined) {
            chrome.tabs.sendMessage(tabId, { action: 'someAction' }, (response) => {
                console.log(response);
            });
        } else {
            console.error('No active tab found or tab id is undefined');
        }
    });
  };

  const callGeminiAPI = () => {
    chrome.runtime.sendMessage({ action: "callGeminiAPI", text: selectedText }, (response) => {
      if (response && response.result) {
        setApiResponse(response.result);
        
        // Now replace the selected text in the DOM
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tabId = tabs[0]?.id;
          if (tabId !== undefined) {
            chrome.tabs.sendMessage(tabId, { action: "replaceSelectedText", newText: response.result });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1>ClipClarity</h1>
      <button onClick={fetchSelectedText}>Get Selected Text</button>
      <p>Selected Text: {selectedText}</p>

      {selectedText && (
        <button onClick={callGeminiAPI}>Get Explanation</button>
      )}

      {apiResponse && (
        <p>API Response: {apiResponse}</p>
      )}
    </div>
  );
};

export default App;

