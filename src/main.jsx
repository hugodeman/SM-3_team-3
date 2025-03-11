import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './context/Darkmode.jsx';

window.onerror = function (message, source, lineno, colno, error) {
    if (message.includes("removeChild")) {
        return true;
    }
};

createRoot(document.getElementById('root')).render(
    <App />
)
createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>,
)
