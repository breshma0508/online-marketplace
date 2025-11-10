FROM node:18-alpine
WORKDIR /app
COPY pnpm-lock.yaml* package.json* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
ENV NODE_ENV=development
EXPOSE 5000
CMD ["pnpm", "dev"]
