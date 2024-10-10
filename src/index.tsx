import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot
import App from './app';

// Create a root and render the App component into the div with id "root"
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);  // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);