# DESIGN.md — Lorekeeper UI System: Codex Lithographica (Future Medieval)

> **Source of Truth** para el sistema de diseño de Lorekeeper.  
> Combina la solemnidad de los frontispicios litográficos renacentistas (*The Green Knight*, especímenes de *Deondor* y *Runsholy*) con la precisión analítica y tipográfica de un códice medieval asistido por terminal (*Newsreader* + *IBM Plex Mono*).

---

## 1. Principios de Diseño

1. **Light-First / Codex Pergamino:** Fondo marfil litográfico cálido (`--surface: #fcf9f3`) que emula papel impreso con textura tenue (2–4%), huyendo deliberadamente del "gris dashboard corporativo".
2. **Trilogía Tipográfica Canónica:**
   - **Display / Monumental:** *Cinzel Decorative* / *Bodoni Moda* con tracking ceremonial y serifas afiladas incisas para frontispicios, títulos de campaña y encabezados principales.
   - **Editorial / Prosa:** *Newsreader* para respuestas del oráculo, transcripciones y notas de mesa. Alta legibilidad literaria.
   - **Datos / Máquina:** *IBM Plex Mono* para metadatos, números de línea (`L. 84`), referencias de folio (`Fol. 14v`, `§ 14.B`), insignias y comandos de terminal.
3. **Color Semántico Litográfico:** 
   - El estado positivo o veredicto afirmativo utiliza **Pimentón / Bermellón Terracota** (`#dd4124`), no verde de dashboard SaaS.
   - Púrpura/azul litográfico antiguo (`#23395d` o tintas ferrogálicas) y ocres dorados para ornatos y distinciones secundarias.
4. **Marginalia y Foliación:** La información contextual vive en los márgenes exteriores (foliación, referencias cruzadas, glifos xilográficos) respetando el ritmo de un incunable.

---

## 2. Design Tokens (CSS Variables)

```css
:root {
  /* =========================================
     Color Primitives (--color-*)
     ========================================= */
  --color-parchment-base: #fcf9f3;
  --color-parchment-subtle: #f6f3ed;
  --color-parchment-dim: #ede9e1;
  --color-parchment-dark: #dcdad4;

  --color-ink-primary: #191c1b;
  --color-ink-secondary: #424745;
  --color-ink-tertiary: #717876;
  --color-ink-border: #d4d0c7;

  --color-pimenton: #dd4124;
  --color-pimenton-deep: #b33018;
  --color-pimenton-light: #fbeee9;
  --color-pimenton-border: rgba(221, 65, 36, 0.35);

  --color-gold-halo: #c8963e;
  --color-iron-blue: #23395d;

  /* =========================================
     Semantic Tokens
     ========================================= */
  --surface: var(--color-parchment-base);
  --surface-dim: var(--color-parchment-subtle);
  --surface-raised: #ffffff;
  --surface-sunken: var(--color-parchment-dim);
  --surface-accent-tint: var(--color-pimenton-light);

  --text-primary: var(--color-ink-primary);
  --text-secondary: var(--color-ink-secondary);
  --text-muted: var(--color-ink-tertiary);
  --text-accent: var(--color-pimenton);
  --text-on-accent: #ffffff;

  --border-muted: rgba(25, 28, 27, 0.14);
  --border-strong: rgba(25, 28, 27, 0.35);
  --border-accent: var(--color-pimenton-border);

  --state-canonical: var(--color-pimenton);
  --state-hidden: #b45309; /* Ámbar oscuro para secretos/asimetría */
  --state-boundary: #717876; /* Gris neutro para límites de evidencia */

  /* Dither & Texture */
  --paper-grain-opacity: 0.035;
  --dither-illustration-color: var(--color-pimenton);

  /* Motion */
  --duration-fast: 120ms;
  --duration-normal: 240ms;
  --duration-slow: 400ms;
}
```

---

## 3. Configuración para Tailwind CSS (`tailwind.config.js`)

