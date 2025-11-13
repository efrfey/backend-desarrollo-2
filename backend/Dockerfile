# Usa Node.js 20 (estable y compatible con NestJS)
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias desde backend/
COPY backend/package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código desde backend/
COPY backend/ .

# Compilamos el código NestJS (de TypeScript a JS)
RUN npm run build

# Exponemos el puerto del backend
EXPOSE 3000

# Comando para iniciar el servidor NestJS compilado
CMD ["node", "dist/main.js"]
