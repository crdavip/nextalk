# AGENT.md

## 🧩 Setup Commands
- Install dependencies: `pnpm install`
- Run development server: `pnpm dev`
- Build for production: `pnpm build`

---

## 💻 Code Style & Standards

### TypeScript
- Use **strict mode** (`"strict": true` en `tsconfig.json`)
- Prefer **explicit types** en funciones, props y retornos.
- Evitar el uso de `any` — usar `unknown` o tipos genéricos bien definidos.
- Utilizar **interfaces** para estructuras de datos y **types** para uniones o alias.
- Importaciones ordenadas: primero librerías, luego módulos internos.
- Mantener funciones **puras y pequeñas** (máximo 40 líneas).
- Evitar side effects inesperados en hooks o utils.
- Usar `async/await` en lugar de `.then()` para claridad.

---

## 🧠 Clean Code Principles
- **Funciones cortas, con una sola responsabilidad.**
- **Nombres descriptivos:** evitar abreviaciones (ej. `getUserProfile()` mejor que `getUsrP()`).
- **Comentarios solo cuando el código no se explique por sí mismo.**
- **Eliminar código muerto, logs y console.debug antes del commit.**
- **Evitar duplicación:** usar helpers, hooks o componentes reutilizables.
- **Usar early returns:** evita anidaciones profundas.
- **Seguir KISS, DRY, SRP.**

---

## ✍️ Naming Conventions
- **Variables y funciones:** `camelCase`
- **Componentes y clases:** `PascalCase`
- **Archivos y directorios:** `kebab-case`
- **Clases CSS / Tailwind:** `snake_case`
  - Ejemplo: `chat_container`, `message_box`, `send_button`
- **Hooks personalizados:** deben comenzar con `use` (ej. `useChatStore`)
- **Interfaces y tipos:** prefijo `I` o `T` según convención (ej. `IUser`, `TMessage`)

---

## 🎨 Styling Rules
- Usar **TailwindCSS** como framework base de estilos.
- Clases organizadas por tipo:
  1. **Layout:** `flex`, `grid`, `w-`, `h-`, `p-`, `m-`
  2. **Tipografía:** `text-`, `font-`, `leading-`
  3. **Color y fondo:** `bg-`, `text-`, `border-`
  4. **Interacción:** `hover:`, `focus:`, `active:`
- Mantener consistencia visual (espaciado, sombras, bordes, colores).
- Evitar estilos inline y `!important`.
- Agrupar clases repetidas en componentes o utilidades (`cn()` o `clsx`).
- Priorizar **responsive design** y **dark mode ready**.

---

## 🧩 Component Design
- Cada componente debe tener **una sola responsabilidad visual o lógica.**
- Los **componentes puros** no deben depender del estado global si no es necesario.
- Props documentadas con JSDoc o comentarios claros.
- Usar **Zustand** o **Context API** solo cuando el estado sea global o compartido.
- Evitar el "prop drilling" excesivo.
- No usar `any` en props: definir interfaces o tipos estrictos.


---

## 🧾 Commit & Versioning
- Seguir convención **Conventional Commits**:
  - `feat:` nueva funcionalidad  
  - `fix:` corrección de bug  
  - `refactor:` mejora sin cambio funcional  
  - `style:` cambio de formato o lint  
  - `docs:` documentación  
  - `chore:` mantenimiento o actualización menor
- Cada commit debe ser **pequeño, descriptivo y con un propósito claro.**

---

## ✅ QA & Linting
- Ejecutar `npm run lint` antes de cada commit.
- Usar ESLint + Prettier con reglas:
  - Comillas simples (`'`)
  - Sin punto y coma (`semi: false`)
  - Trailing commas (`always`)
  - Espaciado consistente (2 espacios)
- Prettier configurado en `.prettierrc` y ejecutado con `npm run format`.
- Revisar advertencias de TypeScript antes de cada push.

---

## ⚙️ Modern Best Practices
- **Next.js App Router** con componentes server/client declarados explícitamente.
- **React 18 concurrent rendering ready.**
- **Async Components y Suspense** cuando aplique.
- **Edge-ready:** evitar dependencias que requieran Node.js runtime.
- **UseEffect minimal:** mover lógica de negocio fuera de la vista.
- **Lazy loading** para componentes pesados o secundarios.
- **Error boundaries** para manejar excepciones visuales.

---

## 🧪 Testing (Opcional)
- Testing con **Vitest o Jest**.
- Testing de componentes con **Testing Library / Playwright**.
- Cada componente clave debe tener al menos un test básico de renderizado.

---

## 📱 Responsive (MOBILE-FIRST)
- **Estrategia:** desarrollar **mobile-first** (diseñar para pantallas pequeñas y escalar hacia desktop).
- **Breakpoints:** usar breakpoints coherentes (Tailwind default o proyecto-specific):
  - `sm` (>= 640px), `md` (>= 768px), `lg` (>= 1024px), `xl` (>= 1280px)