Referencia de mapeo de paleta, tipografías y sombras. Antes del scaffold, verificar y adaptar su sintaxis a la versión de Tailwind elegida, conservando los tokens y la dirección visual. Este ejemplo no fija una versión ni exige implementar modo oscuro:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#ffffff',
          100: '#fcf9f3', // Base surface
          200: '#f6f3ed', // Subtle container
          300: '#ede9e1', // Dim/sunken
          400: '#dcdad4',
          500: '#c5c2bb',
        },
        ink: {
          DEFAULT: '#191c1b',
          light: '#424745',
          muted: '#717876',
          border: '#d4d0c7',
        },
        pimenton: {
          DEFAULT: '#dd4124',
          hover: '#b33018',
          light: '#fbeee9',
          border: 'rgba(221, 65, 36, 0.35)',
        },
        iron: {
          blue: '#23395d',
        },
        halo: {
          gold: '#c8963e',
        }
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', '"Bodoni Moda"', 'Cinzel', 'serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        ceremonial: '0.22em',
        monumental: '0.35em',
        tightest: '-0.03em',
      },
      boxShadow: {
        'codex-card': '0 4px 20px -2px rgba(25, 28, 27, 0.05), 0 1px 3px 0 rgba(25, 28, 27, 0.03)',
        'codex-border': '0 0 0 1px rgba(25, 28, 27, 0.12)',
      },
      borderWidth: {
        'hairline': '0.75px',
      }
    },
  },
  plugins: [],
}
```

---

## 4. Patrones de Componentes (Component Tokens & Patterns)

### A. Frontispicio / Título Monumental
```html
<div class="text-center py-6 border-b border-ink/10">
  <div class="font-mono text-[10px] tracking-ceremonial text-pimenton uppercase">
    Folio 14R · Crónica Canónica
  </div>
  <h1 class="font-display text-4xl lg:text-5xl font-bold tracking-ceremonial uppercase text-ink mt-2">
    La Corona de Ceniza
  </h1>
  <div class="font-mono text-[9px] tracking-monumental text-ink-muted uppercase mt-2">
    ◆ Registro de Campaña · Anales de Valen ◆
  </div>
</div>
```

### B. Veredicto del Oráculo (Bloques condicionales según evidencia)
No es obligatorio mostrar los tres bloques en cada respuesta. Se muestran solo los que correspondan a la evidencia recuperada.

1. **Hecho Canónico (`border-l-2 border-pimenton`):** Solo hechos que las fuentes acrediten como ocurridos; una nota de preparación no basta. Resaltados de entidad clave en negrita y color `text-pimenton`.
2. **Asimetría en Mesa (`bg-amber-500/10 border-l-2 border-amber-600`):** Solo cuando las fuentes acrediten la diferencia entre conocimiento del DJ, jugadores o PJ. La ausencia de una mención no demuestra desconocimiento.
3. **Límite de Información (`bg-ink/5 border-l-2 border-ink-muted`):** Transparencia epistémica donde las notas no detallan el hecho sin inventar datos.

### C. Cápsula de Entrada y Búsqueda (Oráculo Input)
- Bordes limpios, tipografía *Newsreader* para la consulta humana, botón de acción en bloque pimentón pleno con tipografía monospace en mayúsculas:
```html
<button class="bg-pimenton hover:bg-pimenton-hover text-white font-mono text-xs uppercase tracking-ceremonial px-6 py-3 transition-colors">
  Buscar en Notas ⚲
