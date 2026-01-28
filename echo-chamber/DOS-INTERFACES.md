# 🏰 La Cámara de Ecos - Interfaz Consola + Web

Bienvenido a La Cámara de Ecos, ahora con dos formas de interactuar:

## 🎮 Dos Interfaces Disponibles

### 1. 🖥️ Interfaz de Consola (CLI)
**Modo**: Interactivo basado en terminal  
**Comando**: `npm start` o `node index.js`  
**Ideal para**: Desarrolladores, uso en terminal

```bash
npm start
```

Características:
- Menú interactivo
- Entrada por teclado
- Salida en terminal
- Totalmente en español
- Recuerdos de sesión actual

### 2. 🌐 Interfaz Web
**Modo**: Visual en navegador  
**Comando**: `npm web` o `node server.js`  
**Ideal para**: Todos, enseñanza, uso general

```bash
npm web
```

Luego abre: **http://localhost:3000** en tu navegador

Características:
- Interfaz visual moderna
- Diseño responsivo (mobile, tablet, desktop)
- Recuerdos persistentes en sesión
- Animaciones suaves
- Pruebas rápidas predefinidas
- API REST integrada

## 📊 Comparativa de Interfaces

| Aspecto | Consola | Web |
|--------|---------|-----|
| **Interfaz** | Terminal | Navegador |
| **Modo** | Interactivo | Punto y Click |
| **Visualización** | Texto | Gráfica |
| **Recuerdos** | Sesión | Sesión |
| **Velocidad** | Muy Rápida | Muy Rápida |
| **Móvil** | ❌ No | ✅ Sí |
| **API** | ❌ No | ✅ Sí (REST) |
| **Animaciones** | ❌ No | ✅ Sí |
| **Accesibilidad** | Desarrolladores | Todos |

## 🚀 Guía Rápida de Inicio

### Opción 1: Consola (Desarrollo)

```bash
# Instalar dependencias
npm install

# Ejecutar modo interactivo
npm start

# O ejecutar pruebas
npm test
```

### Opción 2: Web (Visual)

```bash
# Instalar dependencias
npm install

# Ejecutar servidor web
npm web

# Luego abre: http://localhost:3000
```

## 📁 Estructura de Archivos

```
echo-chamber/
├── index.js                 # Interfaz de consola
├── server.js               # Servidor web (Express)
├── package.json            # Dependencias
├── public/                 # Archivos web
│   ├── index.html         # Página web
│   ├── styles.css         # Estilos CSS
│   └── app.js             # JavaScript del cliente
├── README-ES.md           # Documentación completa
├── EJEMPLOS-ES.md         # Ejemplos y guía dev
├── WEB-GUIDE.md           # Guía interfaz web
└── TRADUCCION-ES.md       # Resumen cambios
```

## 🎯 Casos de Uso

### Usa Consola Cuando:
- ✅ Estés haciendo desarrollo
- ✅ Necesites pruebas automatizadas
- ✅ Prefieras interfaz de terminal
- ✅ Trabajas en servidor sin UI

### Usa Web Cuando:
- ✅ Quieras interfaz visual
- ✅ Enseñes a otros
- ✅ Necesites acceso desde navegador
- ✅ Desees usar desde móvil
- ✅ Requieras API REST

## 🔌 API REST (Solo Web)

El servidor web proporciona endpoints REST:

### POST /api/predict
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"sequence": [3,6,9,12]}'
```

Respuesta:
```json
{
  "success": true,
  "sequence": [3, 6, 9, 12],
  "commonDifference": 3,
  "prediction": 15,
  "echoNumber": 1
}
```

### GET /api/memories
```bash
curl http://localhost:3000/api/memories
```

### DELETE /api/memories
```bash
curl -X DELETE http://localhost:3000/api/memories
```

## 📚 Documentación

- **README-ES.md** - Guía completa en español
- **EJEMPLOS-ES.md** - Ejemplos de uso y desarrollo
- **WEB-GUIDE.md** - Guía específica de interfaz web
- **TRADUCCION-ES.md** - Resumen de cambios realizados

## 🛠️ Desarrollo

### Modificar la Consola
```bash
# Edita index.js
vim index.js

# Luego ejecuta:
npm start
```

### Modificar la Web

#### HTML (index.html)
```bash
vim public/index.html
```

#### Estilos (styles.css)
```bash
vim public/styles.css
```

#### Lógica del Cliente (app.js)
```bash
vim public/app.js
```

#### Servidor (server.js)
```bash
vim server.js
```

## 🌐 Acceso Remoto (Web)

Para acceder desde otra máquina en la red:

```bash
# En la máquina con el servidor
PORT=3000 npm web

# En otra máquina, usa la IP
# http://<IP_DEL_SERVIDOR>:3000
```

Para encontrar tu IP:
```bash
# Linux/Mac
ifconfig | grep inet

# Windows
ipconfig | findstr IPv4
```

## 📦 Dependencias

```json
{
  "express": "^4.18.2"
}
```

Solo Express, muy ligero y rápido.

## 🎨 Personalizaciones

### Cambiar Puerto Web
```bash
PORT=8080 npm web
```

### Cambiar Colores de la Web
Edita `public/styles.css`:
```css
/* Cambiar gradientes */
background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
```

### Agregar Más Pruebas
En `public/index.html`:
```html
<button class="test-btn" onclick="testSequence([2,4,6,8,10])">
  Mi Prueba
</button>
```

## 🧪 Pruebas

### Consola
```bash
npm test
```

### Web
Usa los botones de "Pruebas Rápidas" en la interfaz visual

## 🐛 Solución de Problemas

### "Puerto 3000 en uso"
```bash
PORT=3001 npm web
```

### "No puedo acceder a localhost:3000"
1. Asegúrate de que npm web está ejecutándose
2. Verifica que sea `http://` no `https://`
3. Abre F12 en el navegador para ver errores

### "API no responde"
1. Verifica que el servidor esté ejecutándose
2. Abre la consola del navegador (F12)
3. Busca errores de CORS o conexión

## 🎓 Para Aprender

La aplicación enseña:
- Progresiones aritméticas
- Validación de entrada
- Manejo de errores
- Desarrollo web (Express, HTML, CSS, JS)
- APIs REST
- Diseño responsivo

## 📞 Soporte

- Documentación: README-ES.md
- Guía Web: WEB-GUIDE.md
- Ejemplos: EJEMPLOS-ES.md
- Repo: github.com/microsoft/CopilotAdventures

## 🎉 ¿Cuál Elegir?

**¿No sabes cuál usar?**
- **Principiante**: Usa la web (más amigable)
- **Desarrollo**: Usa la consola (más rápida)
- **Demostración**: Usa la web (más visual)
- **API**: Usa la web (con REST)

---

**¡Disfruta explorando La Cámara de Ecos en ambas interfaces!** 🏰✨
