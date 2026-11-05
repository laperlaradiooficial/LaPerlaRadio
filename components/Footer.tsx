import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Mail, MapPin, Eye, Activity, BarChart3, X } from 'lucide-react';

const LEGAL_DOCUMENTS = [
  {
    title: 'Términos de uso',
    sections: [
      {
        heading: 'Responsable y aceptación',
        body: 'Este sitio es operado por Nicolás Ruiz bajo el nombre La Perla Radio, desde Pereira, Colombia. Al navegar o usar sus funciones aceptas estos términos y las normas aplicables en Colombia. Si no estás de acuerdo, deja de usar el sitio.'
      },
      {
        heading: 'Uso del sitio y la música',
        body: 'La Perla Radio ofrece información, contenidos musicales y herramientas de interacción con fines de difusión y entretenimiento. El acceso puede cambiar, interrumpirse o limitarse por mantenimiento, seguridad o disponibilidad de servicios de terceros. Salvo autorización expresa, no descargues, copies, retransmitas, comercialices ni reutilices música, imágenes, marcas u otros contenidos del sitio.'
      },
      {
        heading: 'Comentarios y conducta',
        body: 'Al participar en comentarios o chat, usa un nombre y contenido que puedas compartir públicamente. No publiques datos personales o sensibles tuyos o de otras personas, contenido ilegal, amenazas, acoso, spam ni material que infrinja derechos. Eres responsable de tus aportes. Podemos ocultar o retirar contenido y limitar el acceso cuando sea necesario para proteger a las personas, el servicio o derechos de terceros.'
      },
      {
        heading: 'Contenido aportado por usuarios',
        body: 'Conservas los derechos sobre tus aportes. Al publicarlos, autorizas a La Perla Radio, de forma no exclusiva y limitada a operar el servicio, a alojarlos, reproducirlos y mostrarlos en el sitio, así como a moderarlos o retirarlos. Esta autorización no transfiere la titularidad ni permite usos ajenos a esas funciones.'
      },
      {
        heading: 'Servicios de terceros y responsabilidad',
        body: 'El sitio integra o enlaza servicios de terceros, como Google/Firebase, Google Gemini, Cloudinary e Instagram, sujetos a sus propios términos y políticas. La Perla Radio no controla su disponibilidad ni sus prácticas. Estos términos no limitan derechos irrenunciables reconocidos por la ley.'
      },
      {
        heading: 'Ley aplicable',
        body: 'Estos términos se interpretan conforme a las leyes de Colombia, sin perjuicio de las normas imperativas que protejan a cada usuario. Para consultas o reportes, escribe a laperlaradiooficial@gmail.com.'
      }
    ]
  },
  {
    title: 'Privacidad',
    sections: [
      {
        heading: 'Responsable y contacto',
        body: 'El responsable del tratamiento es Nicolás Ruiz (La Perla Radio), con operación en Pereira, Colombia. Puedes presentar consultas o solicitudes sobre tus datos en laperlaradiooficial@gmail.com.'
      },
      {
        heading: 'Datos y finalidades',
        body: 'Al comentar se recopilan el nombre que ingresas, el texto del comentario y datos técnicos del registro (por ejemplo, fecha y reacciones); los comentarios se muestran públicamente y se almacenan en Firebase/Firestore. El nombre elegido se guarda en el almacenamiento local de tu navegador para recordarlo. El chat requiere inicio de sesión con Google; Google/Firebase puede tratar los datos de cuenta que autorices, como nombre y correo. Los mensajes del chat se muestran durante la sesión y, si está habilitada la respuesta con IA, el mensaje y parte del contexto reciente se envían a Google Gemini para generar la respuesta. No ingreses información sensible. Las preferencias de favoritos y el contador de visitas se guardan en el almacenamiento local del navegador.'
      },
      {
        heading: 'Usos y proveedores',
        body: 'Tratamos estos datos para prestar las funciones que solicitas, mostrar y moderar participaciones, recordar preferencias, mantener la seguridad y atender solicitudes. Firebase/Google presta autenticación y almacenamiento; Gemini puede procesar el texto remitido para generar respuestas. Los archivos multimedia se sirven desde Cloudinary y los enlaces externos pueden llevarte a otros proveedores. Estos proveedores pueden tratar datos técnicos conforme a sus políticas y desde otros países.'
      },
      {
        heading: 'Conservación y derechos',
        body: 'Conservamos los datos solo durante el tiempo necesario para los fines descritos, atender obligaciones legales y gestionar solicitudes de eliminación. Conforme a la Ley 1581 de 2012 y su reglamentación, puedes solicitar conocer, actualizar o rectificar tus datos; pedir prueba de la autorización cuando corresponda; conocer su uso; presentar reclamos ante el responsable y, una vez agotado el trámite legal, ante la Superintendencia de Industria y Comercio; y solicitar revocatoria o supresión cuando sea procedente. Escribe al correo de contacto e indica el dato o contenido y la solicitud. No envíes contraseñas ni documentos sensibles por correo.'
      },
      {
        heading: 'Base legal y actualización',
        body: 'El tratamiento se rige, entre otras normas aplicables, por la Ley 1581 de 2012 y el Decreto 1074 de 2015. Esta información describe las funciones actuales del sitio; no reemplaza los avisos y autorizaciones que deban presentarse en el momento de recopilar datos, ni asesoría jurídica. Si cambian las funciones o proveedores, esta política se actualizará.'
      }
    ]
  },
  {
    title: 'Cookies y almacenamiento',
    sections: [
      {
        heading: 'Tecnologías usadas',
        body: 'La versión actual del sitio utiliza almacenamiento local del navegador (localStorage) para recordar favoritos, el nombre usado en comentarios y el contador local de visitas. Firebase Authentication puede usar tecnologías de almacenamiento para mantener la sesión de Google. Aunque el sitio no instala intencionalmente cookies propias de publicidad o medición de audiencia, Google/Firebase y otros servicios externos pueden usar cookies o tecnologías similares al iniciar sesión o cargar sus servicios.'
      },
      {
        heading: 'Control',
        body: 'Puedes borrar o bloquear cookies y almacenamiento desde la configuración de tu navegador. Al hacerlo, algunas funciones, como recordar favoritos o mantener la sesión, podrían dejar de funcionar. Para más información sobre tecnologías de terceros, consulta las políticas de Google/Firebase y de cada servicio externo. Esta política debe revisarse si se incorporan herramientas de analítica, publicidad o nuevas cookies.'
      }
    ]
  },
  {
    title: 'Licencias y derechos',
    sections: [
      {
        heading: 'Obras musicales y material de terceros',
        body: 'Los derechos sobre canciones, grabaciones, portadas, fotografías, nombres artísticos y marcas pertenecen a sus respectivos titulares. Su presencia en La Perla Radio no transfiere esos derechos ni concede permiso para descargarlos, copiarlos, distribuirlos, retransmitirlos o usarlos comercialmente. El uso del material por el sitio debe contar con la autorización o fundamento jurídico aplicable; esta página no sustituye la verificación de esos permisos.'
      },
      {
        heading: 'Software y recursos',
        body: 'La identidad visual y los elementos propios de La Perla Radio no pueden reutilizarse sin autorización. Las bibliotecas de software y recursos de terceros se rigen por sus respectivas licencias y avisos. Los enlaces a servicios externos se ofrecen para facilitar el acceso y no implican que La Perla Radio sea titular de esos servicios.'
      },
      {
        heading: 'Reportes de derechos',
        body: 'Si eres titular o representante y consideras que un contenido vulnera tus derechos, escribe a laperlaradiooficial@gmail.com con la URL del material, una descripción de la obra, tus datos de contacto y evidencia razonable de titularidad o representación. Revisaremos el reporte y podremos restringir o retirar el material mientras verificamos la autorización. No uses este canal para reclamaciones falsas.'
      },
      {
        heading: 'Marco de referencia',
        body: 'Los derechos de autor y conexos se rigen, entre otras normas aplicables en Colombia, por la Ley 23 de 1982 y la Decisión Andina 351 de 1993. La disponibilidad de una obra en internet no equivale por sí sola a una licencia de reutilización.'
      }
    ]
  }
];

