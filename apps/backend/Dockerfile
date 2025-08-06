# Build Stage
FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build backend

# Runtime Stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/backend ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main.js"]