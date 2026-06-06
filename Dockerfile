FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npx pnpm install
COPY . .
RUN npx pnpm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
