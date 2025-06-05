FROM node:22.16.0-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force glob rimraf
RUN npm install --force
COPY . .
RUN npm run build
HEALTHCHECK --interval=5s --timeout=3s --start-period=15s --retries=5\
  CMD curl -f http://localhost:${APP_LISTEN_PORT}/status || exit 1
