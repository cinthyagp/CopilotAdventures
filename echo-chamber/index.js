#!/usr/bin/env node

/**
 * Cámara de Ecos - Una Aventura de Predicción de Secuencias
 * 
 * ¡Bienvenido a la Cámara de Ecos, una sala mística donde las secuencias
 * resuenan y los patrones se revelan! Esta aplicación implementa un
 * predictor de secuencias aritméticas que aprende de patrones y predice
 * el siguiente número en una secuencia.
 * 
 * Características Principales:
 * - Valida progresiones aritméticas
 * - Predice el siguiente número en una secuencia
 * - Almacena "recuerdos" de ecos anteriores
 * - Proporciona manejo comprensivo de errores
 * - Ofrece una interfaz de consola interactiva
 */

const readline = require('readline');

/**
 * PredictorDeCámara - Clase principal para predecir secuencias
 * 
 * Una progresión aritmética es una secuencia donde la diferencia entre
 * términos consecutivos es constante. Esta clase gestiona la lógica de
 * predicción y administración de memoria.
 */
class ArithmeticSequencePredictor {
  constructor() {
    // Almacenar recuerdos de todos los ecos anteriores (secuencias procesadas)
    this.memories = [];
    this.sequenceCount = 0;
  }

  /**
   * Valida si una secuencia es una progresión aritmética válida
   * 
   * @param {number[]} sequence - La secuencia a validar
   * @returns {object} { esValida: boolean, diferencia: number | null, error: string | null }
   */
  validarSecuencia(secuencia) {
    // Verificar si la secuencia tiene al menos 2 elementos
    if (!Array.isArray(secuencia)) {
      return {
        esValida: false,
        diferencia: null,
        error: 'La entrada debe ser un array de números'
      };
    }

    if (secuencia.length < 2) {
      return {
        esValida: false,
        diferencia: null,
        error: 'La secuencia debe contener al menos 2 números'
      };
    }

    // Verificar que todos los elementos sean números válidos
    if (!secuencia.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        esValida: false,
        diferencia: null,
        error: 'Todos los elementos deben ser números válidos'
      };
    }

    // Calcular la diferencia común entre los primeros dos elementos
    const diferencia = secuencia[1] - secuencia[0];

    // Verificar que todas las diferencias consecutivas sean iguales
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
   * 
   * @param {number[]} sequence - La secuencia para predecir
   * @returns {object} { exito: boolean, prediccion: number | null, error: string | null, recuerdo: object | null }
   */
  predecirSiguiente(secuencia) {
    // Validar la secuencia primero
    const validacion = this.validarSecuencia(secuencia);

    if (!validacion.esValida) {
      return {
        exito: false,
        prediccion: null,
        error: validacion.error,
        recuerdo: null
      };
    }

    // Calcular el siguiente número usando la diferencia común
    const ultimoNumero = secuencia[secuencia.length - 1];
    const siguienteNumero = ultimoNumero + validacion.diferencia;

    // Crear un recuerdo de este eco
    const recuerdo = {
      echoNumero: this.sequenceCount + 1,
      secuencia: [...secuencia],
      diferencia: validacion.diferencia,
      prediccion: siguienteNumero,
      marca: new Date().toISOString()
    };

    // Almacenar en recuerdos
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
   * Recupera todos los recuerdos almacenados
   * 
   * @returns {array} Array de todos los ecos anteriores
   */
  obtenerRecuerdos() {
    return this.memories;
  }

  /**
   * Borra todos los recuerdos almacenados
   */
  borrarRecuerdos() {
    this.memories = [];
    this.sequenceCount = 0;
  }

  /**
   * Muestra todos los recuerdos almacenados de forma formateada
   */
  mostrarRecuerdos() {
    if (this.memories.length === 0) {
      console.log('\n✨ La Cámara de Ecos está silenciosa - sin recuerdos aún.\n');
      return;
    }

    console.log('\n📚 Recuerdos de Ecos:\n');
    this.memories.forEach(recuerdo => {
      console.log(`  Echo #${recuerdo.echoNumero}`);
      console.log(`    Secuencia: [${recuerdo.secuencia.join(', ')}]`);
      console.log(`    Diferencia Común: ${recuerdo.diferencia}`);
      console.log(`    Predicción: ${recuerdo.prediccion}`);
      console.log(`    Registrado: ${recuerdo.marca}`);
      console.log('');
    });
  }
}

/**
 * InterfazCámaraDeEcos - Interfaz de usuario basada en consola para la Cámara de Ecos
 * 
 * Proporciona una experiencia interactiva para que los usuarios exploren secuencias
 * aritméticas con narrativas temáticas de fantasía y prompts amigables.
 */
class InterfazCámaraDeEcos {
  constructor() {
    this.predictor = new ArithmeticSequencePredictor();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }

