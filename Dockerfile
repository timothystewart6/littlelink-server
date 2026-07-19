# syntax=docker/dockerfile:1
FROM node:24.18.0-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS deps
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN --mount=type=cache,id=littlelink-yarn-v1-cache-v2,target=/usr/local/share/.cache/yarn/v6,sharing=locked \
    yarn install --frozen-lockfile --check-files --network-timeout 600000

FROM node:24.18.0-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS node-build
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package.json ./
COPY yarn.lock ./
COPY src ./src
COPY public ./public
COPY app ./app
COPY next.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.server.json ./
COPY next-env.d.ts ./
COPY server.ts ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=cache,id=littlelink-next-cache-v2,target=/usr/src/app/.next/cache,sharing=locked yarn build
RUN rm -rf \
    .next/standalone/node_modules/@img/sharp-libvips-linux-* \
    .next/standalone/node_modules/@img/sharp-linux-*

FROM node:24.18.0-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=node-build --chown=node:node /usr/src/app/.next/standalone ./
COPY --from=node-build --chown=node:node /usr/src/app/.next/static ./.next/static
COPY --from=node-build --chown=node:node /usr/src/app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/healthcheck || exit 1
CMD [ "node", "server.js" ]
