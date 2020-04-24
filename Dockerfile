FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:lts-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --only=production

COPY . .

COPY --from=build /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]