FROM node:14-alpine as builder
WORKDIR /app
RUN yarn global add nx
COPY package.json yarn.lock /app/
RUN yarn install
COPY babel.config.json nx.json tsconfig.base.json workspace.json /app/
COPY tools /app/tools/
COPY libs /app/libs/

FROM builder as builder-api
COPY apps/api/ /app/apps/api/
RUN nx run api:build:production --with-deps --generatePackageJson

FROM builder as builder-web

ARG API_URL
ARG API_URL_INTERNAL
ARG NEXTAUTH_URL
ARG NEXTAUTH_URL_INTERNAL
ARG JWT_SECRET

ENV NEXT_PUBLIC_API_URL=$API_URL
ENV NODE_API_URL_INTERNAL=$API_URL_INTERNAL
ENV NODE_JWT_SECRET=$JWT_SECRET
ENV NODE_NEXTAUTH_URL=$NEXTAUTH_URL
ENV NODE_NEXTAUTH_URL_INTERNAL=$NEXTAUTH_URL_INTERNAL

COPY apps/web/ /app/apps/web/
RUN nx run web:build:production --with-deps --generatePackageJson

FROM builder as builder-admin
COPY apps/admin/ /app/apps/admin/
RUN nx run admin:build:production


#START: API ##################################
FROM node:14-alpine as api

WORKDIR /app
COPY docker/api/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
COPY docker/api/ormconfig.js /app/ormconfig.js
COPY --from=builder-api /app/dist/apps/api/ /app/
COPY --from=builder-api /app/apps/api/src/migrations/ /app/migrations/
RUN yarn install --prod && yarn add mysql --prod

EXPOSE 3333

ENTRYPOINT ["docker-entrypoint"]
CMD ["node","main.js"]
#END: API ####################################


#START: WEB ##################################
FROM node:14-alpine as web

WORKDIR  /app
COPY --from=builder-web /app/dist/apps/web/package.json /app/
RUN yarn install --prod
COPY --from=builder-web /app/dist/apps/web/public/ /app/public/
COPY --from=builder-web /app/dist/apps/web/.next/ /app/.next/

EXPOSE 3000
CMD [ "yarn", "start" ]
#END: WEB ####################################


#START: ADMIN ################################
FROM nginx:1.20 as admin

COPY --from=builder-admin /app/dist/apps/admin/ /usr/share/nginx/html/
#END: ADMIN ##################################


#START: SERVER ###############################
FROM nginx:1.20 as server

COPY docker/server/docker-entrypoint.sh /usr/local/bin/docker-entrypoint

ENV API_SERVER_NAME=api.localhost
ENV WEB_SERVER_NAME=web.localhost
ENV ADMIN_SERVER_NAME=admin.localhost

COPY docker/server/*.conf /etc/nginx/conf.d/

ENTRYPOINT ["docker-entrypoint"]
#END: SERVER #################################
