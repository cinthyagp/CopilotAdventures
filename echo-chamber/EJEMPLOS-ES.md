# Cámara de Ecos - Ejemplos de Uso y Guía para Desarrolladores

## 🎯 Ejemplos Rápidos

### Ejecutar con npm

```bash
# Iniciar modo interactivo
npm start

# Ejecutar pruebas automatizadas
npm test
```

### Sesión de Ejemplo

```
$ node index.js

╔═══════════════════════════════════════════════════════════════╗
║                  🏰 LA CÁMARA DE ECOS 🏰                       ║
║  ¡Bienvenido, buscador de patrones! Has entrado en la Cámara  ║
║  de Ecos, una sala mística donde las secuencias numéricas      ║
║  resuenan por la eternidad...
╚═══════════════════════════════════════════════════════════════╝

📖 ¿Qué te gustaría hacer?

  1) Probar la secuencia de ejemplo [3, 6, 9, 12]
  2) Ingresa tu propia secuencia
  3) Ver todos los recuerdos de ecos
  4) Ejecutar todos los casos de prueba
  5) Salir de la Cámara de Ecos

Ingresa tu opción (1-6): 1

🔮 Analizando la secuencia de ejemplo...

  ✅ ¡Se detectó una Progresión Aritmética Válida!
  📊 Secuencia: [3, 6, 9, 12]
  📈 Diferencia Común: 3
  🎯 Siguiente número en la secuencia: ➡️ 15
  💾 Recuerdo almacenado como Echo #1
```

## 📚 Guía para Desarrolladores

### Entender la Estructura del Código

#### Clase Principal: `ArithmeticSequencePredictor`

```javascript
const predictor = new ArithmeticSequencePredictor();

// Validar una secuencia
const validacion = predictor.validarSecuencia([2, 4, 6, 8]);
// Retorna: { esValida: true, diferencia: 2, error: null }

// Predecir el siguiente número
const resultado = predictor.predecirSiguiente([2, 4, 6, 8]);
// Retorna: { exito: true, prediccion: 10, error: null, recuerdo: {...} }

// Ver todos los recuerdos
const recuerdos = predictor.obtenerRecuerdos();
// Retorna: array de todas las predicciones anteriores

// Borrar recuerdos
predictor.borrarRecuerdos();
```

#### Clase Principal: `InterfazCámaraDeEcos`

```javascript
const camara = new InterfazCámaraDeEcos();

// Iniciar modo interactivo
camara.iniciar();

// Procesar una secuencia
camara.procesarSecuencia([5, 10, 15, 20], 'secuencia personalizada');

// Ejecutar todas las pruebas
camara.ejecutarCasosDePrueba();

// Analizar entrada del usuario
const resultado = camara.analizarEntradaSecuencia('1,2,3,4,5');
// Retorna: { exito: true, secuencia: [1,2,3,4,5], error: null }
```

## 🧪 Resultados de Casos de Prueba

Todos los casos de prueba se ejecutan exitosamente:

### Secuencias Válidas (7 pruebas)
✅ [3, 6, 9, 12] → 15
✅ [1, 2, 3, 4, 5] → 6
✅ [10, 20, 30, 40] → 50
✅ [100, 95, 90, 85] → 80
✅ [0, 0, 0, 0] → 0
✅ [-5, -3, -1, 1] → 3
✅ [50, 40, 30, 20, 10] → 0

### Manejo de Errores (5 pruebas)
✅ [1, 2, 4] - Identificada correctamente como no aritmética
✅ [5] - Rechazada correctamente (muy pocos elementos)
✅ [] - Rechazada correctamente (array vacío)
✅ ['a', 'b', 'c'] - Rechazada correctamente (no numérica)
✅ [1, 3, 5, 7, 10] - Identificada correctamente como no aritmética

### Características de Validación
✅ Verificación de tipo de entrada
✅ Validación de longitud mínima
✅ Validación de tipo numérico
✅ Verificación de diferencia común
✅ Mensajes de error detallados

## 🎓 Rutas de Aprendizaje

