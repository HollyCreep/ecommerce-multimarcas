FROM node:14-stretch-slim as builder-front
WORKDIR "/home/node/app"
COPY . /home/node/app
RUN npm install --no-optional
RUN npm run generate

FROM nginx
WORKDIR "/usr/share/nginx/html"
COPY --from=builder-front /home/node/app/dist /usr/share/nginx/html
COPY ./substitute_environment_variables.sh /substitute_environment_variables.sh
RUN chmod +x /substitute_environment_variables.sh
ENTRYPOINT ["/substitute_environment_variables.sh"]

