
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Store, Palette, LayoutDashboard } from "lucide-react";
import UserMenu from "@/components/UserMenu";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateStore = () => {
    navigate('/dashboard/store');
    toast({
      title: "Mağaza Sayfası",
      description: "Mağazanızı yönetebilirsiniz.",
    });
  };

  const handleNavigateTheme = () => {
    navigate('/dashboard/theme-customization');
    toast({
      title: "Tema Özelleştirme",
      description: "Mağazanızın temasını özelleştirebilirsiniz.",
    });
  };
  
  const handleNavigateDashboard = () => {
    navigate('/dashboard');
    toast({
      title: "Dashboard",
      description: "Dashboard sayfasına yönlendirildiniz.",
    });
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold gradient-text">E-Paket</Link>
          </div>

          {/* Desktop Navigation - Enhanced with NavigationMenu */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <a href="#features" className="text-gray-600 hover:text-brand-purple transition-colors px-3 py-2">
                    Özellikler
                  </a>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a href="#pricing" className="text-gray-600 hover:text-brand-purple transition-colors px-3 py-2">
                    Fiyatlandırma
                  </a>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a href="#themes" className="text-gray-600 hover:text-brand-purple transition-colors px-3 py-2">
                    Temalar
                  </a>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a href="#contact" className="text-gray-600 hover:text-brand-purple transition-colors px-3 py-2">
                    İletişim
                  </a>
                </NavigationMenuItem>
                
                {user && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Mağazam</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[220px] p-2">
                        <div className="grid gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleNavigateDashboard}
                            className="flex items-center justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50 w-full"
                          >
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            <span>Dashboard</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleNavigateStore}
                            className="flex items-center justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50 w-full"
                          >
                            <Store className="h-4 w-4 mr-2" />
                            <span>Mağazam</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleNavigateTheme}
                            className="flex items-center justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50 w-full"
                          >
                            <Palette className="h-4 w-4 mr-2" />
                            <span>Temam</span>
                          </Button>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex">
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <motion.div variants={menuItemVariants} initial="hidden" animate="visible">
                <a 
                  href="#features" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Özellikler
                </a>
              </motion.div>
              <motion.div variants={menuItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                <a 
                  href="#pricing" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fiyatlandırma
                </a>
              </motion.div>
              <motion.div variants={menuItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <a 
                  href="#themes" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Temalar
                </a>
              </motion.div>
              <motion.div variants={menuItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                <a 
                  href="#contact" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  İletişim
                </a>
              </motion.div>
              
              {user && (
                <>
                  <motion.div variants={menuItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        handleNavigateDashboard();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </motion.div>
                  <motion.div variants={menuItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        handleNavigateStore();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
                    >
                      <Store className="h-4 w-4 mr-2" />
                      Mağazam
                    </Button>
                  </motion.div>
                  <motion.div variants={menuItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        handleNavigateTheme();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
                    >
                      <Palette className="h-4 w-4 mr-2" />
                      Temam
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
            
            <motion.div 
              variants={menuItemVariants} 
              initial="hidden" 
              animate="visible" 
              transition={{ delay: 0.7 }}
              className="pt-4 pb-3 border-t border-gray-200"
            >
              <div className="flex items-center px-5 space-x-3">
                <UserMenu />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
