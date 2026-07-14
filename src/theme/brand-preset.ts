import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * Preset de marca del Backoffice de Notificaciones.
 *
 * Partimos del preset base "Aura" y sobrescribimos solo los tokens que
 * necesitamos. Todo lo que NO se declare aquí hereda de Aura.
 *
 * Paletas de color: cada color va del tono 50 (más claro) al 950 (más oscuro).
 * OJO: el Figma numera al revés (10=oscuro, 95=claro); aquí se invierte a la
 * convención de PrimeNG (50=claro, 950=oscuro).
 *
 * Documentación de uso: ver Contextos/theming-primeng.md
 */
export const BrandPreset = definePreset(Aura, {
  // ---- Paletas de color base ----
  primitive: {
    // Colores de marca del Figma (_colors → brand), guardados tal cual.
    // Son tonos puntuales; se referencian como {brand.01}, {brand.02}, etc.
    brand: {
      '01': '#005FFF', // Azul — acción principal (PRIMARIO)
      '02': '#59A80F', // Verde
      '03': '#F40034', // Rojo/carmín
      '04': '#F9B316', // Amarillo/ámbar
      '05': '#000000', // Negro
      '06': '#0672BE', // Azul medio
      '07': '#FF393B', // Rojo coral
      '08': '#FFD438', // Amarillo
      '09': '#129C4A', // Verde
    },

    // Escala "blue" del Figma (_colors → blue). Guardada como paleta aparte.
    // Ojo: el Figma numera al revés (10=oscuro, 95=claro); aquí se invierte a
    // la convención de PrimeNG (50=claro, 950=oscuro).
    blue: {
      50: '#E5F0F8', // blue-95
      100: '#CCE2F1', // blue-90
      200: '#99C5E3', // blue-80
      300: '#66A8D5', // blue-70
      400: '#338BC7', // blue-60
      500: '#006FB9', // blue-50
      600: '#015893', // blue-40
      700: '#00426F', // blue-30
      800: '#002C4A', // blue-20
      900: '#011524', // blue-10
      950: '#000A12', // extrapolado (más oscuro que blue-10)
    },

    // Escala "green" del Figma (_colors → green). Numeración invertida a
    // la convención de PrimeNG (50=claro, 950=oscuro).
    green: {
      50: '#E5F4EB', // green-95
      100: '#CCE9D7', // green-90
      200: '#99D4B0', // green-80
      300: '#66BF88', // green-70
      400: '#33AA61', // green-60
      500: '#00953A', // green-50
      600: '#00772E', // green-40
      700: '#005922', // green-30
      800: '#003B17', // green-20
      900: '#001D0B', // green-10
      950: '#000F05', // extrapolado (más oscuro que green-10)
    },

    // Escala "red" del Figma (_colors → red). Numeración invertida a
    // la convención de PrimeNG (50=claro, 950=oscuro).
    red: {
      50: '#FDEBEC', // red-95
      100: '#FBD7D9', // red-90
      200: '#F8AFB3', // red-80
      300: '#F5878D', // red-70
      400: '#F25F67', // red-60
      500: '#EF3742', // red-50
      600: '#BF2C34', // red-40
      700: '#8F2127', // red-30
      800: '#5F161A', // red-20
      900: '#2F0A0D', // red-10
      950: '#180507', // extrapolado (más oscuro que red-10)
    },

    // Escala "yellow" del Figma (_colors → yellow). Numeración invertida a
    // la convención de PrimeNG (50=claro, 950=oscuro).
    yellow: {
      50: '#FFFBE5', // yellow-95
      100: '#FFF7CC', // yellow-90
      200: '#FFEF99', // yellow-80
      300: '#FFE766', // yellow-70
      400: '#FFDF33', // yellow-60
      500: '#FFD700', // yellow-50
      600: '#CCAC00', // yellow-40
      700: '#998100', // yellow-30
      800: '#665600', // yellow-20
      900: '#322A00', // yellow-10
      950: '#191500', // extrapolado (más oscuro que yellow-10)
    },

    // Escala "neutral" del Figma (_colors → neutral). Base de superficies
    // (fondos, bordes, textos). Numeración invertida a la de PrimeNG.
    neutral: {
      0: '#FFFFFF', // neutral-100
      50: '#F4F5F5', // neutral-95
      100: '#EAECED', // neutral-90
      200: '#D6DADB', // neutral-85
      300: '#C1C7CA', // neutral-80
      400: '#849095', // neutral-70
      500: '#5B6B72', // neutral-60
      600: '#33474F', // neutral-50
      700: '#28383F', // neutral-40
      800: '#1E2A2F', // neutral-30
      900: '#141C1F', // neutral-20
      950: '#0A0E0F', // neutral-10
    },

    // ---- Alias de severidad ----
    // Las severidades de los componentes de PrimeNG (Button, Tag, Message,
    // Toast...) leen paletas primitivas por NOMBRE fijo:
    //   danger → red   |   success → green   |   warn → orange   |   info → sky
    // "danger" y "success" ya usan nuestras escalas red/green del Figma.
    // Para warn e info, redirigimos los nombres que PrimeNG espera (orange, sky)
    // a nuestras escalas yellow y blue del Figma.
    orange: {
      50: '{yellow.50}',
      100: '{yellow.100}',
      200: '{yellow.200}',
      300: '{yellow.300}',
      400: '{yellow.400}',
      500: '{yellow.500}',
      600: '{yellow.600}',
      700: '{yellow.700}',
      800: '{yellow.800}',
      900: '{yellow.900}',
      950: '{yellow.950}',
    },
    sky: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },

    // Escala del color PRIMARIO generada a partir de brand-01 (#005FFF).
    // IMPORTANTE: la paleta se llama `brandPrimary` (NO `primary`) a propósito.
    // Aura usa `emerald` como primitivo del primary y luego semantic.primary
    // apunta a él. Si la nombráramos `primary`, `semantic.primary → {primary.500}`
    // se resolvería contra sí mismo (referencia circular → botón transparente).
    brandPrimary: {
      50: '#e5efff',
      100: '#cce0ff',
      200: '#99c0ff',
      300: '#66a1ff',
      400: '#3381ff',
      500: '#005FFF', // ← brand-01
      600: '#004ccc',
      700: '#003999',
      800: '#002666',
      900: '#001333',
      950: '#000a1a',
    },

    // ---- Escalas de dimensión del Figma (foundations) ----
    // Transcritas 1:1 del Figma. Son primitivos reutilizables: se referencian
    // como {radiusBorder.01}, {spacing.03}, etc. Nombres en camelCase → PrimeNG
    // los expone como --p-radius-border-01, --p-spacing-03, etc.

    // radius-border — radios de borde (inputs, botones, cards...).
    radiusBorder: {
      '01': '4px',
      '02': '8px',
      '03': '12px',
      '04': '16px',
      '05': '24px',
      '06': '48px',
      circle: '9999px',
    },

    // sizing — anchos/altos de componentes (p. ej. alto de input, iconos...).
    sizing: {
      '01': '4px',
      '02': '8px',
      '03': '16px',
      '04': '24px',
      '05': '32px',
      '06': '40px',
      '07': '48px',
      '08': '64px',
      '09': '72px',
      '10': '96px',
      '11': '144px',
    },

    // sizing-border — grosores de borde.
    sizingBorder: {
      '01': '1px',
      '02': '2px',
      '03': '4px',
      '04': '8px',
    },

    // spacing — paddings, gaps y márgenes.
    spacing: {
      '00': '0',
      '01': '4px',
      '02': '8px',
      '03': '12px',
      '04': '16px',
      '05': '20px',
      '06': '24px',
      '07': '32px',
      '08': '40px',
      '09': '48px',
      '10': '56px',
      '11': '64px',
      '12': '72px',
      '13': '80px',
    },
  },

  // ---- Tokens semánticos (cómo se usan los colores en la UI) ----
  semantic: {
    // El primary semántico apunta a la escala `blue` del Figma (#006FB9), que es
    // el color de ACCIÓN de la UI (botón, checkbox, radio, links, focus...).
    // Nota: NO es brand-01 (#005FFF, `brandPrimary`), que es el azul de marca
    // "vivo" y resultaba demasiado fuerte para acciones.
    // NO usar `{primary.*}` aquí: colisionaría con este mismo bloque → referencia
    // circular → botón primario transparente.
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}', // #006FB9 — normal
      600: '{blue.600}', // #015893 — hover
      700: '{blue.700}', // #00426F — active
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },

    // Radio por defecto de los componentes. Se mantienen las claves sm/md/lg
    // porque muchos componentes de Aura las referencian ({borderRadius.md}),
    // pero apuntan a la escala oficial radius-border del Figma.
    borderRadius: {
      sm: '{radiusBorder.01}', // 4px
      md: '{radiusBorder.02}', // 8px
      lg: '{radiusBorder.03}', // 12px
    },

    // ---- Dimensiones de los campos de formulario (compartido) ----
    // form.field es un token COMPARTIDO: lo leen TODOS los campos (InputText,
    // Select, Textarea, DatePicker, InputNumber...). Estas son DIMENSIONES (no
    // color), por eso van en `semantic` a secas y NO en colorScheme.
    // Valores del layout del input en el Figma:
    //   radius radius-border/01 (4px) · border sizing-border/01 (1px)
    //   padding vertical spacing/03 (12px) · horizontal spacing/04 (16px)
    formField: {
      paddingX: '{spacing.04}', // 16px — Figma padding left/right
      paddingY: '{spacing.03}', // 12px — Figma padding top/bottom
      borderRadius: '{radiusBorder.01}', // 4px — Figma radius-border/01
    },

    // ---- Foundations del Figma (tokens semánticos de marca) ----
    // Se generan como variables CSS con prefijo del token, p. ej.
    // --p-surface-01, --p-surface-inverse-01. Apuntan a la escala neutral
    // (recordar: la numeración quedó invertida respecto al Figma).
    extend: {
      // color/surface — fondos de página.
      surface: {
        '01': '{neutral.0}', // Figma neutral/100 (blanco)
        '02': '{neutral.50}', // Figma neutral/95
        inverse01: '{neutral.600}', // Figma neutral/50
        inverse02: '{neutral.700}', // Figma neutral/40
      },

      // color/container — fondos de cards, paneles, inputs.
      container: {
        '01': '{neutral.0}', // Figma neutral/100 (blanco)
        '02': '{neutral.50}', // Figma neutral/95
        '03': '{neutral.200}', // Figma neutral/85
        '04': '{neutral.300}', // Figma neutral/80
        '05': '{blue.50}', // Figma blue/95
        inverse01: '{neutral.600}', // Figma neutral/50
        inverse02: '{neutral.700}', // Figma neutral/40
      },

      // color/on-surface — color de texto/íconos sobre superficies.
      onSurface: {
        '01': '{neutral.500}', // Figma neutral/60
        '02': '{neutral.600}', // Figma neutral/50
        '03': '{brand.01}', // Figma brand/01 (azul, énfasis/links)
        inverse01: '{neutral.0}', // Figma neutral/100 (blanco)
        inverse02: '{neutral.100}', // Figma neutral/90
      },

      // color/accent — énfasis/acento (usa la escala blue del Figma).
      accent: {
        '01': '{blue.500}', // Figma blue/50
        '02': '{blue.600}', // Figma blue/40
        container01: '{blue.500}', // Figma blue/50
        container02: '{blue.600}', // Figma blue/40
        onAccent01: '{neutral.0}', // Figma neutral/100 (texto sobre accent)
        border01: '{blue.500}', // Figma blue/50
        border02: '{blue.600}', // Figma blue/40
      },

      // color/border — bordes de inputs, cards, separadores.
      border: {
        '01': '{neutral.200}', // Figma neutral/85
        '02': '{neutral.400}', // Figma neutral/70
        '03': '{blue.200}', // Figma blue/80
        inverse01: '{neutral.500}', // Figma neutral/60
        inverse02: '{neutral.400}', // Figma neutral/70
      },

      // color/error — estados de error (usa la escala red).
      error: {
        '01': '{red.600}', // Figma red/40
        container01: '{red.50}', // Figma red/95
        container02: '{red.100}', // Figma red/90
        onError01: '{red.600}', // Figma red/40
        onError02: '{red.700}', // Figma red/30
        border01: '{red.600}', // Figma red/40
        border02: '{red.700}', // Figma red/30
      },

      // color/warning — advertencias (usa la escala yellow).
      warning: {
        '01': '{yellow.800}', // Figma yellow/20
        container01: '{yellow.100}', // Figma yellow/90
        onWarning01: '{yellow.800}', // Figma yellow/20
        border01: '{yellow.600}', // Figma yellow/40
      },

      // color/success — estados de éxito (usa la escala green).
      success: {
        '01': '{green.600}', // Figma green/40
        container01: '{green.50}', // Figma green/95
        container02: '{green.100}', // Figma green/90
        onSuccess01: '{green.600}', // Figma green/40
        onSuccess02: '{green.700}', // Figma green/30
        border01: '{green.500}', // Figma green/50
        border02: '{green.600}', // Figma green/40
      },

      // color/info — informativo (usa la escala blue).
      info: {
        '01': '{blue.500}', // Figma blue/50
        container01: '{blue.50}', // Figma blue/95
        onInfo01: '{blue.500}', // Figma blue/50
        border01: '{blue.500}', // Figma blue/50
      },

      // color/disabled — elementos deshabilitados (usa la escala neutral).
      disabled: {
        '01': '{neutral.400}', // Figma neutral/70
        container01: '{neutral.0}', // Figma neutral/100
        container02: '{neutral.100}', // Figma neutral/90
        onDisabled01: '{neutral.300}', // Figma neutral/80
        onDisabled02: '{neutral.400}', // Figma neutral/70
        border01: '{neutral.300}', // Figma neutral/80
      },

      // color/palette/brand — paleta de marca semántica (logo, decorativo).
      // Nota: el orden NO coincide con el de brand; se reordena por significado.
      paletteBrand: {
        '01': '{brand.01}', // Blue      — Figma brand/01
        '02': '{brand.02}', // Green     — Figma brand/02
        '03': '{brand.03}', // Red       — Figma brand/03
        '04': '{brand.04}', // Yellow    — Figma brand/04
        '05': '{brand.06}', // Blue logo — Figma brand/06
        '06': '{brand.09}', // Green logo— Figma brand/09
        '07': '{brand.07}', // Red logo  — Figma brand/07
        '08': '{brand.08}', // Yellow logo — Figma brand/08
        '09': '{brand.05}', // Black logo— Figma brand/05
        '10': '{neutral.0}', // Neutral-100 — Figma neutral/100
      },
    },

    // Esquema de color. Aquí van los tokens GLOBALES (primary, surface,
    // formField): aplican a toda la app. Los colores de un componente concreto
    // van en components.<x>.colorScheme.light, más abajo.
    // Sólo definimos `light`: la app no tiene modo oscuro.
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
        },

        // Campos de formulario (input, select, textarea, datepicker...).
        // TODOS leen de este `formField`, así que editando aquí se estilan todos
        // los inputs de la app de una sola vez (incluido shared/input-text).
        // Cada estado enlaza a un foundation del Figma.
        // Nota de sintaxis: los grupos en camelCase se referencian con punto
        // ({on.surface.02}, {palette.brand...}); las sub-claves NO ({border01}).
        formField: {
          background: '{container.01}', // fondo normal
          borderColor: '{border.01}', // borde normal
          color: '{on.surface.02}', // texto
          placeholderColor: '{on.surface.01}', // placeholder
          hoverBorderColor: '{border.02}', // hover
          focusBorderColor: '{accent.border01}', // focus
          invalidBorderColor: '{error.border01}', // error
          invalidPlaceholderColor: '{error.01}', // placeholder en error
          filledBackground: '{container.02}', // relleno (filled)
          filledHoverBackground: '{container.02}',
          filledFocusBackground: '{container.02}',
          disabledBackground: '{disabled.container02}', // deshabilitado (neutral/90, gris)
          disabledColor: '{disabled.onDisabled01}', // texto deshabilitado (neutral/80)
        },
        // Superficies (modo claro): mapeadas a la escala neutral del Figma.
        surface: {
          0: '{neutral.0}',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}',
        },
      },
    },
  },

  // ---- Overrides por componente ----
  // Tokens específicos de cada componente de PrimeNG. A diferencia de la
  // tipografía global (que NO se tokeniza y se hereda del body, ver
  // _typography.scss), Message SÍ expone un token para el tamaño de su texto:
  // message.text.fontSize → --p-message-text-font-size.
  // OJO: aquí no se pueden usar referencias {...} a las variables --bs-* (viven
  // en :root del SCSS, fuera del árbol del preset). Se usa var(--bs-*) como
  components: {
    button: {
      // `root` es sólo para lo que NO depende del modo claro/oscuro (medidas).
      // Los colores por severidad van en colorScheme.light.root: es ahí donde
      // Aura los define, y por tanto la única rama que los sobrescribe. Puestos
      // aquí, la clave se ignora en silencio (sin error de build) y gana Aura.
      root: {
        borderRadius: '{radiusBorder.04}',
        paddingX: '{spacing.06}',
        gap: '{spacing.02}',
      },
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '{accent.01}',
              borderColor: '{accent.01}',
              color: '{accent.onAccent01}',
              hoverColor: '{accent.onAccent01}',
              hoverBackground: '{accent.02}',
              hoverBorderColor: '{accent.02}',
            },
            secondary: {
              background: 'transparent',
              borderColor: '{accent.01}',
              color: '{accent.01}',
              hoverBackground: '{container.05}',
              hoverColor: '{accent.02}',
              hoverBorderColor: '{accent.02}',
              activeBackground: '{container.05}',
              activeBorderColor: '{accent.02}',
              activeColor: '{accent.02}',
            },
            success: {
              background: '{success.container01}',
              borderColor: '{success.border01}',
              color: '{success.onSuccess01}',
              hoverBackground: '{success.container02}',
              hoverBorderColor: '{success.border02}',
              hoverColor: '{success.onSuccess02}',
            },
            danger: {
              background: '{error.container01}',
              borderColor: '{error.border01}',
              color: '{error.onError01}',
              hoverBackground: '{error.container02}',
              hoverBorderColor: '{error.border02}',
              hoverColor: '{error.onError02}',
            },
          },
        },
      },
    },
    select: {
      dropdown: {
        color: '{accent.01}', // Figma blue/50 (blue accent) para la flecha
      },
    },
    message: {
      content: {
        gap: '{spacing.01}', // 4px — Figma spacing-01 (acerca el ícono al texto)
      },
      text: {
        fontSize: 'var(--bs-font-size-neg-1)', // 14px — Figma font-size neg-1
        sm: {
          fontSize: 'var(--bs-font-size-neg-1)', // 14px — Figma font-size neg-1
        },
        lg: {
          fontSize: 'var(--bs-font-size-neg-1)', // 14px — Figma font-size neg-1
        }
      },
    },
    // FileUpload: solo tokens estructurales que PrimeNG expone. La maqueta del
    // Figma (zona clicable, lista, preview, estado, acciones) es markup propio y
    // se estiliza en shared/components/file/file.scss con las mismas variables.
    fileupload: {
      root: {
        // El borde punteado se aplica en el SCSS (no hay token para border-style);
        // aquí fijamos radio del tema y quitamos el fondo para dejar solo el trazo.
        background: 'transparent',
        borderColor: '{border.02}', // Figma neutral/70 (borde de la zona)
        borderRadius: '{radiusBorder.02}', // 8px — Figma radius-border/02
        color: '{on.surface.02}',
      },
      content: {
        padding: '{spacing.00}', // el padding real lo maneja la maqueta
        gap: '{spacing.02}', // 8px entre archivos
        highlightBorderColor: '{accent.border01}', // borde al arrastrar (azul)
      },
      file: {
        padding: '{spacing.02}', // 8px — padding vertical de cada fila
        gap: '{spacing.03}', // 12px — separación preview/info/acciones
        borderColor: '{border.01}', // separador entre archivos
      },
      fileList: {
        gap: '{spacing.02}', // 8px
      },
    },
  },
});