</button>
```

### D. Citas y Atribución a Archivos
- Fichas en contenedor `bg-parchment-200 border border-ink/10 rounded-sm p-3`.
- Nombre de archivo: `font-mono text-xs text-pimenton font-semibold`.
- Fragmento citado: `font-serif text-xs italic text-ink-light`.
- Localizador: `font-mono text-[10px] text-ink-muted` (`L. 84`, `Fol. 14v`).


---

## 5. Evidencia y localizadores reales

- La presentación no determina canon ni conocimiento de los jugadores. Si el estado es desconocido, debe conservarse como tal. Las contradicciones no se convierten en un veredicto definitivo.
- Los ejemplos de campaña, folios y líneas de este documento son ilustrativos, no datos ni localizadores que deban generarse para decorar.
- Mostrar líneas, folios o secciones únicamente si existen en la fuente y se conserva una correspondencia verificable con el fragmento.
- Para Notion: página y encabezado, con enlace cuando esté disponible. Para Markdown: archivo, sección y líneas solo si se conservan. Para texto pegado: título y fragmento; no inventar paginación.
- Las citas abren el fragmento de la fuente de esa campaña. Si una fuente histórica no está disponible, indicarlo; nunca redirigir silenciosamente a otra versión o contenido sin explicarlo.

## 6. Arquitectura de información y estados

Se mantiene el [primer enfoque de workspace e ingesta](docs/12-workspace-and-ingestion-ux.md): selector/creación de campaña y secciones Chat / Fuentes. La estética de oráculo no incorpora funcionalidades nuevas ni cambia el alcance.

Cada flujo define inicial/vacío, carga, éxito, validación, error recuperable y deshabilitado/solo lectura cuando corresponda. Fuentes incluye progreso por documento, fallos parciales, reintento y actualización fallida con versión anterior disponible. El chat sin fuentes enlaza a ingesta; si hay fuentes disponibles puede consultarlas mientras otras se procesan. Los resultados tardíos de otra campaña no aparecen en la activa.

## 7. Responsive

- En escritorio, navegación/selector, contenido y referencias marginales mantienen una jerarquía clara sin competir por anchura.
- En móvil, la navegación puede plegarse pero el selector y Chat / Fuentes siguen accesibles. Referencias y marginalia pasan al flujo de lectura o a un panel accesible; ninguna evidencia queda disponible solo al pasar el ratón.
- Reorganizar filas de fuentes como tarjetas o filas adaptadas, conservando estado y acciones. Evitar desbordamiento horizontal de la página; el contenido que lo requiera dispone de desplazamiento localizado.
- Los títulos monumentales y su tracking se adaptan al espacio; no fuerzan cortes ni reducen el contenido funcional a texto diminuto. El compositor no tapa mensajes, citas o acciones al abrir el teclado.
- Concretar medidas, breakpoints y composición de cada pantalla antes de su slice; este documento fija prioridades y comportamiento.

## 8. Accesibilidad

- HTML semántico, encabezados ordenados, etiquetas y nombres accesibles para controles; navegación completa por teclado y foco visible.
- Gestionar foco en diálogos/paneles, devolverlo al control de origen al cerrar y evitar trampas de teclado. Asociar errores a sus campos.
- Anunciar cambios de estado de ingesta y respuesta de forma moderada, sin leer cada token o actualización irrelevante.
- Estado, canon, asimetría y errores utilizan texto y/o iconos además de color. La textura y marginalia decorativas no interfieren con lectura ni puntero y se excluyen del árbol accesible.
- Verificar contraste de texto, controles y foco en sus combinaciones reales. Los tokens son una base visual, no una garantía de contraste. Si una combinación falla, utilizar una variante de tinta con contraste suficiente y registrar el ajuste semántico sin reinterpretar la paleta.
- Los tamaños de 9–10 px de los ejemplos son referencias estilísticas, no mínimos obligatorios. Metadatos, citas y acciones deben ser legibles, permitir zoom/reflujo y disponer de objetivos táctiles cómodos.
- Respetar reducción de movimiento; no hacer depender ninguna información de animaciones. Mantener alternativas de fuente y lectura usable durante su carga.

## 9. Regla de implementación y decisiones pendientes

Antes de implementar una pantalla, revisar este documento, el flujo UX y la pantalla existente más cercana. Preparar y verificar una lista de campos, copy, estados, composición, tokens, componentes, responsive, teclado y movimiento.

La dirección Codex Lithographica y sus tokens quedan adoptados. Siguen pendientes por slice: componentes detallados, escalas de espaciado/tamaño, foco y estados de error, ajustes de contraste, estrategia de carga tipográfica y mapeo al tooling elegido. Light-first no exige modo oscuro en la PoC. La semántica de evidencia y los contratos se cierran según los bloqueos SDD del roadmap.