- **Grid & Flex:** priorizar `flex` y `grid` fluidos; evitar anchos fijos.
- **Container widths:** usar `max-w-` y `w-full` para que los contenedores sean fluidos.
- **Tipografía escalable:** usar `text-sm`, `text-base`, `text-lg` con `line-height` apropiado.
- **Imágenes y media:** usar `next/image` (o `width` / `height` y `srcset`) para responsive images; usar `object-fit: cover`.
- **Touch targets:** botones y controles mínimos de 44x44 px. Separación suficiente entre elementos interactivos.
- **Gestos y accesibilidad táctil:** evitar hover-only interactions; soportar taps y focus.
- **Paginación / Virtualización:** para listas largas (conversaciones/mensajes) usar virtual scroll o paginación para rendimiento móvil.
- **Pruebas de responsividad:** validar en dispositivos reales o emuladores (Chrome DevTools, BrowserStack).
- **Layouts adaptativos:** barra lateral colapsable en pantallas pequeñas (menu/hamburger). Ejemplo:
  - Mobile: sidebar oculta -> botón para abrir
  - Desktop: sidebar visible permanentemente
- **Form factor awareness:** considerar orientación (portrait/landscape) y tamaños de notch en móviles.

---

## ♿ Accesibilidad (A11Y)
**Objetivo:** cumplir al menos **WCAG 2.1 AA** para los flujos principales (lista de conversaciones, hilo de mensajes, envío de mensajes, indicadores de carga).

### Principios generales
- **HTML semántico**: usar `header`, `main`, `nav`, `aside`, `section`, `ul/li`, `button`, `form`, `label`.
- **Orden de tabulación lógico**: el flujo de tabulación debe seguir la jerarquía visual y ser predecible.
- **Contraste de color**: contraste mínimo 4.5:1 para texto normal y 3:1 para texto grande. Verificar con herramientas (axe, Lighthouse).
- **Focus visible y manejable**: todos los elementos interactivos deben mostrar `:focus` claramente (no solo outline invisible).
- **Roles y ARIA**: usar `role` y `aria-*` solo cuando no exista alternativa semántica.
  - Chat: `role="log"` o `aria-live="polite"` para actualizaciones de mensajes.
  - El área donde llegan las respuestas de la IA debe tener `aria-live="polite"` para anunciar nuevos mensajes sin interrumpir.
- **Labels claros**: inputs con `label` explícito o `aria-label` / `aria-labelledby`.
  - Ejemplo: `<input id="message" aria-label="Escribe tu mensaje" />`
- **Anuncios para estados**: indicador “respondiendo...” debe estar en un `aria-live` para informar a usuarios de screen readers.
- **Teclado completo**: todas las acciones (crear chat, cambiar conversaciones, enviar mensaje, cerrar modal) accesibles por teclado.
  - Enter para enviar, Esc para cerrar modales/drawers.
- **Atajos y Skip Links**: incluir `skip to content` para saltar navegación.
- **Alternativas textuales**: `alt` en imágenes, `aria-hidden="true"` en decoraciones.
- **Tiempo y animaciones**:
  - Respetar `prefers-reduced-motion` y proveer opción para reducir animaciones.
- **Formularios y validación**:
  - Mensajes de error accesibles (`aria-invalid`, `aria-describedby`).
- **Contraste en indicadores** (tiempos, timestamps, badges).
- **Testing y QA A11Y**:
  - Integrar checks automatizados en CI (axe-core, jest-axe).
  - Revisar con Lighthouse y herramientas de screen reader (NVDA, VoiceOver).
  - Pruebas manuales: teclado only, lector de pantalla básico, móvil con TalkBack/VoiceOver.
- **Mensajes largos y lectura**:
  - Permitir reflow del texto y evitar truncamientos en pantalla pequeña.
  - Ofrecer opción para aumentar tamaño de fuente (browser zoom friendly).

### Reglas específicas para el chat (ejemplos)
- Contenedor de mensajes:
  - `div` con `role="log" aria-live="polite" aria-atomic="false"`
  - Cada mensaje: `article` o `div` con `aria-label="Mensaje de usuario"`.
- Input de mensaje:
  - `<label for="chat_input" class="sr_only">Mensaje</label>`
  - Botón enviar con `aria-label="Enviar mensaje"`.
- Indicador de carga:
  - `<div role="status" aria-live="polite">Respondiendo…</div>`
- Conversaciones list:
  - Lista semántica `<ul>` con cada item `<li>`; cada item debe tener `role="button"` con `tabindex="0"` si no se usa `<button>`.
- Estados vacíos:
  - Incluir texto visible y también `aria-live` para cambios dinámicos.

---

## 🧾 Accesibilidad con Tailwind y utilidades
- Crear util clase `.sr_only` (screen-reader-only) para labels ocultos.
- Establecer util focus-visible custom (ej. `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`).
- Usar `prefers-reduced-motion` en CSS para desactivar animaciones.
- Mantener contraste en variables de color (tokens).

---

## 🔧 Herramientas y Checks (Recomendado)
- **Linting:** ESLint con plugin `jsx-a11y` y reglas `recommended`.
- **Automated checks:** axe-core (CI), jest-axe para tests unitarios.
- **Manual tests:** Lighthouse, NVDA, VoiceOver, Chrome DevTools Accessibility panel.
- **Color contrast:** Contrast checker (WebAIM).
- **Keyboard testing:** navegar toda la app solo con teclado.

---
