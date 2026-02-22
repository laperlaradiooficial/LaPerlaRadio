import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Eye, Activity, BarChart3 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [viewCount, setViewCount] = useState<string>("24,500");
  const [liveListeners, setLiveListeners] = useState<number>(1240);

  useEffect(() => {
    // Logic for View Counter (Persistent in LocalStorage)
    const storedViews = localStorage.getItem('laperla_views');
    let currentViews = storedViews ? parseInt(storedViews, 10) : 24500;
    
    // Increment visit
    currentViews++;
    localStorage.setItem('laperla_views', currentViews.toString());
    
    // Format for display
    setViewCount(currentViews.toLocaleString('es-CO'));

    // Logic for Fake Live Listeners (Fluctuating)
    const interval = setInterval(() => {
      setLiveListeners(prev => {
        // Random fluctuation between -3 and +4
        const change = Math.floor(Math.random() * 8) - 3;
        const newVal = prev + change;
        return newVal > 1000 ? newVal : 1000; // Keep it above 1000
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Evita que la página se recargue y se pare la música
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Lanzamientos', href: '#lanzamientos' },
    { label: 'Noticias', href: '#noticias' },
    { label: 'Eventos', href: '#noticias' },
    { label: 'Contacto', href: '#footer' }
  ];

  return (
    <footer id="footer" className="bg-black border-t border-zinc-900 pb-24 md:pb-8 pt-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             <h2 className="text-3xl font-bold display-font tracking-tighter text-white mb-4">
              LA PERLA <span className="text-urban-gold">RADIO</span>
            </h2>
            
            <p className="text-zinc-500 text-sm leading-relaxed mb-4">
              Desde Pereira, La Perla más brillante, cuna de talentos para todo el mundo.
            </p>

            {/* Bandera de Pereira CSS Animada */}
            <div className="flex items-center gap-3 mb-6 group cursor-default">
               <div className="relative w-14 h-9 shadow-2xl border border-white/5 overflow-hidden rounded-[2px] animate-flag-flap origin-left">
                  {/* Base Layer */}
                  <div className="absolute inset-0 bg-white"></div>
                  
                  {/* Diagonal Split: Yellow Top-Left, Red Bottom-Right */}
                  <div className="absolute top-0 left-0 w-full h-full" 
                       style={{ background: 'linear-gradient(135deg, #fbbf24 50%, #ef4444 50%)' }}>
                  </div>

                  {/* Shine effect moving across */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-flag-shine"></div>
                  
                  {/* Shadow folds */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/10 via-transparent to-black/10 opacity-30"></div>
               </div>
               <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase group-hover:text-urban-gold transition-colors">Pereira, Colombia</span>
            </div>

            <div className="flex gap-4 mb-8">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-urban-gold hover:bg-zinc-800 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Stats Decoration Box */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 backdrop-blur-sm shadow-inner">
               <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                 <div className="flex items-center gap-2 text-zinc-400">
                    <Activity size={14} className="text-urban-red animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest">En Línea</span>
                 </div>
                 <span className="text-urban-red font-mono font-bold">{liveListeners}</span>
               </div>
               
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2 text-zinc-400">
                    <Eye size={14} className="text-urban-gold" />
                    <span className="text-xs font-bold uppercase tracking-widest">Visitas</span>
                 </div>
                 <span className="text-white font-mono font-bold">{viewCount}</span>
               </div>
            </div>

          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Secciones</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-urban-red transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Legal</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Términos de uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Licencias</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contacto</h3>
             <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-urban-gold" />
                Pereira
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-urban-gold" />
                <a href="mailto:prodnicoruiz@gmail.com" className="hover:text-white transition-colors">
                  prodnicoruiz@gmail.com
                </a>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-zinc-900">
               <div className="flex items-center gap-2 text-zinc-600 text-xs">
                  <BarChart3 size={12} />
                  <span>Estadísticas en tiempo real</span>
               </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© 2024 La Perla Radio. Todos los derechos reservados.</p>
          <p>Designed with <span className="text-urban-red">♥</span> for the streets.</p>
        </div>
      </div>
    </footer>
  );
};