/**
 * La Cámara de Ecos - Servidor Web
 * 
 * Este servidor Express proporciona una interfaz web para el predictor
 * de secuencias aritméticas. Incluye la lógica del predictor y proporciona
 * endpoints REST para la comunicación con el cliente.
 */

const express = require('express');
const path = require('path');

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// PREDICTOR DE SECUENCIAS ARITMÉTICAS
// ==========================================

/**
 * Clase PredictorDeCámara - Motor de predicción
 */
class PredictorDeCámara {
  constructor() {
    // Almacenar recuerdos de todos los ecos anteriores
    this.memories = [];
    this.sequenceCount = 0;
  }

  /**
   * Valida si una secuencia es una progresión aritmética válida
   */
  validarSecuencia(secuencia) {
    // Verificar si es un array
    if (!Array.isArray(secuencia)) {
      return {
        esValida: false,
        diferencia: null,
        error: 'La entrada debe ser un array de números'
      };
    }

    // Verificar longitud mínima
    if (secuencia.length < 2) {
      return {
        esValida: false,
        diferencia: null,
        error: 'La secuencia debe contener al menos 2 números'
      };
    }

    // Verificar que todos sean números válidos
    if (!secuencia.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        esValida: false,
        diferencia: null,
        error: 'Todos los elementos deben ser números válidos'
      };
    }

    // Calcular diferencia común
    const diferencia = secuencia[1] - secuencia[0];

    // Verificar que todas las diferencias sean iguales
    for (let i = 2; i < secuencia.length; i++) {
      const diff = secuencia[i] - secuencia[i - 1];
      if (diff !== diferencia) {
        return {
          esValida: false,
          diferencia: null,
          error: `No es una progresión aritmética. Se esperaba diferencia: ${diferencia}, pero se obtuvo ${diff} entre ${secuencia[i - 1]} y ${secuencia[i]}`
        };
      }
    }

    return {
      esValida: true,
      diferencia: diferencia,
      error: null
    };
  }

  /**
   * Predice el siguiente número en una secuencia aritmética
   */
  predecirSiguiente(secuencia) {
    // Validar la secuencia
    const validacion = this.validarSecuencia(secuencia);

    if (!validacion.esValida) {
      return {
        exito: false,
        prediccion: null,
        error: validacion.error,
        recuerdo: null
      };
    }

    // Calcular siguiente número
    const ultimoNumero = secuencia[secuencia.length - 1];
    const siguienteNumero = ultimoNumero + validacion.diferencia;

    // Crear recuerdo
    const recuerdo = {
      echoNumero: this.sequenceCount + 1,
      secuencia: [...secuencia],
      diferencia: validacion.diferencia,
      prediccion: siguienteNumero,
      marca: new Date().toISOString()
    };

    // Almacenar
    this.memories.push(recuerdo);
    this.sequenceCount++;

    return {
      exito: true,
      prediccion: siguienteNumero,
      error: null,
      recuerdo: recuerdo
    };
  }

  /**
   * Obtiene todos los recuerdos
   */
  obtenerRecuerdos() {
    return this.memories;
  }

  /**
   * Borra todos los recuerdos
   */
  borrarRecuerdos() {
    this.memories = [];
    this.sequenceCount = 0;
  }
}

// Instancia global del predictor
const predictor = new PredictorDeCámara();

// ==========================================
// RUTAS API
// ==========================================

/**
 * POST /api/predict - Predice el siguiente número en una secuencia
 */
app.post('/api/predict', (req, res) => {
  try {
    const { sequence } = req.body;

    if (!sequence) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere una secuencia'
      });
    }

    // Realizar predicción
    const resultado = predictor.predecirSiguiente(sequence);

    if (resultado.exito) {
      return res.json({
        success: true,
        sequence: resultado.recuerdo.secuencia,
        commonDifference: resultado.recuerdo.diferencia,
        prediction: resultado.prediccion,
        echoNumber: resultado.recuerdo.echoNumero
      });
    } else {
      return res.status(400).json({
        success: false,
        error: resultado.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error al procesar la solicitud: ' + error.message
    });
  }
});

/**
 * GET /api/memories - Obtiene todos los recuerdos
 */
app.get('/api/memories', (req, res) => {
  const memories = predictor.obtenerRecuerdos();
  return res.json({
    success: true,
    count: memories.length,
    memories: memories
  });
});

/**
 * DELETE /api/memories - Borra todos los recuerdos
 */
app.delete('/api/memories', (req, res) => {
  predictor.borrarRecuerdos();
  return res.json({
    success: true,
    message: 'Todos los recuerdos de ecos han sido borrados'
  });
});

/**
 * GET / - Sirve la página principal
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Manejo de rutas no encontradas
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         🏰 LA CÁMARA DE ECOS - SERVIDOR WEB 🏰            ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  El servidor está ejecutándose en: http://localhost:${PORT}${' '.repeat(PORT.toString().length < 3 ? 3 - PORT.toString().length : 0)} ║`);
  console.log('║  Abre tu navegador y accede a la dirección anterior       ║');
  console.log('║  Presiona Ctrl+C para detener el servidor                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Error no manejado en promesa:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});
