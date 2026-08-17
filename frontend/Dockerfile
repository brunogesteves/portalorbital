FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile && yarn cache clean

COPY . .

EXPOSE 3000

CMD ["yarn","run", "dev", "-H", "0.0.0.0", "-p", "3000"]