# 🏰 La Cámara de Ecos V3.0 - Documentación de API

## Introducción

API RESTful completa para el Predictor Avanzado de Secuencias Matemáticas con soporte para múltiples tipos de secuencias y análisis histórico.

## 📋 Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Endpoints](#endpoints)
3. [Tipos de Secuencias](#tipos-de-secuencias)
4. [Códigos de Error](#códigos-de-error)
5. [Ejemplos](#ejemplos)

---

## Autenticación

Actualmente la API no requiere autenticación. Todos los endpoints son públicos.

---

## Endpoints

### 🔮 POST /api/predict

Analiza una secuencia y predice el siguiente número.

**Request:**
```json
{
  "sequence": [3, 6, 9, 12, 15]
}
```

**Response (Exitosa):**
```json
{
  "success": true,
  "echoNumber": 1,
  "type": "aritmética",
  "sequence": [3, 6, 9, 12, 15],
  "prediction": 18,
  "nextFive": [18, 21, 24, 27, 30],
  "formula": "aₙ = 3 + (n-1) × 3",
  "analysis": {
    "diferencia": 3,
    "siguiente": 18,
    "proximosCinco": [18, 21, 24, 27, 30],
    "formula": "aₙ = 3 + (n-1) × 3"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "No es una progresión aritmética. Se esperaba diferencia: 3, pero se obtuvo 4 entre 12 y 16"
}
```

**Tipos de secuencia retornables:**
- `aritmética` - Diferencia constante
- `geométrica` - Razón constante
- `polinómica` - Cuadrática principalmente
- `fibonacci` - Suma de anteriores
- `desconocida` - No reconocida

---

### 📜 GET /api/memories

Obtiene el historial de predicciones realizadas.

**Query Parameters:**
- `tipo` (opcional): Filtrar por tipo de secuencia
- `limit` (opcional, default: 100): Número máximo de resultados

**Examples:**
```
GET /api/memories
GET /api/memories?tipo=aritmética
GET /api/memories?limit=50&tipo=geométrica
```

**Response:**
```json
{
  "success": true,
  "count": 25,
  "memories": [
    {
      "echoNumero": 25,
      "tipo": "aritmética",
      "secuencia": [5, 10, 15],
      "prediccion": 20,
      "proximosCinco": [20, 25, 30, 35, 40],
      "marca": "2026-01-28T21:45:30.123Z"
    },
    ...
  ]
}
```

---

### 🗑️ DELETE /api/memories

Borra todo el historial de predicciones.

**Request:**
```
DELETE /api/memories
```

**Response:**
```json
{
  "success": true,
  "message": "Todos los recuerdos han sido borrados"
}
```

---

### 📊 GET /api/statistics

Obtiene estadísticas de la sesión actual.

**Response:**
```json
{
  "success": true,
  "sessionStats": {
    "total": 5,
    "porTipo": {
      "aritmética": 2,
      "geométrica": 2,
      "polinómica": 1
    },
    "ultimaPrediccion": {
      "echoNumero": 5,
      "tipo": "polinómica",
      "prediccion": 36,
      ...
    },
    "promedioPrimerosElementos": 8
  },
  "persistentStats": {
    "totalPredicciones": 234,
    "tiposPrediccion": [
      { "tipo": "aritmética", "cantidad": 120 },
      { "tipo": "geométrica", "cantidad": 80 },
      { "tipo": "polinómica", "cantidad": 34 }
    ],
    "primeraPrediccion": "2026-01-25T10:30:00.000Z",
    "ultimaActualizacion": "2026-01-28T21:50:00.000Z"
  }
}
```

---

### 📈 GET /api/types/:type/history

Obtiene historial filtrado por tipo de secuencia.

**Path Parameters:**
- `type`: `aritmética`, `geométrica`, `polinómica`, o `fibonacci`

**Query Parameters:**
- `limit` (opcional, default: 50): Número máximo de resultados

**Example:**
```
GET /api/types/aritmética/history?limit=20
```

**Response:**
```json
{
  "success": true,
  "type": "aritmética",
  "count": 20,
  "memories": [...]
}
```

---

### 💾 GET /api/database/summary

Obtiene resumen de datos persistentes en BD SQLite.

**Response:**
```json
{
  "success": true,
  "database": {
    "totalPredicciones": 234,
    "tiposPrediccion": [
      { "tipo": "aritmética", "cantidad": 120 },
      { "tipo": "geométrica", "cantidad": 80 },
      { "tipo": "polinómica", "cantidad": 34 }
    ],
    "primeraPrediccion": "2026-01-25T10:30:00.000Z",
    "ultimaActualizacion": "2026-01-28T21:50:00.000Z"
  }
}
```

---

### 📥 POST /api/export

Exporta todos los datos de la sesión en formato JSON.

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "3.0.0",
    "fecha": "2026-01-28T21:52:00.000Z",
    "estadisticas": {...},
    "recuerdos": [...]
  },
  "timestamp": "2026-01-28T21:52:00.000Z"
}
```

---

### 📋 GET /api/logs/recent

Obtiene logs recientes del servidor.

**Query Parameters:**
- `lines` (opcional, default: 50): Número de líneas a retornar

**Response:**
```json
{
  "success": true,
  "count": 50,
  "logs": [
    "[2026-01-28T21:52:00.123Z] [INFO] Predicción aritmética | {\"longitud\":5,\"exito\":true,\"prediccion\":18}",
    ...
  ]
}
```

---

### ❤️ GET /api/health

Health check del servidor.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-01-28T21:52:00.000Z",
  "uptime": 3652.456,
  "memoriesCount": 5
}
```

---

## Tipos de Secuencias

### Aritmética
Diferencia constante entre términos.

**Ejemplo:** `3, 6, 9, 12` → Diferencia: 3 → Siguiente: 15

**Fórmula:** `aₙ = a₁ + (n-1) × d`

### Geométrica
Razón constante entre términos consecutivos.

**Ejemplo:** `2, 4, 8, 16` → Razón: 2 → Siguiente: 32

**Fórmula:** `aₙ = a₁ × r^(n-1)`

### Polinómica
Segundas (o superiores) diferencias constantes.

**Ejemplo:** `1, 4, 9, 16, 25` → Cuadrática → Siguiente: 36

**Fórmula:** `aₙ = an² + bn + c`

### Fibonacci
Cada término es suma de los dos anteriores.

**Ejemplo:** `1, 1, 2, 3, 5, 8` → Siguiente: 13

**Fórmula:** `aₙ = aₙ₋₁ + aₙ₋₂`

---

## Códigos de Error

| Código | Mensaje | Descripción |
|--------|---------|-------------|
| 400 | Se requiere una secuencia | Falta el campo `sequence` en el request |
| 400 | La secuencia debe contener al menos 2 números | Menos de 2 elementos |
| 400 | Todos los elementos deben ser números válidos | Contiene valores no numéricos |
| 400 | No es una progresión aritmética... | La secuencia no sigue el patrón esperado |
| 400 | No se reconoce el patrón de secuencia | No coincide con ninguno de los tipos soportados |
| 404 | Ruta no encontrada | Endpoint inexistente |
| 500 | Error interno del servidor | Error no previsto en el servidor |

---

## Ejemplos

### cURL

```bash
# Predicción
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"sequence": [3, 6, 9, 12]}'

# Obtener historial
curl http://localhost:3000/api/memories

# Obtener estadísticas
curl http://localhost:3000/api/statistics

# Health check
curl http://localhost:3000/api/health
```

### JavaScript/Fetch

```javascript
// Predicción
const respuesta = await fetch('/api/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sequence: [3, 6, 9, 12] })
});
const datos = await respuesta.json();
console.log(datos);

// Historial
const memories = await fetch('/api/memories').then(r => r.json());
console.log(memories);

// Estadísticas
const stats = await fetch('/api/statistics').then(r => r.json());
console.log(stats);
```

### Python

```python
import requests
import json

# Predicción
url = 'http://localhost:3000/api/predict'
datos = {'sequence': [3, 6, 9, 12]}
respuesta = requests.post(url, json=datos)
print(respuesta.json())

# Historial
url = 'http://localhost:3000/api/memories'
respuesta = requests.get(url)
print(respuesta.json())
```

---

## Rate Limiting

Actualmente no hay rate limiting implementado. Se recomienda agregarlo en producción.

## Versionamiento

API v1.0.0 compatible con versión del servidor 3.0.0

---

**Última actualización:** 2026-01-28 | **Estado:** Production-Ready
