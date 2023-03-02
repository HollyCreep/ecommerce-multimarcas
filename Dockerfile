FROM node:lts as builder

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock yarn.lock ./

RUN yarn install

COPY . .

RUN yarn generate

EXPOSE 4000
ENV HOST=0.0.0.0
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=4000

CMD [ "yarn", "start" ]

