# Etapa de build
FROM node:20-alpine as builder

WORKDIR /app

COPY . .

COPY apps/frontend/.env .env

RUN npm install

RUN export $(cat .env | grep ^REACT_APP_ | xargs) && \
    npx nx build frontend

# Etapa final
FROM nginx:alpine

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]