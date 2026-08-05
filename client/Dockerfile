# Stage 1: build the static Vite bundle
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite bakes VITE_* vars into the bundle at build time, not runtime — pass them
# as build args (docker-compose.yml wires these from the host environment).
ARG VITE_BACKEND_URL
ARG VITE_OPENWEATHER_API_KEY
ARG VITE_GEMINI_API_KEY
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL \
    VITE_OPENWEATHER_API_KEY=$VITE_OPENWEATHER_API_KEY \
    VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

RUN npm run build

# Stage 2: serve the built bundle with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