export const Footer: React.FC = () => {
  const [viewCount, setViewCount] = useState<string>("24,500");
  const [liveListeners, setLiveListeners] = useState<number>(1240);
  const [activeLegalDocument, setActiveLegalDocument] = useState<(typeof LEGAL_DOCUMENTS)[number] | null>(null);
  const closeLegalButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!activeLegalDocument) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeLegalButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveLegalDocument(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLegalDocument]);

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
      {activeLegalDocument && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveLegalDocument(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-dialog-title"
            className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4 sm:px-7">
              <div>
                <h2 id="legal-dialog-title" className="text-xl font-bold text-white sm:text-2xl">
                  {activeLegalDocument.title}
                </h2>
                <p className="mt-1 text-xs text-zinc-500">La Perla Radio · Pereira, Colombia · Actualizado el 5 de noviembre de 2026</p>
              </div>
              <button
                ref={closeLegalButtonRef}
                type="button"
                onClick={() => setActiveLegalDocument(null)}
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                aria-label="Cerrar documento legal"
              >
                <X size={20} />
              </button>
            </header>
            <div className="overflow-y-auto px-5 py-6 sm:px-7">
              <div className="space-y-6">
                {activeLegalDocument.sections.map((section) => (
                  <section key={section.heading}>
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-urban-gold">{section.heading}</h3>
                    <p className="text-sm leading-6 text-zinc-300">{section.body}</p>
                  </section>
                ))}
              </div>
              <p className="mt-8 border-t border-zinc-800 pt-4 text-xs leading-5 text-zinc-500">
                Para consultas, solicitudes de datos o reportes: <a className="text-urban-gold hover:underline" href="mailto:laperlaradiooficial@gmail.com">laperlaradiooficial@gmail.com</a>.
              </p>
            </div>
          </section>
        </div>
      )}
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

            <a
              href="https://www.instagram.com/laperlaradio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="La Perla Radio en Instagram"
              className="group inline-flex items-center gap-3 mb-8 px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-pink-500/50 hover:bg-gradient-to-r hover:from-purple-900/30 hover:via-pink-900/30 hover:to-orange-900/30 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 shadow-lg shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-shadow">
                <Instagram size={16} className="text-white" strokeWidth={2} />
              </div>
              <div className="leading-none">
                <p className="text-white text-xs font-bold tracking-widest uppercase">@laperlaradio</p>
                <p className="text-zinc-500 text-[10px] mt-0.5 tracking-wide">Síguenos en Instagram</p>
              </div>
            </a>

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
              {LEGAL_DOCUMENTS.map((document) => (
                <li key={document.title}>
                  <button
                    type="button"
                    onClick={() => setActiveLegalDocument(document)}
                    className="text-left hover:text-white transition-colors"
                  >
                    {document.title === 'Cookies y almacenamiento' ? 'Cookies' : document.title}
                  </button>
                </li>
              ))}
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
                <a href="mailto:laperlaradiooficial@gmail.com" className="hover:text-white transition-colors">
                  laperlaradiooficial@gmail.com
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
          <p>© 2026 La Perla Radio. Todos los derechos reservados.</p>
          <p>Designed with <span className="text-urban-red">♥</span> for the streets.</p>
        </div>
      </div>
    </footer>
  );
};