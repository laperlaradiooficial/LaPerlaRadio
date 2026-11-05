import React, { useState, useEffect, useRef } from 'react';
import { Send, User, ThumbsUp, MessageSquare, Wifi, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Comment } from '../types';
import { db } from '../firebase'; // Importamos la conexión a la base de datos
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore';

export const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(1); 
  const [error, setError] = useState<{message: string, code?: string} | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Usamos ref al contenedor (div con overflow) en lugar de un elemento dummy al final
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      // Usamos scrollTo directamente en el contenedor para evitar mover toda la ventana
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  // 1. Conexión a Firebase en Tiempo Real
  useEffect(() => {
    // Referencia a la colección 'comments' en la base de datos
    const q = query(
      collection(db, "comments"),
      orderBy("timestamp", "asc"), // Ordenar por fecha
      limit(50) // Traer solo los últimos 50
    );

    // onSnapshot escucha cambios en vivo.
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setIsConnected(true);
      setError(null);
      const loadedComments: Comment[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loadedComments.push({
          id: doc.id,
          author: data.author,
          text: data.text,
          // Firestore guarda timestamp como objeto
          timestamp: data.timestamp?.toMillis ? data.timestamp.toMillis() : Date.now(),
          likes: data.likes || 0,
          isVerified: data.isVerified || false,
          avatarColor: data.avatarColor || 'bg-zinc-700'
        });
      });
      setComments(loadedComments);
    }, (err: any) => {
      console.error("Error conectando a Firebase:", err);
      setIsConnected(false);
      
      if (err.code === 'permission-denied') {
        setError({
            message: "Permiso denegado: Ve a Firebase Console -> Firestore -> Reglas y permite lectura/escritura (allow read, write: if true;)",
            code: 'permission-denied'
        });
      } else {
        setError({ message: "Error de conexión. Verifica tu internet o credenciales." });
      }
    });

    // Recuperar nombre de usuario local
    const savedName = localStorage.getItem('laperla_username');
    if (savedName) setAuthorName(savedName);

    // Simulación simple de usuarios fluctuando para ambiente
    const interval = setInterval(() => {
        setOnlineUsers(Math.floor(Math.random() * (150 - 80) + 80)); 
    }, 5000);

    return () => {
        unsubscribe();
        clearInterval(interval);
    }
  }, []);

  // Auto-scroll cuando llegan comentarios
  useEffect(() => {
    scrollToBottom();
  }, [comments.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    localStorage.setItem('laperla_username', authorName);
    
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
    const colorIndex = authorName.length % colors.length;
    const userColor = colors[colorIndex];

    try {
      await addDoc(collection(db, "comments"), {
        author: authorName,
        text: newComment,
        timestamp: serverTimestamp(),
        likes: 0,
        avatarColor: userColor,
        isVerified: false
      });
      setNewComment('');
      // Forzar un pequeño scroll al enviar para asegurar visibilidad
      setTimeout(scrollToBottom, 100);
    } catch (err: any) {
      console.error("Error enviando mensaje", err);
      if (err.code === 'permission-denied') {
         alert("Error: No tienes permisos para escribir. Revisa las Reglas de Firebase.");
      } else {
         alert("No se pudo enviar el mensaje.");
      }
    }
  };

  const handleLike = async (id: string) => {
    const commentRef = doc(db, "comments", id);
    try {
        await updateDoc(commentRef, { likes: increment(1) });
    } catch (err) {
        console.error("Error dando like", err);
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'ahora';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return '1d';
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
      
      {/* Header */}
      <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-urban-gold" size={20} />
          <div>
            <h3 className="text-white font-bold display-font text-xl tracking-wide leading-none">CHAT GLOBAL</h3>
            <div className="flex items-center gap-1.5 mt-1">
               <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </span>
               <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                 {onlineUsers} usuarios en línea
               </span>
            </div>
          </div>
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded border flex items-center gap-1 transition-colors ${isConnected ? 'text-green-500 border-green-900/30 bg-green-900/10' : 'text-red-500 border-red-900/30 bg-red-900/10'}`}>
          <Wifi size={10} />
          {isConnected ? 'Online' : 'Offline'}
        </div>
      </div>

      {/* Error Message Critico */}
      {error && (
        <div className="bg-red-900/80 p-3 text-xs text-white text-center flex flex-col items-center justify-center gap-2 border-b border-red-500/30">
            <div className="flex items-center gap-2 font-bold">
                <ShieldAlert size={16} /> ERROR DE CONFIGURACIÓN
            </div>
            <p className="opacity-90 max-w-[90%]">{error.message}</p>
        </div>
      )}

      {/* Comments List */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-hide bg-gradient-to-b from-black/40 to-black/10"
      >
        {comments.map((comment) => (
          <div key={comment.id} className="group animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex gap-3">
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-white text-xs shadow-lg ring-2 ring-black ${comment.avatarColor || 'bg-zinc-700'}`}>
                {comment.author.substring(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-bold text-sm truncate ${comment.isVerified ? 'text-urban-gold' : 'text-zinc-200'}`}>
                    {comment.author}
                  </span>
                  {comment.isVerified && (
                    <span className="bg-urban-gold/20 text-urban-gold text-[9px] px-1 rounded-[2px] border border-urban-gold/30 font-bold flex items-center h-4">ARTISTA</span>
                  )}
                  <span className="text-[10px] text-zinc-600 flex items-center gap-1 ml-auto shrink-0">
                    {getTimeAgo(comment.timestamp)}
                  </span>
                </div>
                
                <div className="relative group/msg">
                   <p className="text-zinc-300 text-sm leading-relaxed break-words bg-zinc-800 p-2.5 rounded-lg rounded-tl-none border border-zinc-700/50 shadow-sm">
                    {comment.text}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="absolute -bottom-5 right-0 flex items-center gap-3 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                     <button 
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1 text-zinc-500 hover:text-urban-gold text-[10px] transition-colors bg-zinc-900 px-1.5 py-0.5 rounded-full border border-zinc-800"
                    >
                      <ThumbsUp size={10} />
                      <span>{comment.likes > 0 ? comment.likes : ''}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
        
        {comments.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
                <MessageSquare size={32} className="mb-2 text-zinc-600" />
                <p className="text-sm text-zinc-500 font-bold">Chat vacío</p>
                <p className="text-xs text-zinc-600">Sé el primero en escribir</p>
            </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-zinc-950 border-t border-zinc-800">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* User ID Section */}
          <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800">
             <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                <User size={12} />
             </div>
             <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Tu A.K.A (Nombre)"
                className="flex-1 bg-transparent text-white text-xs focus:outline-none font-bold placeholder-zinc-600"
                required
              />
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comenta algo..."
              disabled={!!error}
              className="flex-1 bg-zinc-900 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-urban-gold border border-zinc-800 placeholder-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
            <button 
              type="submit" 
              disabled={!!error}
              className="bg-urban-gold hover:bg-yellow-400 text-black px-4 rounded-lg transition-colors font-bold shadow-lg shadow-yellow-500/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};