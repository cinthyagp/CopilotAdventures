/**
 * 🏰 LA CÁMARA DE ECOS - SERVIDOR V3.0
 * 
 * Servidor Express con soporte para:
 * - Múltiples tipos de secuencias
 * - Visualización con Chart.js
 * - Base de datos SQLite persistente
 * - Logging y monitoreo
 * - API RESTful completa
 */

const express = require('express');
const path = require('path');
const PredictorAvanzado = require('./lib/predictorAvanzado');
const BaseDatosEcos = require('./lib/baseDatos');
const LoggerEcos = require('./lib/logger');

// Inicializaciones
const app = express();
const PORT = process.env.PORT || 3000;
const predictor = new PredictorAvanzado();
const bd = new BaseDatosEcos();
const logger = new LoggerEcos('ecos-server');
let sesionId = null;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// RUTAS API
// ==========================================

/**
 * POST /api/predict - Predice siguiente número en secuencia
 */
app.post('/api/predict', (req, res) => {
  try {
    const { sequence } = req.body;

    if (!sequence) {
      logger.warn('Predicción sin secuencia', { ip: req.ip });
      return res.status(400).json({
        success: false,
        error: 'Se requiere una secuencia'
      });
    }

    const resultado = predictor.predecir(sequence);

    if (resultado.exito) {
      // Guardar en BD
      bd.guardarPrediccion(resultado);
      logger.prediccion(resultado.tipo, sequence, resultado);

      return res.json({
        success: true,
        echoNumber: resultado.echoNumero,
        type: resultado.tipo,
        sequence: resultado.secuencia,
        prediction: resultado.prediccion,
        nextFive: resultado.proximosCinco,
        formula: resultado.analisis.formula,
        analysis: resultado.analisis
      });
    } else {
      logger.warn('Predicción fallida', { error: resultado.error });
      return res.status(400).json({
        success: false,
        error: resultado.error
      });
    }
  } catch (error) {
    logger.error('Error en /api/predict', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/memories - Obtiene historial
 */
app.get('/api/memories', (req, res) => {
  try {
    const { tipo, limit = 100 } = req.query;
    
    let memories;
    if (tipo) {
      memories = predictor.obtenerRecuerdos(tipo);
    } else {
      memories = predictor.obtenerRecuerdos();
    }

    memories = memories.slice(0, limit);

    return res.json({
      success: true,
      count: memories.length,
      memories: memories
    });
  } catch (error) {
    logger.error('Error en /api/memories', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error obteniendo recuerdos'
    });
  }
});

/**
 * DELETE /api/memories - Borra historial
 */
app.delete('/api/memories', (req, res) => {
  try {
    predictor.borrarRecuerdos();
    logger.info('Recuerdos borrados por usuario');
    
    return res.json({
      success: true,
      message: 'Todos los recuerdos han sido borrados'
    });
  } catch (error) {
    logger.error('Error en DELETE /api/memories', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error borrando recuerdos'
    });
  }
});

/**
 * GET /api/statistics - Obtiene estadísticas
 */
app.get('/api/statistics', (req, res) => {
  try {
    const stats = predictor.obtenerEstadisticas();
    const resumenes = bd.obtenerResumen();

    return res.json({
      success: true,
      sessionStats: stats,
      persistentStats: resumenes
    });
  } catch (error) {
    logger.error('Error en /api/statistics', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error obteniendo estadísticas'
    });
  }
});

/**
 * GET /api/types/:type/history - Obtiene historia por tipo
 */
app.get('/api/types/:type/history', (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 50 } = req.query;

    const memories = predictor.obtenerRecuerdos(type).slice(0, limit);

    return res.json({
      success: true,
      type: type,
      count: memories.length,
      memories: memories
    });
  } catch (error) {
    logger.error(`Error en /api/types/${req.params.type}/history`, error.message);
    return res.status(500).json({
      success: false,
      error: 'Error obteniendo historial'
    });
  }
});

/**
 * GET /api/database/summary - Resumen de base de datos
 */
app.get('/api/database/summary', (req, res) => {
  try {
    const resumen = bd.obtenerResumen();
    return res.json({
      success: true,
      database: resumen
    });
  } catch (error) {
    logger.error('Error en /api/database/summary', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error obteniendo resumen BD'
    });
  }
});

/**
 * POST /api/export - Exporta datos en JSON
 */
app.post('/api/export', (req, res) => {
  try {
    const exportados = predictor.exportarJSON();
    logger.info('Datos exportados por usuario');

    return res.json({
      success: true,
      data: exportados,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error en /api/export', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error exportando datos'
    });
  }
});

/**
 * GET /api/logs/recent - Obtiene logs recientes
 */
app.get('/api/logs/recent', (req, res) => {
  try {
    const { lines = 50 } = req.query;
    const logs = logger.obtenerRecientes(lines);

    return res.json({
      success: true,
      count: logs.length,
      logs: logs
    });
  } catch (error) {
    logger.error('Error en /api/logs/recent', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error obteniendo logs'
    });
  }
});

/**
 * GET /api/health - Health check
 */
app.get('/api/health', (req, res) => {
  return res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoriesCount: predictor.obtenerRecuerdos().length
  });
});

// ==========================================
// MANEJO DE ERRORES
// ==========================================

/**
 * Ruta 404
 */
app.use((req, res) => {
  logger.warn(`Ruta no encontrada: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

/**
 * Error handler global
 */
app.use((error, req, res, next) => {
  logger.error(`Error no manejado: ${error.message}`, error.stack);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================

const servidor = app.listen(PORT, () => {
  sesionId = bd.iniciarSesion('web');
  
  logger.info(`╔════════════════════════════════════════════════════════╗`);
  logger.info(`║  🏰 LA CÁMARA DE ECOS - SERVIDOR V3.0 🏰              ║`);
  logger.info(`╠════════════════════════════════════════════════════════╣`);
  logger.info(`║  ✓ Servidor ejecutándose en puerto: ${PORT}`);
  logger.info(`║  ✓ URL: http://localhost:${PORT}`);
  logger.info(`║  ✓ Base de datos: SQLite3 persistente`);
  logger.info(`║  ✓ API RESTful activa con múltiples endpoints`);
  logger.info(`║  ✓ Sesión ID: ${sesionId}`);
  logger.info(`║  ✓ Presiona Ctrl+C para detener`);
  logger.info(`╚════════════════════════════════════════════════════════╝`);

  console.log(`\n🏰 Accede a: http://localhost:${PORT}\n`);
});

// ==========================================
// LIMPIEZA AL SALIR
// ==========================================

process.on('SIGINT', () => {
  logger.info('Servidor detenido por usuario');
  if (sesionId) {
    const predicciones = predictor.obtenerRecuerdos().length;
    bd.finalizarSesion(sesionId, predicciones);
  }
  bd.cerrar();
  servidor.close(() => {
    console.log('\n🛑 Servidor cerrado correctamente\n');
    process.exit(0);
  });
});

module.exports = app;
