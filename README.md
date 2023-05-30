# 🚀 Backend ecommerce

Proyecto final del curso de backend con nodejs en Coderhouse.

- **Comisión:** 40280
- **Profesor:** Nelson Vila
- **Comienza:** 08 de noviembre del 2022
- **Termina:** 09 de mayo del 2023
- **Repo de desafíos:**
  En este [repositorio de desafíos](https://github.com/mcuadros1983/Coderhouse_backend_40280) 


## ⭐ Acerca del proyecto

---

Proyecto backend donde se implementa un API e-commerce para poder vender productos.

## 📝 Descripción

---

- API para manejar productos.
- API para manejar usuarios.
- API para manejar autenticación (login y uso de JWT)
- API para manejar carrito de compras
- Uso de servicios de websocket para establecer un canal de twilio, chat y storage para imágenes.
  - twilio para enviar mensajes al telefono del admin en el momento en que se crea un nuevo usuario
  - websocket para consultas de usuarios y respuestas
  - storage para subir photo del usuario.
- MongoDB para persistir la data en producción y la opción de utilizar en memoria para desarrollo.
- Poder habilitar el modo CLUSTER mediante variable de entorno.
- Implementar el proyecto en capas.
  - routes: capa de rutas
  - controllers: capa de controladores
  - business: capa de negocio
  - persistence: capa de persistencia con implementación de repository, dto y dao.

## 🛠️ Técnologias y recursos

---

- Node.js
- Express
- MongoDB
- Passport JWT
- Mongoose
- Bcrypt
- Dotenv
- Nodemailer
- Twilio
- Websocket
- (más detalle en el package.json)


El proyecto se trabaja de forma individual por [Miguel Cuadros](https://ar.linkedin.com/in/miguel-cuadros-918394141)

