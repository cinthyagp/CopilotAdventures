# 🚀 Guía de Despliegue - La Cámara de Ecos V3.0

## Índice
1. [Despliegue Local](#despliegue-local)
2. [Despliegue en Producción](#despliegue-en-producción)
3. [Despliegue en Docker](#despliegue-en-docker)
4. [Despliegue en Vercel](#despliegue-en-vercel)
5. [Solución de Problemas](#solución-de-problemas)

---

## Despliegue Local

### Requisitos Mínimos
- **Node.js:** >= 14.0.0
- **npm:** >= 6.0.0
- **Espacio en disco:** >= 150 MB (incluye node_modules)
- **RAM:** >= 512 MB

### Pasos de Instalación

#### 1. Clonar o descargar el proyecto
```bash
cd /ruta/al/proyecto
git clone <repositorio> echo-chamber
cd echo-chamber
```

#### 2. Instalar dependencias
```bash
npm install
```

**Salida esperada:**
```
49 packages are looking for funding
  run npm fund for details
found 0 vulnerabilities
```

#### 3. Ejecutar aplicación

**Opción A - Interfaz web (RECOMENDADO)**
```bash
npm run web
```
Accede a: http://localhost:3000

**Opción B - Interfaz CLI**
```bash
npm start
```

**Opción C - Modo desarrollo (con hot-reload)**
```bash
npm run dev
```

---

## Despliegue en Producción

### 1. Optimizar para Producción

```bash
# Instalar solo dependencias de producción
npm install --production

# Limpiar caché
npm cache clean --force
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz:
```env
# Servidor
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Base de datos
DATA_DIR=/var/lib/echo-chamber/data
LOG_DIR=/var/log/echo-chamber

# Logging
DEBUG=false
LOG_LEVEL=info
```

### 3. Crear usuario de sistema (Linux/Mac)

```bash
# Crear usuario sin shell
sudo useradd -r -s /bin/false echo-chamber

# Crear directorios con permisos
sudo mkdir -p /var/lib/echo-chamber/data
sudo mkdir -p /var/log/echo-chamber
sudo chown -R echo-chamber:echo-chamber /var/lib/echo-chamber
sudo chown -R echo-chamber:echo-chamber /var/log/echo-chamber
sudo chmod 755 /var/lib/echo-chamber
sudo chmod 755 /var/log/echo-chamber
```

### 4. Usar PM2 para Administración de Procesos

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Crear archivo ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'echo-chamber',
    script: './server-v3.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '500M',
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF

# Iniciar con PM2
pm2 start ecosystem.config.js

# Guardar configuración
pm2 save

# Crear startup script
pm2 startup

# Ver logs
pm2 logs echo-chamber
```

### 5. Configurar Nginx como Proxy Inverso

```nginx
# /etc/nginx/sites-available/echo-chamber
server {
    listen 80;
    server_name tudominio.com;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tudominio.com;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;

    # Optimizaciones SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Compresión
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # Proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Headers de seguridad
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache de archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Logs
    access_log /var/log/nginx/echo-chamber-access.log;
    error_log /var/log/nginx/echo-chamber-error.log;
}
```

Habilitar sitio:
```bash
sudo ln -s /etc/nginx/sites-available/echo-chamber /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

---

## Despliegue en Docker

### 1. Crear Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias de sistema
RUN apk add --no-cache tini

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar aplicación
COPY . .

# Crear directorios
RUN mkdir -p data logs

# Cambiar a usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Iniciar con tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server-v3.js"]

EXPOSE 3000
```

### 2. Crear docker-compose.yml

```yaml
version: '3.8'

services:
  echo-chamber:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      DEBUG: 'false'
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 40s
    labels:
      - "com.example.description=La Cámara de Ecos V3.0"
```

### 3. Construir e Iniciar

```bash
# Construir imagen
docker build -t echo-chamber:v3.0 .

# Iniciar con docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

## Despliegue en Vercel

### 1. Preparar Proyecto

Crear `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server-v3.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server-v3.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 2. Desplegar

```bash
# Instalar CLI de Vercel
npm install -g vercel

# Desplegar
vercel

# Ver en producción
vercel --prod
```

### 3. Configurar Variables de Entorno en Vercel

1. Ir a https://vercel.com/dashboard
2. Seleccionar proyecto
3. Settings → Environment Variables
4. Añadir:
   - `NODE_ENV=production`
   - `PORT=3000`

---

## Solución de Problemas

### El servidor no inicia

```bash
# Verificar puerto en uso
lsof -i :3000

# Liberar puerto (Linux/Mac)
kill -9 <PID>

# En Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Errores de dependencias

```bash
# Limpiar caché
npm cache clean --force

# Reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Base de datos corrupta

```bash
# Hacer backup
cp data/ecos-data.json data/ecos-data.json.backup

# Limpiar
rm data/ecos-data.json

# La aplicación recreará la base de datos en el próximo inicio
npm run web
```

### Problemas de memoria

```bash
# Monitorear uso
top -p $(pgrep -f "node server-v3.js")

# En Windows
tasklist | findstr node
wmic process where name="node.exe" get ProcessId,VirtualSize
```

### Logs no se crean

```bash
# Verificar permisos
ls -la logs/

# Crear directorio si no existe
mkdir -p logs

# Asignar permisos
chmod 755 logs
```

---

## Monitoreo y Mantenimiento

### Monitoreo Básico

```bash
# Ver estado de proceso
pm2 status

# Estadísticas
pm2 monit

# Logs
pm2 logs echo-chamber --lines 100

# Reiniciar
pm2 restart echo-chamber

# Detener
pm2 stop echo-chamber

# Iniciar
pm2 start echo-chamber
```

### Backup de Datos

```bash
# Crear backup
tar -czf backup-echo-chamber-$(date +%Y%m%d).tar.gz \
  data/ecos-data.json \
  logs/

# Transferir a servidor remoto
scp backup-echo-chamber-*.tar.gz usuario@servidor:/backups/

# Restaurar
tar -xzf backup-echo-chamber-*.tar.gz
```

### Actualización de Versión

```bash
# Detener
pm2 stop echo-chamber

# Hacer backup
cp -r data data.backup

# Actualizar código
git pull origin main

# Instalar dependencias
npm install --production

# Iniciar
pm2 start echo-chamber

# Ver logs
pm2 logs echo-chamber
```

---

## Checklist de Despliegue

- [ ] Variables de entorno configuradas
- [ ] Puertos y firewalls abiertos
- [ ] Directorios `data/` y `logs/` creados con permisos correctos
- [ ] Dependencias instaladas (`npm install`)
- [ ] Base de datos inicializada
- [ ] SSL/HTTPS configurado
- [ ] Proxy inverso configurado
- [ ] Health checks funcionando
- [ ] Logs monitoreados
- [ ] Backups configurados
- [ ] Tests pasando (`npm test`)

---

## Soporte

Para más ayuda, consulta:
- [API-DOCS.md](./API-DOCS.md) - Documentación de API
- [README-V3.md](./README-V3.md) - Guía de uso
- [PROYECTO-COMPLETO.md](./PROYECTO-COMPLETO.md) - Resumen del proyecto

---

**Versión:** 3.0.0  
**Última actualización:** $(date '+%Y-%m-%d')  
**Estado:** ✅ Listo para producción
