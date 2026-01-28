/**
 * App.js V3.0 - La Cámara de Ecos
 * Cliente JavaScript con visualización Chart.js y múltiples funcionalidades
 */

// ==================== ESTADO GLOBAL ====================

const appState = {
    memories: [],
    currentFilters: 'todos',
    chart: null,
    apiBaseUrl: '/api',
    tiposDisponiables: ['todos', 'aritmética', 'geométrica', 'polinómica', 'fibonacci']
};

// ==================== ELEMENTOS DOM ====================

const elementos = {
    inputSecuencia: document.getElementById('inputSecuencia'),
    btnAnalizar: document.getElementById('btnAnalizar'),
    btnLimpiar: document.getElementById('btnLimpiar'),
    resultado: document.getElementById('resultado'),
    error: document.getElementById('error'),
    listaHistorial: document.getElementById('listaHistorial'),
    btnBorrarHistorial: document.getElementById('btnBorrarHistorial'),
    estadisticas: document.getElementById('estadisticas'),
    grafico: document.getElementById('grafico'),
    infoGrafico: document.getElementById('infoGrafico'),
    indicadorSalud: document.getElementById('indicadorSalud'),
    estadoServidor: document.getElementById('estadoServidor'),
    botonesTabs: document.querySelectorAll('.boton-nav'),
    tabsContenido: document.querySelectorAll('.tab-contenido'),
    botonesEjemplos: document.querySelectorAll('.boton-ejemplo'),
    botonesFiltros: document.querySelectorAll('.boton-filtro'),
    contextoGrafico: null
};

// ==================== INICIALIZACIÓN ====================

document.addEventListener('DOMContentLoaded', () => {
    inicializarEventos();
    verificarSalud();
    cargarRecuerdos();
    elementos.contextoGrafico = elementos.grafico.getContext('2d');
    setInterval(verificarSalud, 10000); // Verificar cada 10 segundos
});

// ==================== EVENTOS ====================

function inicializarEventos() {
    // Botones principales
    elementos.btnAnalizar.addEventListener('click', analizarSecuencia);
    elementos.btnLimpiar.addEventListener('click', limpiarEntrada);
    elementos.btnBorrarHistorial.addEventListener('click', confirmarBorrarHistorial);

    // Navegación de tabs
    elementos.botonesTabs.forEach(boton => {
        boton.addEventListener('click', (e) => cambiarTab(e.target.dataset.tab));
    });

    // Ejemplos
    elementos.botonesEjemplos.forEach(boton => {
        boton.addEventListener('click', (e) => {
            elementos.inputSecuencia.value = e.target.dataset.seq;
            analizarSecuencia();
        });
    });

    // Filtros
    elementos.botonesFiltros.forEach(boton => {
        boton.addEventListener('click', (e) => cambiarFiltro(e.target.dataset.tipo));
    });

    // Enter en input
    elementos.inputSecuencia.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) analizarSecuencia();
    });
}

// ==================== ANÁLISIS DE SECUENCIA ====================

async function analizarSecuencia() {
    const entrada = elementos.inputSecuencia.value.trim();

    if (!entrada) {
        mostrarError('Por favor ingresa una secuencia');
        return;
    }

    try {
        // Parsear entrada
        const numeros = entrada.split(',').map(n => {
            const num = parseFloat(n.trim());
            if (isNaN(num)) throw new Error(`"${n.trim()}" no es un número válido`);
            return num;
        });

        if (numeros.length < 2) {
            mostrarError('Se requieren al menos 2 números');
            return;
        }

        // Enviar al servidor
        const respuesta = await fetch(`${appState.apiBaseUrl}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sequence: numeros })
        });

        const datos = await respuesta.json();

        if (!datos.success) {
            mostrarError(datos.error || 'Error analizando secuencia');
            return;
        }

        // Mostrar resultado
        mostrarResultado(datos);
        cargarRecuerdos();
        actualizarEstadisticas();

    } catch (error) {
        mostrarError(`Error: ${error.message}`);
    }
}

// ==================== MOSTRAR RESULTADOS ====================

function mostrarResultado(datos) {
    limpiarResultado();
    
    const html = `
        <div class="resultado-item">
            <strong>🏰 Eco #${datos.echoNumber}</strong>
            <p>Tipo: <span style="color: var(--color-primario)">${datos.type.toUpperCase()}</span></p>
        </div>
        
        <div class="resultado-item">
            <strong>📊 Análisis</strong>
            <p>Secuencia: ${datos.sequence.join(', ')}</p>
            <p>Diferencia/Razón: <strong>${formatearNumero(datos.analysis.diferencia || datos.analysis.razon)}</strong></p>
            <p>Fórmula: <code>${datos.analysis.formula}</code></p>
        </div>
        
        <div class="resultado-prediccion">
            ✨ Siguiente: <strong>${formatearNumero(datos.prediction)}</strong> ✨
        </div>
        
        <div class="resultado-item">
            <strong>📈 Próximos 5 Números:</strong>
            <p style="font-family: monospace; color: var(--color-exito)">
                ${datos.nextFive.map(n => formatearNumero(n)).join(' → ')}
            </p>
        </div>
    `;

    elementos.resultado.innerHTML = html;
    elementos.resultado.classList.remove('oculto');
    elementos.error.classList.add('oculto');
}

function mostrarError(mensaje) {
    limpiarResultado();
    elementos.error.innerHTML = `<strong>❌ Error:</strong> ${mensaje}`;
    elementos.error.classList.remove('oculto');
    elementos.resultado.classList.add('oculto');
}

function limpiarResultado() {
    elementos.resultado.innerHTML = '';
    elementos.error.innerHTML = '';
    elementos.resultado.classList.add('oculto');
    elementos.error.classList.add('oculto');
}

// ==================== HISTORIAL ====================

async function cargarRecuerdos() {
    try {
        const respuesta = await fetch(`${appState.apiBaseUrl}/memories`);
        const datos = await respuesta.json();

        if (datos.success) {
            appState.memories = datos.memories;
            actualizarListaHistorial();
        }
    } catch (error) {
        console.error('Error cargando recuerdos:', error);
    }
}

function actualizarListaHistorial() {
    const filtrados = appState.memories.filter(m => 
        appState.currentFilters === 'todos' || m.tipo === appState.currentFilters
    ).slice(0, 50);

    if (filtrados.length === 0) {
        elementos.listaHistorial.innerHTML = '<p style="text-align: center; color: var(--color-texto-secundario);">No hay recuerdos aún</p>';
        return;
    }

    elementos.listaHistorial.innerHTML = filtrados.map(m => `
        <div class="recuerdo-item">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="recuerdo-tipo">${m.tipo}</span>
                <small>${new Date(m.marca).toLocaleTimeString('es-ES')}</small>
            </div>
            <p><strong>Eco #${m.echoNumero}:</strong> ${m.secuencia.join(', ')}</p>
            <p>→ <strong>${formatearNumero(m.prediccion)}</strong></p>
        </div>
    `).join('');
}

// ==================== ESTADÍSTICAS ====================

async function actualizarEstadisticas() {
    try {
        const respuesta = await fetch(`${appState.apiBaseUrl}/statistics`);
        const datos = await respuesta.json();

        if (datos.success) {
            mostrarEstadisticas(datos.sessionStats);
        }
    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
    }
}

function mostrarEstadisticas(stats) {
    const html = `
        <div class="stat-card">
            <h3>Total Predicciones</h3>
            <div class="valor">${stats.total}</div>
        </div>
        
        <div class="stat-card">
            <h3>Aritmética</h3>
            <div class="valor">${stats.porTipo['aritmética'] || 0}</div>
        </div>
        
        <div class="stat-card">
            <h3>Geométrica</h3>
            <div class="valor">${stats.porTipo['geométrica'] || 0}</div>
        </div>
        
        <div class="stat-card">
            <h3>Polinómica</h3>
            <div class="valor">${stats.porTipo['polinómica'] || 0}</div>
        </div>
        
        <div class="stat-card">
            <h3>Fibonacci</h3>
            <div class="valor">${stats.porTipo['fibonacci'] || 0}</div>
        </div>
        
        <div class="stat-card">
            <h3>Última Predicción</h3>
            <div class="valor">${stats.ultimaPrediccion ? formatearNumero(stats.ultimaPrediccion.prediccion) : 'N/A'}</div>
        </div>
    `;

    elementos.estadisticas.innerHTML = html;
}

// ==================== GRÁFICOS ====================

function actualizarGrafico() {
    if (appState.memories.length === 0) {
        elementos.infoGrafico.innerHTML = '<p>No hay datos para mostrar</p>';
        return;
    }

    const ultimoRecuerdo = appState.memories[0];
    const secuencia = ultimoRecuerdo.secuencia;
    const proximosCinco = ultimoRecuerdo.proximosCinco;
    const todos = [...secuencia, ...proximosCinco];

    const etiquetas = todos.map((_, i) => `n${i + 1}`);

    if (appState.chart) {
        appState.chart.destroy();
    }

    appState.chart = new Chart(elementos.contextoGrafico, {
        type: 'line',
        data: {
            labels: etiquetas,
            datasets: [
                {
                    label: 'Secuencia Original',
                    data: secuencia,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#667eea'
                },
                {
                    label: 'Predicción (Próximos 5)',
                    data: [...Array(secuencia.length).fill(null), ...proximosCinco],
                    borderColor: '#48bb78',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#48bb78',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--color-texto)',
                        usePointStyle: true,
                        padding: 15
                    }
                },
                title: {
                    display: true,
                    text: `Visualización - ${ultimoRecuerdo.tipo.toUpperCase()}`,
                    color: 'var(--color-primario)',
                    font: { size: 14 }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(102, 126, 234, 0.1)' },
                    ticks: { color: 'var(--color-texto-secundario)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'var(--color-texto-secundario)' }
                }
            }
        }
    });

    elementos.infoGrafico.innerHTML = `
        <strong>Tipo:</strong> ${ultimoRecuerdo.tipo}<br>
        <strong>Secuencia:</strong> ${secuencia.join(', ')}<br>
        <strong>Fórmula:</strong> ${ultimoRecuerdo.analisis.formula}
    `;
}

// ==================== NAVEGACIÓN ====================

function cambiarTab(tab) {
    elementos.botonesTabs.forEach(b => b.classList.remove('activo'));
    elementos.tabsContenido.forEach(t => t.classList.remove('activo'));

    document.querySelector(`[data-tab="${tab}"]`).classList.add('activo');
    document.getElementById(`tab-${tab}`).classList.add('activo');

    if (tab === 'graficos') {
        setTimeout(() => actualizarGrafico(), 100);
    } else if (tab === 'analisis') {
        actualizarEstadisticas();
    } else if (tab === 'historial') {
        cargarRecuerdos();
    }
}

function cambiarFiltro(tipo) {
    appState.currentFilters = tipo;
    document.querySelectorAll('.boton-filtro').forEach(b => b.classList.remove('activo'));
    document.querySelector(`[data-tipo="${tipo}"]`).classList.add('activo');
    actualizarListaHistorial();
}

// ==================== UTILIDADES ====================

function limpiarEntrada() {
    elementos.inputSecuencia.value = '';
    limpiarResultado();
}

function formatearNumero(num) {
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
}

async function confirmarBorrarHistorial() {
    if (confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
        try {
            const respuesta = await fetch(`${appState.apiBaseUrl}/memories`, {
                method: 'DELETE'
            });
            const datos = await respuesta.json();

            if (datos.success) {
                appState.memories = [];
                actualizarListaHistorial();
                limpiarResultado();
                actualizarEstadisticas();
                alert('Historial borrado correctamente');
            }
        } catch (error) {
            alert('Error borrando historial: ' + error.message);
        }
    }
}

// ==================== SALUD DEL SERVIDOR ====================

async function verificarSalud() {
    try {
        const respuesta = await fetch(`${appState.apiBaseUrl}/health`);
        const datos = await respuesta.json();

        if (datos.success) {
            elementos.indicadorSalud.style.background = '#48bb78';
            elementos.estadoServidor.textContent = `✓ En línea (${datos.memoriesCount} recuerdos)`;
        }
    } catch (error) {
        elementos.indicadorSalud.style.background = '#f56565';
        elementos.estadoServidor.textContent = '✗ Desconectado';
    }
}

// ==================== INICIALIZACIÓN ====================

console.log('🏰 La Cámara de Ecos V3.0 - Cliente iniciado correctamente');
