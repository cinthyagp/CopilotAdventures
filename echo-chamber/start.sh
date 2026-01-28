#!/bin/bash

# 🏰 La Cámara de Ecos V3.0 - Script de Inicio

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║          🏰 LA CÁMARA DE ECOS V3.0 🏰                     ║"
echo "║                                                            ║"
echo "║     Predictor Avanzado de Secuencias Matemáticas         ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Verificar dependencias
echo "📦 Verificando dependencias..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

echo "✅ Node.js y npm detectados"
echo ""

# Mostrar menú
echo "¿Qué deseas hacer?"
echo ""
echo "1. 🖥️  Ejecutar interfaz de consola (CLI)"
echo "2. 🌐 Ejecutar servidor web (http://localhost:3000)"
echo "3. 🧪 Ejecutar tests"
echo "4. 👀 Ver cobertura de tests"
echo "5. 🔧 Modo desarrollo (con hot-reload)"
echo "6. 📚 Ver documentación"
echo "7. 💾 Ver estructura del proyecto"
echo "8. ❌ Salir"
echo ""
read -p "Elige una opción (1-8): " option

case $option in
    1)
        echo ""
        echo "🖥️  Iniciando interfaz de consola..."
        echo ""
        npm start
        ;;
    2)
        echo ""
        echo "🌐 Iniciando servidor web en http://localhost:3000"
        echo ""
        npm run web
        ;;
    3)
        echo ""
        echo "🧪 Ejecutando tests..."
        echo ""
        npm test
        ;;
    4)
        echo ""
        echo "👀 Generando cobertura de tests..."
        echo ""
        npm run test:coverage
        ;;
    5)
        echo ""
        echo "🔧 Iniciando modo desarrollo (hot-reload)..."
        echo ""
        npm run dev
        ;;
    6)
        echo ""
        echo "📚 Documentación disponible:"
        echo ""
        echo "Archivos principales:"
        ls -1 *.md 2>/dev/null | sed 's/^/  📄 /'
        echo ""
        ;;
    7)
        echo ""
        echo "📂 Estructura del proyecto:"
        echo ""
        tree -L 2 -I 'node_modules|.git' --charset ascii 2>/dev/null || find . -maxdepth 2 -type f \( -name "*.js" -o -name "*.html" -o -name "*.css" -o -name "*.md" \) ! -path "*/node_modules/*" ! -path "*/.git/*" | sort
        echo ""
        ;;
    8)
        echo "👋 ¡Hasta pronto!"
        exit 0
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac
