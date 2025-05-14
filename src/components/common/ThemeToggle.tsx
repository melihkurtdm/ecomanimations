
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>(() => {
    const isLandingPage = window.location.pathname === '/';
    return isLandingPage ? 'dark' : 'light';
  });
  
  // Get theme from context
  const { theme } = useTheme();

  useEffect(() => {
    const savedColorMode = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedColorMode) {
      setColorMode(savedColorMode);
      document.documentElement.classList.toggle('dark', savedColorMode === 'dark');
    }
  }, []);

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newColorMode);
    document.documentElement.classList.toggle('dark', newColorMode === 'dark');
    localStorage.setItem('theme', newColorMode);
    
    toast({
      title: newColorMode === 'dark' ? 'Koyu tema aktif' : 'Açık tema aktif',
      description: newColorMode === 'dark' ? 'Sayfa koyu temaya geçti' : 'Sayfa açık temaya geçti',
      duration: 2000,
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleColorMode}
      className="h-8 w-8 px-0 hover:bg-muted/50 transition-all duration-300 animate-fade-in"
      aria-label={colorMode === 'light' ? 'Koyu temaya geç' : 'Açık temaya geç'}
    >
      {colorMode === 'light' ? (
        <Moon className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
      )}
    </Button>
  );
};

export default ThemeToggle;