### Para Principiantes
1. Ejecuta la prueba de secuencia de ejemplo
2. Intenta ingresar secuencias simples como [2, 4, 6, 8]
3. Ver recuerdos para entender el formato de salida
4. Ejecuta pruebas de manejo de errores para ver la validación en acción

### Para Estudiantes Intermedios
1. Crea progresiones con números negativos: [-10, -5, 0, 5, 10]
2. Prueba casos límite como diferencia cero: [5, 5, 5, 5]
3. Intenta números más grandes y diferencias más grandes
4. Examina el código para entender el algoritmo

### Para Desarrolladores Avanzados
1. Extiende el predictor para manejar progresiones geométricas
2. Añade soporte para predecir múltiples números futuros
3. Implementa diferentes tipos de secuencias (Fibonacci, números primos)
4. Crea una visualización gráfica de secuencias
5. Construye un wrapper de API REST para el predictor

## 🔧 Extendiendo la Aplicación

### Agregar Soporte de Progresiones Geométricas

```javascript
/**
 * Agregar soporte de progresión geométrica
 */
validarSecuenciaGeometrica(secuencia) {
  // El primer término no puede ser cero
  if (secuencia[0] === 0) {
    return { esValida: false, error: 'El primer término no puede ser cero' };
  }

  const razon = secuencia[1] / secuencia[0];
  
  for (let i = 2; i < secuencia.length; i++) {
    if (secuencia[i] / secuencia[i-1] !== razon) {
      return { esValida: false, error: 'No es una progresión geométrica' };
    }
  }

  return { esValida: true, razonComun: razon };
}
```

### Agregar Predicción Múltiple

```javascript
/**
 * Predecir múltiples números futuros
 */
predecirMultiples(secuencia, cantidad) {
  const resultado = this.predecirSiguiente(secuencia);
  if (!resultado.exito) return resultado;

  const predicciones = [resultado.prediccion];
  let actual = resultado.prediccion;
  
  for (let i = 1; i < cantidad; i++) {
    actual += resultado.recuerdo.diferencia;
    predicciones.push(actual);
  }

  return {
    exito: true,
    predicciones: predicciones,
    recuerdo: resultado.recuerdo
  };
}
```

## 📊 Descripción General de la Arquitectura

```
InterfazCámaraDeEcos (Interacción del Usuario)
         ↓
    Análisis de Entrada
         ↓
ArithmeticSequencePredictor (Lógica Principal)
    ├── validarSecuencia()
    ├── predecirSiguiente()
    └── Gestión de Memoria
         ↓
    Salida de Consola y Almacenamiento
```

## 🎯 Lista de Características

- [x] Validación de secuencia aritmética
- [x] Predicción del siguiente número
- [x] Seguimiento de memoria/historial
- [x] Validación de entrada
- [x] Manejo de errores con mensajes detallados
- [x] Interfaz de consola interactiva
- [x] Presentación temática de fantasía
- [x] Suite de pruebas completa
- [x] Modo de pruebas automatizadas
- [x] Soporte de argumentos de línea de comandos
- [x] Pruebas de múltiples secuencias
- [x] Funcionalidad de visualización de recuerdos
- [x] Funcionalidad de borrado de recuerdos

## 💡 Notas de Rendimiento

- **Complejidad de Tiempo**: O(n) para validación, O(1) para predicción
- **Complejidad de Espacio**: O(m) donde m = número de recuerdos almacenados
- **Escalabilidad**: Puede manejar miles de secuencias sin problemas de rendimiento

## 🐛 Solución de Problemas

### Problema: "node: command not found"
**Solución**: Instala Node.js desde https://nodejs.org/

### Problema: La entrada no se acepta
**Solución**: Asegúrate de presionar Enter después de escribir tu entrada

### Problema: Predicciones inesperadas
**Solución**: Verifica que tu secuencia siga un patrón aritmético (diferencia constante)

## 📞 Soporte y Contribución

Este proyecto es parte del repositorio educativo CopilotAdventures. Para preguntas o mejoras, consulta la documentación del repositorio principal.

---

**¡Que tus patrones sean claros y tus predicciones precisas!** 🏰✨
