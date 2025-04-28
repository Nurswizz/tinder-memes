FROM node:23-slim

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

EXPOSE 5000

CMD ["node", "index.js"]
