
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize dark mode if not set
if (!localStorage.getItem('theme')) {
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}

createRoot(document.getElementById("root")!).render(<App />);
