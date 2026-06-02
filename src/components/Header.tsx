import { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: { id: ActiveTab; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'seksilembaga', label: 'Seksi & Lembaga' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'berita', label: 'Berita & Pengumuman' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  // Hamburger animation variants
  const topBarVariants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 6 }
  };
  const middleBarVariants = {
    closed: { opacity: 1, x: 0 },
    opened: { opacity: 0, x: -10 }
  };
  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -6 }
  };

  // Mobile menu items children stagger
  const mobileContainerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        height: { duration: 0.25, ease: 'easeOut' },
        opacity: { duration: 0.2, ease: 'linear' },
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.22, ease: 'easeIn' },
        opacity: { duration: 0.15, ease: 'linear' },
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.1 } }
  };

  return (
    <header 
      id="sticky-header-nav"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/85 shadow-md border-b border-blue-100/50 py-2.5 backdrop-blur-md'
          : 'bg-white border-b border-blue-50 py-4 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center transition-all duration-300">
          
          {/* Logo Section */}
          <div 
            id="header-logo-container"
            onClick={() => handleNavClick('beranda')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-blue-50/80 rounded-xl overflow-hidden border border-blue-100/80 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <img 
                src={getGoogleDriveImageUrl("https://drive.google.com/thumbnail?id=17G7evIeHShfqn7aSm7L1mfgjlb1hStya")} 
                alt="Logo RW 015" 
                className="w-full h-full object-contain p-1"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-lg text-slate-800 tracking-tight transition-colors group-hover:text-blue-600 duration-300">RW 015</span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-extrabold uppercase tracking-wider">Pesona Gading Cibitung</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center space-x-1 bg-slate-100/60 p-1.5 rounded-2xl border-0">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id || (item.id === 'berita' && activeTab === 'pengumuman');
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 select-none ${
                    isActive
                      ? 'text-blue-600 font-extrabold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeTabBackground" 
                      className="absolute inset-0 bg-white shadow-xs rounded-xl border border-blue-100"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div id="desktop-cta-actions" className="hidden lg:flex items-center space-x-3">
            <button
              id="header-btn-login-desktop"
              onClick={() => handleNavClick('layanan')}
              className="group flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5 duration-200" />
              <span>Login Mandiri</span>
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="lg:hidden flex items-center">
            <button
              id="header-mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 focus:outline-none focus:ring-4 focus:ring-blue-100/50 transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center">
                <motion.span 
                  className="w-5 h-0.5 bg-slate-700 rounded-full origin-left" 
                  animate={isOpen ? "opened" : "closed"} 
                  variants={topBarVariants}
                  transition={{ duration: 0.2 }}
                />
                <motion.span 
                  className="w-5 h-0.5 bg-slate-700 rounded-full" 
                  animate={isOpen ? "opened" : "closed"} 
                  variants={middleBarVariants}
                  transition={{ duration: 0.15 }}
                />
                <motion.span 
                  className="w-5 h-0.5 bg-slate-700 rounded-full origin-left" 
                  animate={isOpen ? "opened" : "closed"} 
                  variants={bottomBarVariants}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-drawer-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileContainerVariants}
            className="lg:hidden border-t border-blue-50 bg-white/95 backdrop-blur-md overflow-hidden absolute w-full left-0 right-0 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1.5 animate-duration-150">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id || (item.id === 'berita' && activeTab === 'pengumuman');
                return (
                  <motion.button
                    id={`mobile-nav-item-${item.id}`}
                    key={item.id}
                    variants={mobileItemVariants}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center w-full text-left px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/60 font-extrabold border-l-4 border-blue-600 pl-4'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
              
              <div className="pt-4 pb-2 border-t border-slate-100">
                <motion.button
                  id="header-btn-login-mobile"
                  variants={mobileItemVariants}
                  onClick={() => handleNavClick('layanan')}
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login Mandiri</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
