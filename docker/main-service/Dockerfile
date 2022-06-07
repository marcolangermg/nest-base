FROM node:18.2.0 AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build
HEALTHCHECK --interval=5s --timeout=3s --start-period=15s --retries=5\
  CMD curl -f http://localhost:${SERVICE_PORT}/status || exit 1
