### BASE ###
FROM node:18-alpine AS base
LABEL org.opencontainers.image.authors="dani@dani-pi.com"

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

EXPOSE 3000

WORKDIR /app

RUN apk add --no-cache libc6-compat


### DEVELOPMENT
FROM base AS development
ENV NODE_ENV development

COPY package*.json ./
RUN npm ci
COPY . .

ENTRYPOINT [ "npm", "run", "start:dev" ]


### BASE
FROM development AS builder
ENV NODE_ENV production
RUN npm run build


### RUNNER ###
FROM base AS runner
COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

CMD ["node", "server.js"]