FROM node:24.18.0-alpine AS node-build
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY src ./src
COPY public ./public
COPY app ./app
COPY next.config.js ./
COPY jsconfig.json ./
COPY server.js ./
RUN yarn install --frozen-lockfile --check-files --network-timeout 600000
RUN yarn build
RUN yarn install --frozen-lockfile --check-files --production --ignore-scripts --network-timeout 600000

FROM node:24.18.0-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
COPY --from=node-build /usr/src/app/.next ./.next
COPY --from=node-build /usr/src/app/public ./public
COPY --from=node-build /usr/src/app/server.js ./
COPY --from=node-build /usr/src/app/next.config.js ./
COPY --from=node-build /usr/src/app/package.json ./
COPY --from=node-build /usr/src/app/node_modules ./node_modules
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/healthcheck || exit 1
CMD [ "node", "server.js" ]
