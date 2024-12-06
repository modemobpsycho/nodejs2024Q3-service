FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src/common/prisma ./src/common/prisma

RUN npx prisma generate

COPY --from=development /usr/src/app/doc ./doc

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000