  /**
   * Muestra el mensaje de bienvenida y contexto de la historia
   */
  mostrarBienvenida() {
    console.clear();
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                  🏰 LA CÁMARA DE ECOS 🏰                       ║');
    console.log('║                                                               ║');
    console.log('║  ¡Bienvenido, buscador de patrones! Has entrado en la Cámara  ║');
    console.log('║  de Ecos, una sala mística donde las secuencias numéricas     ║');
    console.log('║  resuenan por la eternidad. Aquí, los patrones aritméticos    ║');
    console.log('║  se revelan y se puede predecir el siguiente número en        ║');
    console.log('║  cualquier progresión.                                        ║');
    console.log('║                                                               ║');
    console.log('║  Tu misión: Descubre los patrones, predice el futuro, y       ║');
    console.log('║  construye una memoria de todos los ecos escuchados en        ║');
    console.log('║  estas paredes.                                               ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  }

  /**
   * Muestra el menú principal
   */
  mostrarMenu() {
    console.log('\n📖 ¿Qué te gustaría hacer?\n');
    console.log('  1) Probar la secuencia de ejemplo [3, 6, 9, 12]');
    console.log('  2) Ingresa tu propia secuencia');
    console.log('  3) Ver todos los recuerdos de ecos');
    console.log('  4) Borrar todos los recuerdos');
    console.log('  5) Ejecutar todos los casos de prueba');
    console.log('  6) Salir de la Cámara de Ecos\n');
  }

  /**
   * Analiza una cadena separada por comas en un array de números
   * 
   * @param {string} input - La cadena de entrada
   * @returns {object} { exito: boolean, secuencia: number[] | null, error: string | null }
   */
  analizarEntradaSecuencia(entrada) {
    try {
      const partes = entrada.split(',').map(str => {
        const recortado = str.trim();
        const num = parseFloat(recortado);
        if (isNaN(num)) throw new Error(`"${recortado}" no es un número válido`);
        return num;
      });

      return {
        exito: true,
        secuencia: partes,
        error: null
      };
    } catch (error) {
      return {
        exito: false,
        secuencia: null,
        error: error.message
      };
    }
  }

  /**
   * Procesa y muestra el resultado de una predicción de secuencia
   * 
   * @param {number[]} sequence - La secuencia a procesar
   * @param {string} sourceLabel - Etiqueta describiendo de dónde viene la secuencia
   */
  procesarSecuencia(secuencia, etiquetaFuente) {
    console.log(`\n🔮 Analizando ${etiquetaFuente}...\n`);
    
    const resultado = this.predictor.predecirSiguiente(secuencia);

    if (resultado.exito) {
      console.log('  ✅ ¡Se detectó una Progresión Aritmética Válida!');
      console.log(`  📊 Secuencia: [${resultado.recuerdo.secuencia.join(', ')}]`);
      console.log(`  📈 Diferencia Común: ${resultado.recuerdo.diferencia}`);
      console.log(`  🎯 Siguiente número en la secuencia: ${resultado.recuerdo.diferencia > 0 ? '➡️ ' : '⬅️ '}${resultado.prediccion}`);
      console.log(`  💾 Recuerdo almacenado como Echo #${resultado.recuerdo.echoNumero}\n`);
    } else {
      console.log(`  ❌ Error: ${resultado.error}\n`);
    }
  }

  /**
   * Ejecuta todos los casos de prueba predefinidos
   */
  ejecutarCasosDePrueba() {
    console.log('\n🧪 Ejecutando Todos los Casos de Prueba...\n');

    const casosDePrueba = [
      { secuencia: [3, 6, 9, 12], nombre: 'Prueba Básica (3, 6, 9, 12)' },
      { secuencia: [1, 2, 3, 4, 5], nombre: 'Incrementar por 1' },
      { secuencia: [10, 20, 30, 40], nombre: 'Incrementar por 10' },
      { secuencia: [100, 95, 90, 85], nombre: 'Decrementar por 5' },
      { secuencia: [0, 0, 0, 0], nombre: 'Progresión de Cero' },
      { secuencia: [-5, -3, -1, 1], nombre: 'De Negativo a Positivo' },
      { secuencia: [50, 40, 30, 20, 10], nombre: 'Secuencia Descendente' }
    ];

    casosDePrueba.forEach((caso, indice) => {
      console.log(`Prueba ${indice + 1}: ${caso.nombre}`);
      const resultado = this.predictor.predecirSiguiente(caso.secuencia);
      
      if (resultado.exito) {
        console.log(`  ✅ Predicción: ${resultado.prediccion}`);
      } else {
        console.log(`  ❌ Error: ${resultado.error}`);
      }
      console.log('');
    });
  }

  /**
   * Prueba entradas inválidas para verificar el manejo de errores
   */
  probarManejodeErrores() {
    console.log('\n⚠️  Probando Manejo de Errores...\n');

    const casoInvalidos = [
      { entrada: [1, 2, 4], descripcion: 'Progresión no aritmética [1, 2, 4]' },
      { entrada: [5], descripcion: 'Un solo elemento [5]' },
      { entrada: [], descripcion: 'Array vacío []' },
      { entrada: ['a', 'b', 'c'], descripcion: 'Valores no numéricos' },
      { entrada: [1, 3, 5, 7, 10], descripcion: 'Patrón mixto [1, 3, 5, 7, 10]' }
    ];

    casoInvalidos.forEach((caso, indice) => {
      console.log(`Prueba de Error ${indice + 1}: ${caso.descripcion}`);
      const resultado = this.predictor.predecirSiguiente(caso.entrada);
      
      if (!resultado.exito) {
        console.log(`  ✅ Se capturó el error correctamente: ${resultado.error}`);
      } else {
        console.log(`  ❌ Debería haber fallado pero no lo hizo`);
      }
      console.log('');
    });
  }

  /**
   * Ciclo interactivo principal
   */
  iniciar() {
    this.mostrarBienvenida();

    const hacerPregunta = () => {
      this.mostrarMenu();

      this.rl.question('Ingresa tu opción (1-6): ', (opcion) => {
        switch (opcion.trim()) {
          case '1':
            this.procesarSecuencia([3, 6, 9, 12], 'la secuencia de ejemplo');
            hacerPregunta();
            break;

          case '2':
            this.rl.question('Ingresa una secuencia de números separados por comas (ej: 2,4,6,8): ', (entrada) => {
              const analizado = this.analizarEntradaSecuencia(entrada);
              if (analizado.exito) {
                this.procesarSecuencia(analizado.secuencia, 'tu secuencia personalizada');
              } else {
                console.log(`\n❌ Error al analizar la entrada: ${analizado.error}\n`);
              }
              hacerPregunta();
            });
            break;

          case '3':
            this.predictor.mostrarRecuerdos();
            hacerPregunta();
            break;

          case '4':
            this.predictor.borrarRecuerdos();
            console.log('\n🌫️  Todos los recuerdos de ecos han sido borrados de la cámara.\n');
            hacerPregunta();
            break;

          case '5':
            this.ejecutarCasosDePrueba();
            this.probarManejodeErrores();
            this.rl.question('Presiona Enter para continuar...', () => {
              hacerPregunta();
            });
            break;

          case '6':
            console.log('\n👋 Gracias por visitar la Cámara de Ecos. ¡Adiós, buscador de patrones!\n');
            this.rl.close();
            process.exit(0);
            break;

          default:
            console.log('\n⚠️  Opción inválida. Por favor selecciona 1-6.\n');
            hacerPregunta();
        }
      });
    };

    hacerPregunta();
  }
}

/**
 * Punto de Entrada de la Aplicación
 * 
 * Verifica argumentos de línea de comandos para determinar si se ejecuta en
 * modo interactivo o modo de pruebas automatizadas.
 */
const main = () => {
  const args = process.argv.slice(2);

  if (args.includes('--test')) {
    // Modo de prueba: Ejecutar pruebas automatizadas sin interfaz interactiva
    console.log('🧪 Ejecutando Pruebas de la Cámara de Ecos en Modo Automático\n');
    const predictor = new ArithmeticSequencePredictor();
    const interfaz = new InterfazCámaraDeEcos();

    console.log('=== Prueba de Secuencia de Ejemplo ===');
    interfaz.procesarSecuencia([3, 6, 9, 12], 'la secuencia de ejemplo');

    console.log('=== Todos los Casos de Prueba ===');
    interfaz.ejecutarCasosDePrueba();

    console.log('=== Pruebas de Manejo de Errores ===');
    interfaz.probarManejodeErrores();

    console.log('=== Recuerdos Almacenados ===');
    predictor.mostrarRecuerdos();

    process.exit(0);
  } else {
    // Modo interactivo
    const camara = new InterfazCámaraDeEcos();
    camara.iniciar();
  }
};

// Ejecutar la aplicación
main();
