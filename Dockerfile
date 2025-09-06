FROM node:18-alpine

# Установка зависимых пакетов для Prisma
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    openssl \
    postgresql-client

# Рабочая директория
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Копируем Prisma schema
COPY prisma/schema.prisma ./prisma/

# Устанавливаем зависимости (ВКЛЮЧАЯ devDependencies для разработки)
RUN npm ci --include=dev

# Генерируем Prisma client
RUN npx prisma generate

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт
EXPOSE 5555

# Команда запуска
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]