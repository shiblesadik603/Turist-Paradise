# node:20-slim (glibc, not alpine) — bcrypt ships prebuilt native bindings that
# don't reliably match alpine's musl libc, so slim avoids a native rebuild step.
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Real uploads should be a mounted volume in production — this just gives the
# app a writable directory to start with if none is mounted.
RUN mkdir -p uploads

EXPOSE 3001

CMD ["node", "src/server.js"]
