FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma.config.ts ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile --ignore-scripts && yarn cache clean

COPY . .
RUN chmod +x entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["./entrypoint.sh"]
CMD ["yarn", "dev"]