FROM oven/bun:1

WORKDIR /usr/src/app

# copy src code
COPY . .

# install dependencies
RUN bun install

ENV NODE_ENV=production
ENV DOCKER_CONTAINER=true

# run the app
EXPOSE 8080

# absolute path
CMD [ "bun", "ws:be" ]
