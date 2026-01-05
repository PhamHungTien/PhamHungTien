import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add preconnect hints for performance
const head = document.head;
const preconnectFacebook = document.createElement('link');
preconnectFacebook.rel = 'preconnect';
preconnectFacebook.href = 'https://cdn.tailwindcss.com';
head.appendChild(preconnectFacebook);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);