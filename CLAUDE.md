# CLAUDE.md

Guía para trabajar en este proyecto. Angular 20 + PrimeNG 20, con componentes
reutilizables propios y un showcase por componente.

## Stack

- **Angular 20.3** — standalone components (sin NgModules), control flow nuevo
  (`@if` / `@for`), **zoneless** (`provideZonelessChangeDetection`).
- **PrimeNG 20.4** con tema propio (`@primeuix/themes`).
- Sin PrimeIcons: los íconos son **Material Symbols** (`<span class="material-symbols-outlined">nombre</span>`).

## Comandos

```bash
npm start                          # ng serve → http://localhost:4200
npm run build                      # ng build (producción)
npx ng build --configuration development   # build rápido para verificar compilación
npm test                           # ng test (Karma + Jasmine)
```

Tras un cambio no trivial, verifica con `npx ng build --configuration development`.

## Convenciones de código

- **Prettier**: 100 columnas, comillas simples. Templates HTML con parser `angular`.
- **Nombres de clase sin sufijo de tipo**: la clase se llama `Switch`, `Select`,
  `InputText` (no `SwitchComponent`). Los archivos son `switch.ts` / `switch.html`
  / `switch.scss` (sin `.component`).
- **Comentarios en español**, describiendo el "por qué" (mira los componentes
  existentes para el tono).
- Cada `@Input()` lleva un comentario JSDoc corto explicando qué hace.

## Estructura

```
src/app/
├─ app.ts / app.html / app.scss   # shell: barra de navegación + <router-outlet>
├─ app.routes.ts                  # rutas (todas lazy con loadComponent)
├─ app.config.ts                  # providers: router, animations, PrimeNG + tema
├─ shared/components/             # componentes reutilizables (input-text, select, switch, message)
└─ pages/
   ├─ sandbox/                    # ÍNDICE (home): tarjetas hacia cada showcase
   ├─ form-demo/                  # ejemplo de formulario reactivo (FormGroup)
   └─ showcase/
      ├─ _showcase.scss           # estilos compartidos (.preview, headings, .row/.col)
      ├─ input-text/  select/  switch/  message/  button/  tag/
      └─ theme/                   # design tokens: tipografía + dimensiones + foundations

src/theme/brand-preset.ts         # preset del tema (genera las variables --p-*)
```

## Tema y estilos

- El preset del tema vive en `src/theme/brand-preset.ts` y genera variables CSS
  con prefijo **`--p-`** (ej. `--p-on-surface-01`, `--p-accent-01`, `--p-border-01`).
- Escala del Figma expuesta como **`--bs-*`** (ej. `--bs-font-size-neg-1`,
  `--bs-font-weight-bold`, `--bs-line-height-title`, `--bs-measure`).
- **Usa siempre estas variables**, no valores hardcodeados, para respetar el tema.
- **Solo modo claro**: el preset define únicamente `colorScheme.light`. El
  `darkModeSelector: '.app-dark'` de `app.config.ts` se mantiene a propósito
  (evita el default `'system'`), pero nada aplica esa clase.
- PrimeNG está en una CSS layer (`primeng`) para que tus estilos ganen sin
  `!important`.
- **Colores por componente**: van en `components.<x>.colorScheme.light.root`,
  no en `components.<x>.root` (ahí solo medidas: radios, paddings, gaps). Es la
  rama donde Aura define los suyos y la única que los sobrescribe; en `root` la
  clave se ignora **en silencio**, sin error de build.
- Las páginas de showcase reusan los estilos comunes con `@use '../showcase';`
  (el parcial `_showcase.scss`). No dupliques `.preview`/`.row`/`.col`.

## Componentes reutilizables (`shared/components/`)

Todos siguen el mismo patrón. Al crear o modificar uno, respétalo:

1. **Label + required**: `@Input() label` y `@Input() required` (asterisco rojo).
2. **Estados**: `@Input() isInvalid` y `@Input() isDisabled`.
3. **Mensajes**: reutilizan `app-message`. Exponen `message`, `errorMessage`,
   `messageSeverity`, `messageVariant`, `materialIcon`, y los getters
   `displayMessage` / `displaySeverity` / `isMessageVisible`. El `errorMessage`
   tiene prioridad sobre `message` cuando `isInvalid` es true.
4. **Tipos exportados**: cada componente exporta sus uniones de tipos
   (ej. `SwitchSize`, `SelectVariant`) para reusar en las demos.

### Formularios reactivos (ControlValueAccessor)

**Es el estándar del proyecto: usar formularios reactivos.** `InputText`, `Select`
y `Switch` implementan `ControlValueAccessor`, así que funcionan directo con
`formControlName` / `[formControl]` (también con `[(ngModel)]`).

Patrón del CVA en estos componentes:

- Se registran con `NG_VALUE_ACCESSOR` + `forwardRef` en `providers`.
- El valor es estado interno (`value`), **no** un `@Input()`. Se enlaza en el
  template con `[ngModel]="value"` + `(ngModelChange)="onModelChange($event)"`.
- `onModelChange` propaga al form (`onChange` + `onTouched`).
- `setDisabledState` combina con el `@Input() isDisabled` vía un getter `disabled`
  (deshabilitado si lo pide el input **o** el formulario).

Ejemplo mínimo (ver `pages/form-demo/` para el completo con validaciones):

```html
<form [formGroup]="form">
  <app-input-text label="Correo" formControlName="correo"
    [isInvalid]="showError('correo')" [errorMessage]="errorMessage('correo')" />
  <app-select label="Rol" [options]="roles" formControlName="rol" />
  <app-switch label="Activo" formControlName="activo" />
</form>
```

## Cómo agregar un componente nuevo al showcase

1. Crea el componente reutilizable en `shared/components/<nombre>/` siguiendo el
   patrón de arriba (label, estados, mensajes, CVA si aplica).
2. Crea su página de demo en `pages/showcase/<nombre>/<nombre>-showcase.{ts,html,scss}`.
   El `.scss` solo necesita `@use '../showcase';`.
3. Registra la ruta hija en `app.routes.ts`, dentro de `path: 'showcase'`.
4. Agrega el link en la barra de navegación (`app.html`).
5. Agrega una tarjeta en el índice (`pages/sandbox/sandbox.ts`, arreglo `links`).
