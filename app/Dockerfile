FROM ficusio/node-alpine
MAINTAINER Marcos Cano <jmarcos.cano@gmail.com>
LABEL version=1.1 description="image used for Docker meetup Guatemala"

ENV PORT=3000 app_home=/app

RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install 

COPY . ./

EXPOSE ${PORT}
VOLUME '/app'

CMD ["node" , "app.js"]
