FROM node:24.18.0-alpine AS node-build
WORKDIR /usr/src/app

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
RUN yarn install --frozen-lockfile --check-files --network-timeout 600000
RUN yarn build
RUN yarn install --frozen-lockfile --check-files --production --ignore-scripts --network-timeout 600000

FROM node:24.18.0-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=node-build /usr/src/app/.next ./.next
RUN rm -rf \
    .next/cache \
    .next/dev \
    .next/turbopack \
    .next/diagnostics \
    .next/trace* \
    .next/*.nft.json \
    && find .next -name '*.map' -delete

COPY --from=node-build /usr/src/app/public ./public
COPY --from=node-build /usr/src/app/dist-server ./dist-server
COPY --from=node-build /usr/src/app/node_modules ./node_modules

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/healthcheck || exit 1
CMD [ "node", "dist-server/server.js" ]
