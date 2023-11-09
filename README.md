# full-arch-next-nest

Development and production environment for simple deployments based on docker compose

## Features

### HTTPS

This architecture encourages the use of HTTPS in every part of the development process.

- On Development will run a local certificate
- On Production will auto-request and auto-renew the certificates in the server names from nginx

## Getting started

The sample is based in a next frontend and a nest backend, more services can be added at pleasure.

### Preparing the environment

You'll need to create an `.env` file, a sample is provided as `.env.sample`.

The only required addition will be to add your `CERTBOT_EMAIL` ;).

### Run in development mode

The development mode supports hot reload from the local folders to the docker images in both
frontend and backend code.

In this mode a PostgreSQL server will be made available.

After any install you'll need to recreate the images: stopping and building again.

Command: `docker compose up --build`

### Run in production mode

The production mode is based on the last development image to avoid rebuilding and deploying faster.

The PostgreSQL server is not present and the environment variables should be provided to enhanced security.

Command: `docker compose -f docker-compose.yml up --build`
