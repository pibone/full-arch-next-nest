### BASE ###
FROM node:18-alpine as base
LABEL org.opencontainers.image.authors="dani@dani-pi.com"

ENV NODE_ENV production

EXPOSE 3000

WORKDIR /app

RUN apk add --no-cache libc6-compat 



### DEVELOPMENT ###
FROM base as development
ENV NODE_ENV development

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

ENTRYPOINT [ "npm", "run", "start:dev" ]


### BUILDER ###
FROM development as builder
RUN npm run build
RUN npm ci --omit=dev && npm cache clean --force


### RUNNER ###
FROM base as runner
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

USER node

ENTRYPOINT [ "node", "./dist/main.js" ]
