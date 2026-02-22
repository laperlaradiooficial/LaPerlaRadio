

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl?: string; // URL del archivo mp3
  duration?: string;
  releaseDate?: string;
  platformLinks?: {
    spotify?: string;
    youtube?: string;
  };
  tracks?: Song[]; // Para Álbumes o EPs que contienen múltiples canciones
  isHidden?: boolean; // Para canciones que son parte de un álbum y no deben salir sueltas en el grid
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: 'LOCAL' | 'NACIONAL' | 'EVENTO';
  date: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isBot?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
  likes: number;
  isVerified?: boolean; // Para administradores o artistas
  avatarColor?: string;
}

export enum StreamStatus {
  OFFLINE = 'OFFLINE',
  LIVE = 'EN VIVO',
  BUFFERING = 'CARGANDO'
}

// Extender la interfaz Window para Google Adsense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}