FROM ficusio/node-alpine
MAINTAINER Marcos Cano <jmarcos.cano@gmail.com>
LABEL version=1.1 description="image used for Docker meetup Guatemala"

ENV PORT 3000
ENV app_home=/app

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app

EXPOSE ${PORT}
VOLUME '/app'

CMD ["node" , "app.js"]
