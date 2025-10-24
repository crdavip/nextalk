# 🧩 Requerimientos - NexTalk

Este documento describe los **criterios de aceptación mínimos** en formato **Gherkin**, necesarios para validar las funcionalidades del MVP de NexTalk.

---

## 1️⃣ Conversaciones

### Crear nueva conversación
**Scenario:** Crear una conversación nueva  
**Given** el usuario se encuentra en la vista principal  
**When** hace clic en el botón “Nueva conversación”  
**Then** se crea una nueva conversación con un nombre asignado o “Nueva conversación” por defecto  
**And** la conversación aparece en la lista de chats.

---

### Listar conversaciones
**Scenario:** Mostrar todas las conversaciones existentes  
**Given** el usuario tiene una o más conversaciones guardadas  
**When** accede a la aplicación  
**Then** se muestra una lista de conversaciones con el último mensaje y su hora correspondiente.

---

### Cambiar entre conversaciones
**Scenario:** Cambiar de conversación sin perder historial  
**Given** el usuario tiene varias conversaciones activas  
**When** selecciona una conversación distinta en la lista  
**Then** se muestra el historial completo de mensajes de esa conversación  
**And** no se pierde la información anterior.

---

## 2️⃣ Mensajería

### Enviar mensaje
**Scenario:** Enviar un mensaje al asistente  
**Given** el usuario ha seleccionado una conversación  
**And** ha escrito un mensaje en el campo de texto  
**When** presiona Enter o el botón de enviar  
**Then** el mensaje se muestra en el hilo con el rol de usuario  
**And** se envía al asistente de IA para procesarlo.

---

### Recibir respuesta
**Scenario:** Mostrar respuesta del asistente  
**Given** el usuario ha enviado un mensaje válido  
**When** el asistente de IA responde  
**Then** el mensaje del asistente se muestra en el hilo con su rol correspondiente  
**And** se visualiza con su hora de recepción.

---

## 3️⃣ Persistencia

### Guardar mensajes y conversaciones
**Scenario:** Guardar historial en base de datos  
**Given** el usuario crea o envía mensajes en una conversación  
**When** la aplicación guarda los datos  
**Then** las conversaciones y mensajes se almacenan correctamente en la base de datos  
**And** se mantienen disponibles tras recargar la aplicación.

---

## 4️⃣ Interfaz de usuario

### Layout tipo WhatsApp Web
**Scenario:** Mostrar diseño estructurado de la interfaz  
**Given** el usuario abre NexTalk  
**When** la aplicación carga correctamente  
**Then** se muestra una barra lateral con la lista de conversaciones  
**And** un panel principal con el hilo de mensajes y el campo de texto.

---

### Estado vacío sin conversación seleccionada
**Scenario:** No hay conversación seleccionada  
**Given** el usuario no ha seleccionado ninguna conversación  
**When** entra por primera vez a la aplicación  
**Then** se muestra un mensaje o ilustración indicando que no hay chat seleccionado.

---

### Estado vacío sin mensajes
**Scenario:** Nueva conversación sin mensajes  
**Given** el usuario ha creado una conversación nueva  
**When** aún no ha enviado ningún mensaje  
**Then** se muestra un mensaje o estado vacío indicando que no hay mensajes.

---

### Indicador de carga
**Scenario:** Mostrar indicador mientras responde la IA  
**Given** el usuario envía un mensaje  
**When** la respuesta del asistente está en proceso  
**Then** se muestra un indicador de carga o el texto “respondiendo…”  
**And** desaparece una vez que el mensaje de la IA se muestra.

---

## 5️⃣ Despliegue y conexión con IA

### Conexión con OpenAI
**Scenario:** Comunicación con el modelo de IA  
**Given** la aplicación tiene configurada una API key válida de OpenAI  
**When** el usuario envía un mensaje  
**Then** la aplicación recibe una respuesta generada por el modelo de IA  
**And** la muestra correctamente en el hilo.

---

### Despliegue online
**Scenario:** Aplicación accesible desde un dominio público  
**Given** el desarrollador ha completado la implementación  
**When** despliega la aplicación en un servicio como Vercel  
**Then** NexTalk puede accederse mediante una URL pública sin errores críticos.

---
