import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MainPage from "./MainPage.jsx";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MainPage />
    </StrictMode>
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
