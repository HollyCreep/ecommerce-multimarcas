FROM node:19-alpine3.17 as builder-front

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock yarn.lock ./

RUN yarn install

COPY . .

RUN yarn generate

FROM nginx:1.23.3
WORKDIR "/usr/share/nginx/html"
COPY --from=builder-front /home/node/app/.output/public /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]