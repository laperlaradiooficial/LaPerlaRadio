import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Radio } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateDJResponse } from '../services/geminiService';

export const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'DJ Perla', text: '¡Bienvenidos a la transmisión! ¿Qué quieren escuchar?', timestamp: new Date(), isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'Oyente_' + Math.floor(Math.random() * 1000),
      text: input,
      timestamp: new Date(),
      isBot: false
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsSending(true);

    // Context for AI (last 5 messages)
    const context = messages.slice(-5).map(m => `${m.user}: ${m.text}`);

    // AI Response delay simulation
    setTimeout(async () => {
      const responseText = await generateDJResponse(newUserMsg.text, context);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        user: 'DJ Perla',
        text: responseText,
        timestamp: new Date(),
        isBot: true
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsSending(false);
    }, 1000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-urban-red animate-pulse"></div>
          <h3 className="text-white font-bold display-font text-xl tracking-wide">CHAT EN VIVO</h3>
        </div>
        <span className="text-xs text-zinc-500 flex items-center gap-1">
          <User size={12} /> 1.2k en línea
        </span>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-black/50"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
            <div className={`flex items-end gap-2 max-w-[85%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.isBot ? 'bg-urban-gold text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                {msg.isBot ? <Radio size={16} /> : <User size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.isBot 
                  ? 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700' 
                  : 'bg-urban-gold/10 text-urban-gold border border-urban-gold/20 rounded-tr-none'
              }`}>
                <span className="block text-[10px] opacity-50 mb-1 font-bold tracking-wider uppercase">
                  {msg.user} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isSending && (
           <div className="flex items-start gap-2 max-w-[85%]">
             <div className="w-8 h-8 rounded-full bg-urban-gold text-black flex items-center justify-center shrink-0">
               <Radio size={16} />
             </div>
             <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none border border-zinc-700">
               <div className="flex gap-1">
                 <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200"></span>
               </div>
             </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Envía un mensaje a la cabina..."
          className="flex-1 bg-zinc-900 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-urban-gold border border-zinc-800 placeholder-zinc-600"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isSending}
          className="bg-urban-gold hover:bg-yellow-400 text-black p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};