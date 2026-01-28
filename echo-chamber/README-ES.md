# 🏰 La Cámara de Ecos - Predictor de Secuencias Aritméticas

¡Bienvenido a la Cámara de Ecos, una aventura mística donde las secuencias aritméticas resuenan por la eternidad y los patrones revelan sus secretos!

## 📖 Descripción General

La Cámara de Ecos es una aplicación que enseña predicción de secuencias y reconocimiento de patrones. Implementa un predictor de secuencias aritméticas que:

- ✅ Valida progresiones aritméticas
- 🔮 Predice el siguiente número en cualquier secuencia
- 💾 Almacena "recuerdos" de ecos anteriores
- 🛡️ Proporciona manejo comprensivo de errores
- 🎮 Ofrece dos interfaces: consola interactiva e interfaz web visual

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js (v14 o superior)
- npm (viene con Node.js)

### Instalación

```bash
# Navega al directorio echo-chamber
cd /workspaces/CopilotAdventures/echo-chamber

# ¡No se requieren dependencias externas! El proyecto solo usa módulos nativos de Node.js
```

### Ejecutar la Aplicación

#### Modo Interactivo (Consola)
```bash
node index.js
```

Esto abre la Cámara de Ecos interactiva donde puedes:
1. Probar la secuencia de ejemplo [3, 6, 9, 12]
2. Ingresar tus propias secuencias
3. Ver recuerdos almacenados
4. Borrar recuerdos
5. Ejecutar casos de prueba completos
6. Salir de la cámara

#### Modo Web Visual
```bash
npm web
```

Abre tu navegador en **http://localhost:3000** para acceder a:
- Interfaz web visual e interactiva
- Diseño responsivo para móvil, tablet y desktop
- Historial visual de recuerdos
- Pruebas rápidas predefinidas
- Animaciones y tema de fantasía

#### Modo de Pruebas Automatizadas
```bash
node index.js --test
```

Ejecuta todas las pruebas automáticamente sin requerir interacción del usuario.

## 🎮 Cómo Usar

### Menú Interactivo

Cuando ejecutas la aplicación en modo interactivo, verás:

```
📖 ¿Qué te gustaría hacer?

  1) Probar la secuencia de ejemplo [3, 6, 9, 12]
  2) Ingresa tu propia secuencia
  3) Ver todos los recuerdos de ecos
  4) Borrar todos los recuerdos
  5) Ejecutar todos los casos de prueba
  6) Salir de la Cámara de Ecos
```

### Opción 1: Probar Secuencia de Ejemplo
Prueba instantáneamente la secuencia predefinida [3, 6, 9, 12] y predice que el siguiente número debe ser 15.

### Opción 2: Ingresar Secuencia Personalizada
Ingresa cualquier progresión aritmética como valores separados por comas:
```
Ingresa una secuencia: 2,4,6,8
```

### Opción 3: Ver Recuerdos
Muestra todas las secuencias analizadas previamente con:
- Número de eco
- Secuencia de entrada
- Diferencia común
- Número predicho
- Marca de tiempo

### Opción 4: Borrar Recuerdos
Reinicia todos los recuerdos almacenados en la Cámara de Ecos.

### Opción 5: Ejecutar Todas las Pruebas
Ejecuta casos de prueba completos incluyendo:
- Progresiones aritméticas válidas
- Casos límite (progresión cero, números negativos)
- Manejo de entrada inválida
- Detección de errores

### Opción 6: Salir
Deja la Cámara de Ecos y cierra la aplicación.

## 📊 Casos de Prueba

La aplicación incluye 7 casos de prueba predefinidos:

| Caso de Prueba | Secuencia | Siguiente Número Esperado |
|---|---|---|
| Prueba Básica | [3, 6, 9, 12] | 15 |
| Incrementar por 1 | [1, 2, 3, 4, 5] | 6 |
| Incrementar por 10 | [10, 20, 30, 40] | 50 |
| Decrementar por 5 | [100, 95, 90, 85] | 80 |
| Progresión de Cero | [0, 0, 0, 0] | 0 |
| Negativo a Positivo | [-5, -3, -1, 1] | 3 |
| Secuencia Descendente | [50, 40, 30, 20, 10] | 0 |

### Pruebas de Manejo de Errores

La aplicación también valida el manejo de errores con:
- Progresiones no aritméticas [1, 2, 4]
- Secuencias de un solo elemento [5]
- Arrays vacíos []
- Valores no numéricos ['a', 'b', 'c']
- Patrones mixtos [1, 3, 5, 7, 10]

## 📝 Estructura del Código

### Clases Principales

