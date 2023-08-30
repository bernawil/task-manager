# NOTE: Why do we specify alpine version here?
#   Because if not, we had situations where it would use the different version
#   locally and on Github CI. This way we ensure exact version is used,
#   and also have control over updating it (instead of update surprising us).
FROM node:18-alpine3.17 AS node


# We split Dockerfile into base, server-builder and server-production.
# This way we have separate situations -> in server-builder we build all
# we need to run the server, and then in server-production we start fresh
# and just copy what we need from server-builder, avoiding intermediate
# artifacts and any settings / pollution we don't need in production
# but only for building.


FROM node AS base
RUN apk --no-cache -U upgrade # To ensure any potential security patches are applied.
# TODO: Remove line below (installation of openssl 1.1) once Prisma adds support for
#   openssl 3 on alpine. Alpine >= 3.17 has openssl 3 as default.
#   Relevant GH issue: https://github.com/wasp-lang/wasp/issues/877
RUN apk add --no-cache openssl1.1-compat
RUN apk add --no-cache python3

FROM base AS server-builder
RUN apk add --no-cache build-base libtool autoconf automake
WORKDIR /app
COPY server/ ./server/
# Install npm packages, resulting in node_modules/.
RUN cd server && npm install
COPY db/schema.prisma ./db/
RUN cd server && PRISMA_CLIENT_OUTPUT_DIR=../server/node_modules/.prisma/client/ npx prisma generate --schema='../db/schema.prisma'
# Building the server should come after Prisma generation.
RUN cd server && npm run build


# TODO: Use pm2?
# TODO: Use non-root user (node).
FROM base AS server-production
# In case they want to use python3 in their app.
ENV NODE_ENV production
WORKDIR /app
COPY --from=server-builder /app/server/node_modules ./server/node_modules
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/package*.json ./server/
COPY --from=server-builder /app/server/scripts ./server/scripts
COPY db/ ./db/
EXPOSE ${PORT}
WORKDIR /app/server
ENTRYPOINT ["npm", "run", "start-production"]


# Any user-defined Dockerfile contents will be appended below.

