
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize dark mode as the default
document.documentElement.classList.add('dark');
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
} else if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
