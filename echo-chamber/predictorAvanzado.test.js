/**
 * Suite de Tests - La Cámara de Ecos V3.0
 * Tests exhaustivos para todas las funcionalidades
 */

const PredictorAvanzado = require('./lib/predictorAvanzado');

describe('🏰 La Cámara de Ecos V3.0 - Suite de Tests', () => {

    let predictor;

    beforeEach(() => {
        predictor = new PredictorAvanzado();
    });

    // ==================== TESTS PROGRESIÓN ARITMÉTICA ====================

    describe('Progresiones Aritméticas', () => {
        test('Detecta progresión aritmética simple', () => {
            const resultado = predictor.predecir([3, 6, 9, 12]);
            expect(resultado.exito).toBe(true);
            expect(resultado.tipo).toBe('aritmética');
            expect(resultado.prediccion).toBe(15);
        });

        test('Calcula próximos 5 números correctamente', () => {
            const resultado = predictor.predecir([3, 6, 9, 12]);
            expect(resultado.proximosCinco).toEqual([15, 18, 21, 24, 27]);
        });

        test('Maneja números negativos', () => {
            const resultado = predictor.predecir([-10, -5, 0, 5, 10]);
            expect(resultado.exito).toBe(true);
            expect(resultado.prediccion).toBe(15);
        });

        test('Maneja diferencias negativas', () => {
            const resultado = predictor.predecir([100, 90, 80, 70]);
            expect(resultado.exito).toBe(true);
            expect(resultado.prediccion).toBe(60);
        });

        test('Maneja decimales', () => {
            const resultado = predictor.predecir([1.5, 2.5, 3.5, 4.5]);
            expect(resultado.exito).toBe(true);
            expect(resultado.prediccion).toBe(5.5);
        });

        test('Rechaza secuencia sin patrón aritmético', () => {
            const resultado = predictor.predecir([1, 2, 4, 8]);
            expect(resultado.tipo).not.toBe('aritmética');
        });
    });

    // ==================== TESTS PROGRESIÓN GEOMÉTRICA ====================

    describe('Progresiones Geométricas', () => {
        test('Detecta progresión geométrica simple', () => {
            const resultado = predictor.predecir([2, 4, 8, 16]);
            expect(resultado.exito).toBe(true);
            expect(resultado.tipo).toBe('geométrica');
            expect(resultado.prediccion).toBe(32);
        });

        test('Maneja razones menores a 1', () => {
            const resultado = predictor.predecir([100, 50, 25, 12.5]);
            expect(resultado.exito).toBe(true);
            expect(resultado.tipo).toBe('geométrica');
            expect(Math.round(resultado.prediccion * 100) / 100).toBe(6.25);
        });

        test('Calcula próximos 5 correctamente', () => {
            const resultado = predictor.predecir([2, 4, 8, 16]);
            expect(resultado.proximosCinco).toEqual([32, 64, 128, 256, 512]);
        });
    });

    // ==================== TESTS SECUENCIAS POLINÓMICAS ====================

    describe('Secuencias Polinómicas', () => {
        test('Detecta cuadrática simple', () => {
            const resultado = predictor.predecir([1, 4, 9, 16, 25]);
            expect(resultado.exito).toBe(true);
            expect(resultado.tipo).toBe('polinómica');
        });

        test('Predice siguiente número cuadrático', () => {
            const resultado = predictor.predecir([1, 4, 9, 16, 25]);
            expect(resultado.prediccion).toBe(36);
        });

        test('Maneja cuadráticas complejas', () => {
            const resultado = predictor.predecir([2, 8, 18, 32, 50]);
            expect(resultado.exito).toBe(true);
            expect(resultado.tipo).toBe('polinómica');
        });
    });

    // ==================== TESTS FIBONACCI ====================

    describe('Secuencias Fibonacci', () => {
        test('Detecta Fibonacci clásica', () => {
            const resultado = predictor.predecir([1, 1, 2, 3, 5, 8]);
            expect(resultado.exito).toBe(true);
            expect(resultado.tipo).toBe('fibonacci');
        });

        test('Predice siguiente Fibonacci', () => {
            const resultado = predictor.predecir([1, 1, 2, 3, 5, 8]);
            expect(resultado.prediccion).toBe(13);
        });

        test('Maneja Fibonacci con distintos inicios', () => {
            const resultado = predictor.predecir([2, 2, 4, 6, 10, 16]);
            expect(resultado.exito).toBe(true);
            expect(resultado.tipo).toBe('fibonacci');
        });
    });

    // ==================== TESTS DETECCIÓN AUTOMÁTICA ====================

    describe('Detección Automática de Tipos', () => {
        test('Detecta correctamente aritmética entre opciones', () => {
            const resultado = predictor.predecir([5, 10, 15, 20]);
            expect(resultado.tipo).toBe('aritmética');
        });

        test('Prioriza detección de tipo correcto', () => {
            const resultado = predictor.predecir([3, 6, 12, 24]);
            expect(resultado.tipo).toBe('geométrica');
        });

        test('Retorna tipo desconocida para patrón no reconocido', () => {
            const resultado = predictor.predecir([1, 3, 7, 15]);
            expect(resultado.exito).toBe(false);
        });
    });

    // ==================== TESTS VALIDACIONES ====================

    describe('Validaciones y Manejo de Errores', () => {
        test('Rechaza entrada no array', () => {
            const resultado = predictor.predecir("1, 2, 3");
            expect(resultado.exito).toBe(false);
            expect(resultado.error).toContain('array');
        });

        test('Rechaza secuencia muy corta', () => {
            const resultado = predictor.predecir([1]);
            expect(resultado.exito).toBe(false);
            expect(resultado.error).toContain('2 números');
        });

        test('Rechaza números inválidos', () => {
            const resultado = predictor.predecir([1, 'dos', 3]);
            expect(resultado.exito).toBe(false);
        });

        test('Rechaza NaN', () => {
            const resultado = predictor.predecir([1, NaN, 3]);
            expect(resultado.exito).toBe(false);
        });

        test('Acepta secuencia mínima válida', () => {
            const resultado = predictor.predecir([1, 2]);
            expect(resultado.exito).toBe(true);
        });
    });

    // ==================== TESTS MEMORIA ====================

    describe('Sistema de Memoria', () => {
        test('Almacena predicción en memoria', () => {
            predictor.predecir([3, 6, 9, 12]);
            const recuerdos = predictor.obtenerRecuerdos();
            expect(recuerdos.length).toBe(1);
        });

        test('Incrementa contador de ecos', () => {
            predictor.predecir([3, 6, 9]);
            predictor.predecir([2, 4, 8]);
            const recuerdos = predictor.obtenerRecuerdos();
            expect(recuerdos[0].echoNumero).toBe(1);
            expect(recuerdos[1].echoNumero).toBe(2);
        });

        test('Filtra recuerdos por tipo', () => {
            predictor.predecir([3, 6, 9]);           // aritmética
            predictor.predecir([2, 4, 8]);           // geométrica
            predictor.predecir([1, 4, 9]);           // polinómica
            
            const aritmeticas = predictor.obtenerRecuerdos('aritmética');
            expect(aritmeticas.length).toBe(1);
            expect(aritmeticas[0].tipo).toBe('aritmética');
        });

        test('Borra todos los recuerdos', () => {
            predictor.predecir([3, 6, 9]);
            predictor.predecir([2, 4, 8]);
            predictor.borrarRecuerdos();
            
            const recuerdos = predictor.obtenerRecuerdos();
            expect(recuerdos.length).toBe(0);
        });
    });

    // ==================== TESTS ESTADÍSTICAS ====================

    describe('Estadísticas', () => {
        test('Calcula estadísticas básicas', () => {
            predictor.predecir([3, 6, 9]);
            predictor.predecir([2, 4, 8]);
            
            const stats = predictor.obtenerEstadisticas();
            expect(stats.total).toBe(2);
            expect(stats.porTipo['aritmética']).toBe(1);
            expect(stats.porTipo['geométrica']).toBe(1);
        });

        test('Obtiene última predicción', () => {
            predictor.predecir([3, 6, 9]);
            const stats = predictor.obtenerEstadisticas();
            expect(stats.ultimaPrediccion).not.toBeNull();
        });
    });

    // ==================== TESTS EXPORTACIÓN ====================

    describe('Exportación de Datos', () => {
        test('Exporta a JSON válido', () => {
            predictor.predecir([3, 6, 9]);
            const exportado = predictor.exportarJSON();
            
            expect(exportado.version).toBe('3.0.0');
            expect(exportado.recuerdos).toBeDefined();
            expect(exportado.estadisticas).toBeDefined();
        });

        test('Incluye timestamp en exportación', () => {
            predictor.predecir([3, 6, 9]);
            const exportado = predictor.exportarJSON();
            expect(exportado.fecha).toBeDefined();
        });
    });

    // ==================== TESTS RENDIMIENTO ====================

    describe('Rendimiento', () => {
        test('Maneja secuencias largas eficientemente', () => {
            const secuenciaLarga = Array.from({length: 1000}, (_, i) => i * 2);
            const inicio = Date.now();
            const resultado = predictor.predecir(secuenciaLarga);
            const tiempo = Date.now() - inicio;
            
            expect(resultado.exito).toBe(true);
            expect(tiempo).toBeLessThan(100); // Menos de 100ms
        });

        test('Procesa múltiples predicciones rápidamente', () => {
            const inicio = Date.now();
            for (let i = 0; i < 100; i++) {
                predictor.predecir([1, 2, 3, 4, 5]);
            }
            const tiempo = Date.now() - inicio;
            
            expect(tiempo).toBeLessThan(500); // Menos de 500ms para 100 predicciones
        });
    });

    // ==================== TESTS CASOS ESPECIALES ====================

    describe('Casos Especiales', () => {
        test('Maneja secuencia con todos números iguales', () => {
            const resultado = predictor.predecir([5, 5, 5, 5]);
            expect(resultado.exito).toBe(true);
            expect(resultado.tipo).toBe('aritmética');
            expect(resultado.prediccion).toBe(5);
        });

        test('Maneja números muy grandes', () => {
            const resultado = predictor.predecir([1000000, 2000000, 3000000]);
            expect(resultado.exito).toBe(true);
            expect(resultado.prediccion).toBe(4000000);
        });

        test('Maneja números muy pequeños', () => {
            const resultado = predictor.predecir([0.001, 0.002, 0.003]);
            expect(resultado.exito).toBe(true);
        });

        test('Maneja mezcla de positivos y negativos', () => {
            const resultado = predictor.predecir([-2, -1, 0, 1, 2]);
            expect(resultado.exito).toBe(true);
            expect(resultado.prediccion).toBe(3);
        });
    });
});

// ==================== CONFIGURACIÓN JEST ====================
module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: [
        'lib/**/*.js',
        '!lib/baseDatos.js', // Excluir BD para tests
        '!lib/logger.js'      // Excluir logger para tests
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    }
};
