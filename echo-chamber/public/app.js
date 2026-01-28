/**
 * La Cámara de Ecos - Cliente Web
 * 
 * Esta aplicación JavaScript maneja la interfaz del lado del cliente,
 * se comunica con el servidor API y gestiona la experiencia del usuario.
 */

// Estado de la aplicación
const appState = {
    memories: [],
    echoCount: 0
};

// Elementos del DOM
const sequenceInput = document.getElementById('sequenceInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const sampleBtn = document.getElementById('sampleBtn');
const resultDiv = document.getElementById('result');
const resultContent = document.getElementById('resultContent');
const errorDiv = document.getElementById('error');
const errorContent = document.getElementById('errorContent');
const memoriesContainer = document.getElementById('memoriesContainer');
const clearMemoriesBtn = document.getElementById('clearMemoriesBtn');

/**
 * Inicializa los event listeners
 */
function initializeEventListeners() {
    analyzeBtn.addEventListener('click', analyzeSequence);
    sampleBtn.addEventListener('click', () => {
        sequenceInput.value = '3,6,9,12';
        analyzeSequence();
    });
    clearMemoriesBtn.addEventListener('click', clearMemories);
    sequenceInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            analyzeSequence();
        }
    });
}

/**
 * Analiza la secuencia ingresada
 */
async function analyzeSequence() {
    const input = sequenceInput.value.trim();
    
    if (!input) {
        showError('Por favor ingresa una secuencia de números');
        return;
    }

    try {
        // Parsear la entrada
        const sequence = input.split(',').map(str => {
            const num = parseFloat(str.trim());
            if (isNaN(num)) throw new Error(`"${str.trim()}" no es un número válido`);
            return num;
        });

        // Enviar al servidor
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sequence })
        });

        const data = await response.json();

        if (data.success) {
            showResult(data);
            addMemory(data);
            sequenceInput.value = '';
            hideError();
        } else {
            showError(data.error);
            hideResult();
        }
    } catch (error) {
        showError('Error al procesar la secuencia: ' + error.message);
        hideResult();
    }
}

/**
 * Muestra el resultado de la predicción
 */
function showResult(data) {
    const { sequence, commonDifference, prediction, echoNumber } = data;
    
    resultContent.innerHTML = `
        <div style="animation: slideIn 0.3s ease-out;">
            <h3 style="color: #4CAF50; margin-bottom: 15px;">✅ ¡Se detectó una Progresión Aritmética Válida!</h3>
            
            <div style="margin: 15px 0;">
                <strong>📊 Secuencia:</strong>
                <div style="background: #f0f0f0; padding: 10px; border-radius: 5px; margin: 5px 0; font-family: monospace;">
                    [${sequence.join(', ')}]
                </div>
            </div>

            <div style="margin: 15px 0;">
                <strong>📈 Diferencia Común:</strong>
                <div style="background: #f0f0f0; padding: 10px; border-radius: 5px; margin: 5px 0; font-family: monospace;">
                    ${commonDifference}
                </div>
            </div>

            <div style="margin: 15px 0;">
                <strong>🎯 Siguiente número en la secuencia:</strong>
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           color: white; padding: 15px; border-radius: 5px; margin: 5px 0; 
                           font-size: 1.3em; font-weight: bold; text-align: center;">
                    ${prediction}
                </div>
            </div>

            <div style="margin: 15px 0; font-size: 0.9em; color: #666;">
                <strong>💾 Recuerdo almacenado como Echo #${echoNumber}</strong>
            </div>
        </div>
    `;
    
    resultDiv.classList.remove('hidden');
}

/**
 * Muestra un mensaje de error
 */
function showError(message) {
    errorContent.innerHTML = `
        <div style="animation: slideIn 0.3s ease-out;">
            <h3 style="color: #ff6b6b; margin-bottom: 10px;">❌ Error</h3>
            <p>${message}</p>
        </div>
    `;
    errorDiv.classList.remove('hidden');
}

/**
 * Oculta el resultado
 */
function hideResult() {
    resultDiv.classList.add('hidden');
}

/**
 * Oculta el error
 */
function hideError() {
    errorDiv.classList.add('hidden');
}

/**
 * Agrega un recuerdo al historial
 */
function addMemory(data) {
    appState.memories.unshift({
        echoNumber: data.echoNumber,
        sequence: data.sequence,
        commonDifference: data.commonDifference,
        prediction: data.prediction,
        timestamp: new Date().toLocaleTimeString('es-ES')
    });

    updateMemoriesDisplay();
}

/**
 * Actualiza la visualización de recuerdos
 */
function updateMemoriesDisplay() {
    if (appState.memories.length === 0) {
        memoriesContainer.innerHTML = '<p class="empty-message">✨ La cámara está silenciosa - sin recuerdos aún</p>';
        return;
    }

    memoriesContainer.innerHTML = appState.memories.map((memory, index) => `
        <div class="memory-item">
            <div><strong>Echo #${memory.echoNumber}</strong> - ${memory.timestamp}</div>
            <div class="sequence">Secuencia: [${memory.sequence.join(', ')}]</div>
            <div>Diferencia: <strong>${memory.commonDifference}</strong> → Siguiente: <strong>${memory.prediction}</strong></div>
        </div>
    `).join('');
}

/**
 * Borra todos los recuerdos
 */
function clearMemories() {
    if (confirm('¿Estás seguro de que deseas borrar todos los recuerdos de ecos?')) {
        appState.memories = [];
        updateMemoriesDisplay();
    }
}

/**
 * Prueba una secuencia predefinida
 */
async function testSequence(sequence) {
    sequenceInput.value = sequence.join(',');
    await analyzeSequence();
}

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateMemoriesDisplay();
});
