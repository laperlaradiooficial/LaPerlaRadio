# Guía: Ventana Expandida de Reproducción

## ¿Qué se implementó?

Se agregó una **ventana modal de reproducción expandida** similar a Spotify, accesible haciendo clic en la portada o información de la canción en el reproductor inferior.

## Características

### Desktop (1024px+)
- **Lado izquierdo (50% ancho):** 
  - Portada grande con animación de rotación
  - Título y artista prominentes
  - Barra de progreso interactiva
  - Controles principales (play, pause, siguiente, anterior)
  - Botón de favoritos (corazón animado)
  - Control de volumen con slider

- **Lado derecho (50% ancho):**
  - **Cola de reproducción completa**
  - Drag and drop para reordenar canciones
  - Indicador visual de canción actual
  - Scroll automático a canción actual

### Mobile (< 1024px)
- **Pantalla completa con:**
  - Portada grande centrada
  - Todos los controles
  - Cola de reproducción en **bottom sheet** (deslizable)
  - Optimizado para dedo/touch

## Cómo usar

### Abrir la ventana expandida
1. **Haz clic en la portada** del reproductor inferior
2. **O haz clic en el nombre de la canción/artista**

### Funcionalidades en la ventana expandida

#### Reproducción
- **Play/Pause:** Botón rojo grande en el centro
- **Siguiente/Anterior:** Botones a los lados del play
- **Tiempo:**
  - Barra interactiva para avanzar/retroceder
  - Muestra tiempo actual y duración

#### Cola de reproducción (Desktop)
- **Click en una canción:** Reproducer esa canción
- **Drag and drop:** Reordena el orden de reproducción
- Icono de basura: Elimina canción de la cola (hover)

#### Cola de reproducción (Mobile)
- **Bottom sheet expandible**
- Muestra próximas canciones en orden
- Click para saltar a una canción

#### Favoritos
- **Corazón:** Click para agregar/quitar de "Mi Perla Mix"
- Animación y glow effect cuando está agregado

#### Volumen
- **Icono de volumen:** Click para muticar/desmuticar
- **Slider:** Ajusta el nivel de volumen (móvil también tiene control)
- Muestra porcentaje actual

#### Shuffle
- **Botón shuffle:** Activa reproducción aleatoria
- Se resalta en dorado cuando está activo

### Cerrar la ventana
- **Click en X** (esquina superior derecha)
- **Anywhere outside** the modal se cierra

## Detalles Técnicos

### Componentes nuevos
- `ExpandedPlayer.tsx` - Modal principal de reproducción

### Cambios en componentes existentes
- **App.tsx:**
  - Nuevo estado `isExpandedPlayerOpen`
  - Estados para `currentTime`, `duration`, `status`, `volume`, `isMuted`
  - Callbacks para actualizar estos valores

- **Player.tsx:**
  - Props nuevas para callbacks de estado
  - Portada clickeable
  - Sincronización de seek con ExpandedPlayer

### Sincronización de datos
- El `currentTime` y `duration` se sincronizan desde el audio player
- El seek desde ExpandedPlayer se propaga al reproductor real
- Volume control es bidireccional

## Responsive Design

### Breakpoints
- **Mobile:** < 768px
  - Vista full-screen
  - Cola en bottom sheet
  - Controles optimizados para táctil

- **Tablet:** 768px - 1024px  
  - Layout intermedio
  - Cola a un lado pequeño

- **Desktop:** > 1024px
  - Split 50/50 (portada y cola)
  - Completo drag/drop support
  - Todos los controles visibles

## Notas

- La reproducción y el estado de audio se comparten entre el reproductor inferior y la ventana expandida
- Los cambios en la cola se reflejan en tiempo real
- El historial de reproducción se mantiene consistente
- Compatible con Media Session API para controles del sistema

