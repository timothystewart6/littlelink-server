FROM node:24.11.1-alpine AS node-build
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY src ./src
COPY public ./public
RUN yarn install --frozen-lockfile --check-files --network-timeout 600000
RUN yarn build --noninteractive
RUN yarn install --frozen-lockfile --check-files --production --modules-folder node_modules_prod --network-timeout 600000

FROM node:24.11.1-alpine
WORKDIR /usr/src/app
ENV NODE_ENV production
RUN mkdir -p /node_modules
COPY --from=node-build /usr/src/app/build ./build
COPY --from=node-build /usr/src/app/node_modules_prod ./node_modules
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/healthcheck || exit 1
CMD [ "node", "build/server.js" ]