#### `ArithmeticSequencePredictor`
Motor de predicción central con métodos:
- `validarSecuencia(secuencia)` - Valida progresiones aritméticas
- `predecirSiguiente(secuencia)` - Predice el siguiente número
- `obtenerRecuerdos()` - Recupera todos los recuerdos almacenados
- `borrarRecuerdos()` - Borra el almacén de memoria
- `mostrarRecuerdos()` - Muestra salida de memoria formateada

#### `InterfazCámaraDeEcos`
Manejador de interfaz de usuario con métodos:
- `mostrarBienvenida()` - Muestra bienvenida con tema de fantasía
- `mostrarMenu()` - Muestra menú interactivo
- `analizarEntradaSecuencia(entrada)` - Analiza entrada del usuario
- `procesarSecuencia(secuencia, etiqueta)` - Procesa y muestra resultados
- `ejecutarCasosDePrueba()` - Ejecuta todas las pruebas predefinidas
- `probarManejodeErrores()` - Valida el manejo de errores
- `iniciar()` - Abre el modo interactivo

## 🎯 Cómo Funcionan las Progresiones Aritméticas

Una **progresión aritmética** es una secuencia donde la diferencia entre términos consecutivos es constante.

### Ejemplo:
```
Secuencia: [3, 6, 9, 12]
Diferencias: 6-3=3, 9-6=3, 12-9=3
Diferencia Común: 3
Siguiente Número: 12 + 3 = 15
```

### Fórmula:
```
Si a₁, a₂, a₃, ... es una secuencia aritmética con diferencia común d:
aₙ = a₁ + (n-1)d
Término siguiente = Último término + d
```

## 🛡️ Manejo de Errores

La aplicación valida:
- Que la entrada sea un array
- Que la secuencia tenga al menos 2 elementos
- Que todos los elementos sean números válidos
- Que todas las diferencias consecutivas sean iguales a la diferencia común

Si la validación falla, recibirás un mensaje de error claro que explica el problema.

## 📚 Secuencias de Ejemplo Que Puedes Probar

### Progresiones Simples
- `2,4,6,8` → Siguiente: 10
- `5,10,15,20` → Siguiente: 25
- `100,90,80,70` → Siguiente: 60

### Casos Límite
- `0,0,0,0` → Siguiente: 0 (diferencia común cero)
- `-10,-5,0,5,10` → Siguiente: 15 (cruzando de negativo a positivo)
- `1` → Error (muy pocos elementos)
- `1,2,4` → Error (no es aritmética)

## 🎨 Tema de Fantasía

La Cámara de Ecos se presenta como una ubicación de aventura mística donde:
- Las secuencias se llaman "ecos"
- Las predicciones se descubren por "videntes"
- El almacenamiento de memoria representa "grabaciones en las paredes de la cámara"
- El análisis se describe con emojis y lenguaje temático de fantasía

¡Esto hace que aprender secuencias aritméticas sea más atractivo y memorable!

## 🧪 Ejecutando Pruebas

### Modo de Pruebas Interactivas
```bash
node index.js
# Selecciona la opción 5: Ejecutar todos los casos de prueba
```

### Modo de Pruebas Automatizadas
```bash
node index.js --test
```

### Salida Esperada
Todos los casos de prueba deberían mostrar:
- Indicadores ✅ para secuencias válidas
- Indicadores ❌ para errores manejados
- Predicciones correctas para cada caso de prueba

## 📦 Dependencias

**¡Ninguna!** Este proyecto solo usa módulos nativos de Node.js:
- `readline` - Para interacción de consola

## 🔧 Personalización

### Agregar Nuevos Casos de Prueba

Edita el array `casosDePrueba` en `InterfazCámaraDeEcos.ejecutarCasosDePrueba()`:

```javascript
const casosDePrueba = [
  { secuencia: [tu, secuencia, aqui], nombre: 'Tu Nombre de Prueba' },
  // Agregar más casos de prueba...
];
```

### Modificar la Interfaz

Cambia el mensaje de bienvenida, opciones de menú o formato de salida en los métodos de la clase `InterfazCámaraDeEcos`.

## 🎓 Resultados de Aprendizaje

Al explorar la Cámara de Ecos, entenderás:
- ✅ Qué son las progresiones aritméticas
- ✅ Cómo identificar la diferencia común
- ✅ Cómo predecir el siguiente término
- ✅ Técnicas de validación de entrada
- ✅ Estrategias de manejo de errores
- ✅ Diseño de consola interactivo
- ✅ Gestión de estado con recuerdos

## 📞 Soporte

Para problemas o mejoras, consulta la documentación del repositorio principal de CopilotAdventures.

## 📄 Licencia

Este proyecto es parte del repositorio CopilotAdventures y sigue los mismos términos de licencia.

---

**¡Bienvenido a la Cámara de Ecos. Que tus patrones sean claros y tus predicciones precisas!** 🏰✨
