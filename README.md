# NexTalk - AI-Powered Chat Application

Chat en tiempo real con inteligencia artificial, similar a WhatsApp Web, construido con Next.js y OpenAI.

## 🚀 Demo en Vivo

[https://nextalk-crdavip.vercel.app]

## ✨ Características

- 💬 Chat en tiempo real con OpenAI GPT-4o-mini
- 📝 Múltiples conversaciones simultáneas
- 🔐 Autenticación de usuarios con Supabase
- 💾 Persistencia de mensajes en PostgreSQL
- 🎨 Interfaz tipo WhatsApp Web
- ⚡ Respuestas en tiempo real
- 📱 Diseño responsive

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js** - (App Router)
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos

### Backend
- **Supabase** - Base de datos y autenticación
- **PostgreSQL** - Base de datos relacional
- **OpenAI API** - Modelo gpt-4o-mini

### Deploy
- **Vercel** - Hosting y CI/CD

## 📐 Arquitectura
```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Next.js   │─────▶│   Supabase   │─────▶│ PostgreSQL  │
│  (Frontend) │      │  (Auth + DB) │      │             │
└─────────────┘      └──────────────┘      └─────────────┘
       │
       │
       ▼
┌─────────────┐
│  OpenAI API │
│ (gpt-4o-mini│
└─────────────┘
```

### Esquema de Base de Datos

**conversations**
- id (UUID, PK)
- user_id (UUID, FK → auth.users)
- title (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**messages**
- id (UUID, PK)
- conversation_id (UUID, FK → conversations)
- role (TEXT: 'user' | 'assistant')
- content (TEXT)
- created_at (TIMESTAMP)

## 🏃‍♂️ Instalación Local

### Prerequisitos
- Node.js 18+
- Cuenta en Supabase
- API Key de OpenAI

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/nexttalk.git
cd nexttalk
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**

Crear archivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
OPENAI_API_KEY=tu_openai_key
```

4. **Configurar base de datos**

Ejecutar el SQL en Supabase (ver sección de Arquitectura)

5. **Ejecutar en desarrollo**
```bash
pnpm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 📦 Deploy a Producción

### Opción 1: Vercel (Recomendado)
```bash
# Instalar Vercel CLI
pnpm i -g vercel

# Deploy
vercel

# Configurar variables de entorno
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add OPENAI_API_KEY

# Deploy a producción
vercel --prod
```

### Opción 2: Desde GitHub

1. Push a GitHub
2. Conectar repositorio en Vercel
3. Configurar variables de entorno
4. Deploy automático

## 💡 Decisiones Técnicas

### ¿Por qué Next.js App Router?
- Server Components para mejor performance
- Routing basado en carpetas
- API Routes integradas
- Streaming y Suspense nativo

### ¿Por qué Supabase?
- PostgreSQL completo (no limitaciones de serverless)
- Row Level Security integrado
- Autenticación lista
- Real-time capabilities (escalabilidad futura)
- SDK excelente para Next.js

### ¿Por qué gpt-4o-mini?
- Excelente balance costo/calidad
- Respuestas rápidas
- Suficiente para chat conversacional

### Trade-offs

**✅ Ventajas:**
- Setup rápido con Supabase
- Escalabilidad automática con Vercel
- RLS para seguridad de datos
- TypeScript para menos bugs

**⚠️ Consideraciones:**
- Costos de OpenAI por uso
- Límites de Supabase en plan gratuito
- Sin real-time sync (polling manual)

## 🤖 Uso de IA en el Desarrollo

### Prompts Utilizados

1. **Arquitectura inicial:**
   - "Diseña esquema SQL para app de chat con conversaciones y mensajes"
   - "Implementa RLS policies para Supabase multi-usuario"

2. **Componentes:**
   - "Crea componente React para lista de chats estilo WhatsApp"
   - "Implementa auto-scroll en ventana de chat"

3. **API Integration:**
   - "Integra OpenAI Chat Completions con historial de mensajes"

### Tiempo Estimado: 8 horas

**Desglose:**
- Setup inicial y configuración: 1h
- Base de datos y Supabase: 1.5h
- Autenticación: 1h
- API Routes: 1.5h
- Componentes UI: 2h
- Testing e integración: 1h

## 📝 Próximas Mejoras

- [ ] Editar conversaciones
- [ ] Búsqueda en conversaciones
- [ ] Markdown en mensajes
- [ ] Compartir conversaciones
- [ ] Real-time con Supabase subscriptions

## 📄 Licencia

MIT

## 👤 Autor

Tu Nombre - [GitHub](https://github.com/tu-usuario)