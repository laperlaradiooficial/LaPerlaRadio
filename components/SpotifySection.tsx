import React from 'react';
import { ExternalLink, Music } from 'lucide-react';

export const SpotifySection: React.FC = () => {
  return (
    <section id="ranking" className="py-16 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute -left-20 top-0 w-64 h-64 bg-[#1DB954] opacity-5 blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[#1DB954] mb-2">
              <Music size={20} />
              <span className="font-bold tracking-widest text-xs uppercase">Curaduría Oficial</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white display-font tracking-tight leading-none">
              LA PERLA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] to-emerald-200">ON SPOTIFY</span>
            </h2>
            <p className="text-zinc-400 mt-4 max-w-xl text-lg">
              La selección más dura del Eje. Si suena en la calle, suena en nuestra lista oficial. 
              Dale play y lleva el flow a donde vayas.
            </p>
          </div>
          
          <a 
            href="https://open.spotify.com/playlist/4HxJFFZp1Zy2eq79F70gan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black px-6 py-3 font-bold uppercase tracking-widest rounded transition-all duration-300"
          >
            Abrir en App <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="w-full bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(29,185,84,0.1)] border border-zinc-800">
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/playlist/4HxJFFZp1Zy2eq79F70gan?utm_source=generator&theme=0" 
            width="100%" 
            height="450" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};