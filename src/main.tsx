
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize dark mode for landing page only
const isDashboardPage = window.location.pathname.includes('/dashboard');
if (!isDashboardPage) {
  document.documentElement.classList.add('dark');
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }
} else if (localStorage.getItem('theme') === 'dark') {
  // Remove dark mode in dashboard
  document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', 'light');
}

createRoot(document.getElementById("root")!).render(<App />);
