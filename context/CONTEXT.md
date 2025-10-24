# 🧠 Context.md — Proyecto NexTalk

## 📌 Nombre del Proyecto
**NexTalk**

---

## 🚀 Misión
NexTalk es una aplicación web de mensajería impulsada por inteligencia artificial cuyo propósito es ofrecer una experiencia de conversación fluida, moderna y personalizada entre usuarios y un asistente inteligente.  
Su misión es **conectar personas e IA en un entorno conversacional ágil, intuitivo y visualmente familiar**, inspirado en la interfaz de WhatsApp Web.

---

## 🌍 Visión
Convertirse en una herramienta de comunicación inteligente accesible para todos los usuarios, capaz de integrarse fácilmente con diferentes modelos de IA, bases de datos y servicios externos.  
NexTalk busca evolucionar como una **plataforma modular**, adaptable a distintos contextos: soporte técnico, aprendizaje, productividad o chat asistido.

---

## 🧩 Descripción General
NexTalk es una **aplicación web de chat en tiempo real** que permite crear múltiples conversaciones con un asistente de IA (usando OpenAI), mantener un historial persistente y gestionar los mensajes desde una interfaz tipo WhatsApp Web.

El sistema combina una **arquitectura frontend y backend flexible**, con persistencia en base de datos y despliegue en línea (por ejemplo, Vercel).  
Está diseñada para un flujo de uso rápido, con retroalimentación visual, estados claros y un diseño coherente.

---

## 🎯 Objetivos Principales
1. Permitir la **creación y gestión de múltiples conversaciones** con nombres personalizados.  
2. Ofrecer una **interfaz moderna y familiar** tipo WhatsApp Web.  
3. Conectarse con el modelo de IA de OpenAI para enviar y recibir mensajes.  
4. **Persistir las conversaciones y mensajes** en una base de datos (PostgreSQL o MySQL).  
5. Ser desplegable y accesible online, para demostraciones o entornos productivos.

---

## ⚙️ Alcance del Proyecto (MVP)
El alcance del MVP incluye todas las funcionalidades necesarias para validar la experiencia de usuario y el flujo de comunicación entre el cliente y la IA.

### Funcionalidades principales:
- **Creación de conversaciones:** El usuario puede iniciar un nuevo chat con un nombre propio o “Nueva conversación”.  
- **Listado de conversaciones:** Se muestra una lista con el último mensaje y la hora.  
- **Cambio entre chats:** El usuario puede cambiar entre conversaciones sin perder historial.  
- **Mensajería IA:** El usuario escribe un mensaje y recibe una respuesta generada por OpenAI.  
- **Historial persistente:** Conversaciones y mensajes se guardan en la base de datos.  
- **Diseño tipo WhatsApp Web:** Barra lateral (lista de chats) + panel principal (mensajes).  
- **Estados vacíos y feedback visual:** Indicadores claros cuando no hay mensajes o mientras la IA responde.  
- **Despliegue en línea:** Aplicación funcional en una URL pública (por ejemplo, Vercel).

---

## 🧱 Arquitectura y Stack Sugerido

### Frontend
- Framework: **Next.js**
- Estilos: **TailwindCSS**
- Estado: **Zustand**
- Tipado: **TypeScript**

### Backend
- Plataforma sugerida: **Supabase**
- Base de datos: **PostgreSQL**
- Integración con **API de OpenAI (Chat Completions / gpt-4o-mini)**

### Despliegue
- **Vercel** (Frontend)
- **Render / Railway / Neon** (para base de datos y backend, opcional)

---

## 💡 Filosofía del Proyecto
NexTalk está diseñado bajo una filosofía de **claridad, modularidad y escalabilidad**:
- **Claridad:** La UI y UX deben ser simples y familiares.
- **Modularidad:** Cada módulo (chat, mensajes, IA, persistencia) debe funcionar de forma independiente.
- **Escalabilidad:** La arquitectura debe permitir nuevas funcionalidades (por ejemplo, autenticación, roles, mensajes multimedia o chat grupal).

---

## 🔒 Reglas y Convenciones
- Todo mensaje tiene **rol** (`user` o `assistant`), **texto**, **timestamp** y **referencia a la conversación**.  
- Las conversaciones son **persistentes** y deben poder recuperarse tras cerrar sesión o refrescar la página.  
- La interfaz debe reflejar **estados visuales claros**:  
  - Sin conversación seleccionada  
  - Sin mensajes  
  - En espera de respuesta  
- El diseño visual debe mantener **consistencia tipográfica y cromática** en toda la aplicación.

---

## 🧩 Módulos Principales

### 1. Módulo de Conversaciones
- Crear nuevas conversaciones.
- Listar todas las conversaciones.
- Cambiar entre conversaciones sin perder el historial.

### 2. Módulo de Mensajería
- Enviar mensajes desde el input.
- Recibir respuestas del asistente IA.
- Mostrar los mensajes con rol, texto y hora.

### 3. Módulo de Persistencia
- Guardar y recuperar mensajes y conversaciones desde la base de datos.

### 4. Módulo de Interfaz
- Layout tipo WhatsApp Web.
- Estados vacíos y feedback visual.
- Indicador de carga mientras la IA responde.

### 5. Módulo de Despliegue
- Aplicación en línea accesible públicamente.
- Conexión con OpenAI mediante API key de prueba.

---

## 🔍 Criterios de Éxito
1. El usuario puede crear, ver y cambiar entre conversaciones.  
2. Los mensajes fluyen correctamente entre usuario e IA.  
3. El historial se conserva tras actualizar o cerrar la aplicación.  
4. La interfaz es clara, responsiva y consistente.  
5. La app está disponible online sin errores críticos.

---

## 🧠 Contexto para Agentes de IA
Cualquier agente o modelo de IA que interactúe con este proyecto debe entender que:
- NexTalk es un **chat persistente entre humano e IA**, no entre dos humanos.
- La IA debe **responder en contexto**, entendiendo el historial de la conversación.
- El objetivo del agente es **mantener coherencia, claridad y asistencia contextual**, no solo responder preguntas.
- Toda sugerencia, código o contenido generado debe alinearse con los principios del proyecto:
  - Modularidad  
  - Claridad visual  
  - Persistencia de datos  
  - Consistencia en la experiencia del usuario  

---

## 🧾 Estado del Proyecto
**Versión:** MVP inicial  
**Foco actual:** Funcionalidad base de chat, integración con OpenAI y persistencia con Sistema de autenticación.  
**Siguientes etapas:**  
- Configuración de personalidad del asistente.  
- Exportación e importación de conversaciones.  
- Integración multicanal.

---

© 2025 NexTalk — Proyecto de comunicación inteligente impulsado por IA.
