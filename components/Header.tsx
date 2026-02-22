import React, { useState } from 'react';
import { Menu, X, Radio, Mic2, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Favs', href: '#favoritos', icon: <Heart size={14} className="text-urban-red" /> },
    { label: 'Lanzamientos', href: '#lanzamientos' },
    { label: 'Noticias', href: '#noticias' },
    { label: 'Playlist', href: '#ranking', isSpecial: true }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        
        <a 
          href="#inicio" 
          onClick={(e) => handleNavClick(e, '#inicio')}
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity cursor-pointer group"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-urban-gold rounded flex items-center justify-center text-black shadow-lg shadow-yellow-500/20 group-hover:scale-105 transition-transform">
            <Radio size={20} strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <h1 className="text-2xl md:text-3xl font-bold display-font tracking-tighter text-white">
              LA PERLA
            </h1>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-urban-gold block -mt-1">
              DIGITAL RADIO
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className={`flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest transition-colors relative group ${
                item.isSpecial 
                  ? 'text-[#1DB954] hover:text-[#1ed760]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                item.isSpecial ? 'bg-[#1DB954]' : 'bg-urban-red'
              }`}></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="mailto:prodnicoruiz@gmail.com?subject=Demo%20para%20La%20Perla%20Radio"
            className="hidden md:flex items-center gap-2 bg-zinc-100 text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-urban-gold transition-colors rounded-sm"
          >
            <Mic2 size={14} /> Enviar Demo
          </a>
          
          <button 
            className="md:hidden text-white hover:text-urban-gold"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4">
            {menuItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`py-3 text-lg font-bold uppercase tracking-widest border-b border-zinc-800 last:border-0 ${
                  item.isSpecial 
                    ? 'text-[#1DB954] hover:text-[#1ed760]' 
                    : 'text-zinc-300 hover:text-urban-gold'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};