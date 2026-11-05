export const URBAN_USERNAMES = [
  "El Menor", "La Jefa", "FlowPereira", "DimeloKing", "BarrioFino", 
  "La 30 Presente", "Cuba City", "Dosquebradas Activo", "Matecaña_Real", 
  "SalsaYPerreo", "El Propio", "La Nena Fina", "DjWannabe", "Urbano_PEI",
  "Callejero Fino", "La Perla Gang", "Flow Violento", "El Patrón", "Reyes del Eje"
];

export const URBAN_COMMENTS = [
  "Soltaron los códigos con este tema! 🔥",
  "Ese tema de Felim está durísimo 💎",
  "Saludos desde Dosquebradas, sintonía total.",
  "¿Cuándo sale lo nuevo de Cris JP?",
  "La Perla en la casa, el sonido de la calle.",
  "Ese bajo retumba en todo el barrio 🔊",
  "Subile volumen que esto es un himno!",
  "Reportando sintonía desde Cuba 📍",
  "¿Quién más esperando el evento del 27?",
  "Esa mezcla quedó criminal DJ!",
  "Merece replay esa canción.",
  "El flow de Pereira no tiene competencia.",
  "Dímelo, soltá el tema de Esteban ZG!",
  "Activos 24/7 con La Perla.",
  "Ese beat está muy agresivo 👺",
  "Bendiciones mi gente, buena música.",
  "Aquí no paramos de perrear hasta el amanecer."
];

export const getRandomComment = () => {
  const user = URBAN_USERNAMES[Math.floor(Math.random() * URBAN_USERNAMES.length)];
  const text = URBAN_COMMENTS[Math.floor(Math.random() * URBAN_COMMENTS.length)];
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-zinc-700'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return { user, text, color };
};