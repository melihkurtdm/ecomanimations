
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force dark mode as the default on initial load
document.documentElement.classList.add('dark');
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
} else if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
