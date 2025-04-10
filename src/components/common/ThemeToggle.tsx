
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Set default to dark
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    
    // Show a toast notification when theme changes
    toast({
      title: newTheme === 'dark' ? 'Koyu tema aktif' : 'Açık tema aktif',
      description: newTheme === 'dark' ? 'Sayfa koyu temaya geçti' : 'Sayfa açık temaya geçti',
      duration: 2000,
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className="h-8 w-8 px-0 hover:bg-muted/50 transition-all duration-300 animate-fade-in"
      aria-label={theme === 'light' ? 'Koyu temaya geç' : 'Açık temaya geç'}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
      )}
    </Button>
  );
};

export default ThemeToggle;
