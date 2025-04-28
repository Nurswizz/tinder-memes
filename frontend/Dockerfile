FROM node:23-slim

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY . ./

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

# 8. Serve the production build
CMD ["serve", "-s", "dist", "-l", "3000"]
