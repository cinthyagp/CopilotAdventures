# 🏰 La Cámara de Ecos - Inicio Rápido

¡Bienvenido! Aquí encontrarás todo lo que necesitas para comenzar.

## ⚡ 5 Minutos Para Empezar

### 1️⃣ Instalar

```bash
cd /workspaces/CopilotAdventures/echo-chamber
npm install
```

### 2️⃣ Elegir Interfaz

#### Opción A: Consola (Terminal)
```bash
npm start
```

#### Opción B: Web (Navegador)
```bash
npm web
```

Luego abre: http://localhost:3000

### 3️⃣ ¡Listo!

Prueba con la secuencia: `3,6,9,12`

---

## 📚 Documentación Completa

### Para Comenzar
- **DOS-INTERFACES.md** ← **Lee esto primero**
- INICIO-RAPIDO.md (este archivo)

### Para Usar
- **README-ES.md** - Guía completa de uso
- **WEB-GUIDE.md** - Guía específica web
- **EJEMPLOS-ES.md** - Ejemplos y casos de uso

### Para Desarrolladores
- TRADUCCION-ES.md - Cambios realizados
- index.js - Código consola (429 líneas)
- server.js - Código servidor (180 líneas)
- public/ - Archivos web

---

## 🎯 ¿Cuál Elegir?

### 🖥️ Consola (`npm start`)
Para ti si:
- Prefieres terminal
- Haces desarrollo
- Quieres algo rápido
- Eres desarrollador

### 🌐 Web (`npm web`)
Para ti si:
- Prefieres interfaz visual
- Enseñas a otros
- Usas desde móvil
- Quieres algo bonito

---

## 💡 Ejemplos Rápidos

### Ejemplo 1: Secuencia Simple
```
Entrada: 2,4,6,8
Resultado: Siguiente número = 10
```

### Ejemplo 2: Con Negativos
```
Entrada: -10,-5,0,5,10
Resultado: Siguiente número = 15
```

### Ejemplo 3: Error
```
Entrada: 1,2,4
Resultado: ❌ No es una progresión aritmética
```

---

## 🔌 API REST (Solo Web)

Si ejecutas `npm web`, puedes usar la API:

```bash
# Predecir
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"sequence": [3,6,9,12]}'

# Ver historial
curl http://localhost:3000/api/memories

# Limpiar historial
curl -X DELETE http://localhost:3000/api/memories
```

---

## 🛠️ Personalización

### Cambiar Puerto Web
```bash
PORT=8080 npm web
```

### Cambiar Idioma
Todo está en español. Si deseas inglés:
- Edita `server.js` - Reemplaza mensajes
- Edita `public/app.js` - Reemplaza textos
- Edita `public/index.html` - Reemplaza HTML

### Agregar Más Pruebas
En `public/index.html`, agrega:
```html
<button class="test-btn" onclick="testSequence([100,90,80,70])">
  Mi Prueba
</button>
```

---

## 📞 Ayuda Rápida

### "¿Qué es una progresión aritmética?"
Una secuencia donde la diferencia entre números es siempre igual.
Ej: 3,6,9,12 (diferencia: 3)

### "¿No funciona la web?"
1. ¿Ejecutaste `npm web`?
2. ¿Abriste http://localhost:3000?
3. ¿Puerto 3000 libre? Intenta: `PORT=3001 npm web`

### "¿Cómo acceso desde otro PC?"
Obtén tu IP: `ifconfig | grep inet` (Linux/Mac)  
Luego: `http://<TU_IP>:3000`

### "¿Cómo paro el servidor?"
Presiona `Ctrl+C` en la terminal

---

## 📊 Estructura

```
echo-chamber/
├── npm start      → Consola
├── npm web        → Web
├── npm test       → Pruebas
├── index.js       → Lógica consola
├── server.js      → Servidor Express
├── public/        → Archivos web
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── docs/          → Documentación
```

---

## 🎓 Casos de Uso

### Desarrollo
```bash
npm start          # Desarrollo rápido
npm test           # Pruebas
```

### Enseñanza
```bash
npm web            # Aula/demostración
# Abre en proyector: http://localhost:3000
```

### Aprendizaje
```bash
npm start          # O npm web según preferencia
# Lee README-ES.md mientras exploras
```

---

## 🌟 Lo Que Aprenderás

- ✅ Progresiones aritméticas
- ✅ Validación de entrada
- ✅ Manejo de errores
- ✅ Desarrollo web (si usas web)
- ✅ APIs REST (si usas web)
- ✅ Interfaces modernas (si usas web)

---

## 📱 Compatibilidad

- ✅ Windows, macOS, Linux
- ✅ Node.js 14+
- ✅ Navegador moderno (web)
- ✅ Cualquier terminal (consola)
- ✅ Móvil (web)

---

## 🎉 ¡Próximos Pasos!

1. Ejecuta: `npm start` o `npm web`
2. Prueba: `3,6,9,12`
3. Lee: `DOS-INTERFACES.md`
4. Explora: Pruebas rápidas y opciones

---

## 🔗 Recursos

- Documentación completa: README-ES.md
- Guía web: WEB-GUIDE.md
- Ejemplos: EJEMPLOS-ES.md
- Cambios: TRADUCCION-ES.md
- Comparativa: DOS-INTERFACES.md

---

**¡Disfruta explorando La Cámara de Ecos!** 🏰✨

¿Preguntas? Lee la documentación o prueba el `--help` en la consola.
