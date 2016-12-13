FROM smebberson/alpine-nginx
MAINTAINER marcos cano <jmarcos.cano@gmail.com>

RUN rm /etc/nginx/conf.d/*

ADD conf.d/ /etc/nginx/conf.d/

VOLUME ["/etc/nginx/conf.d/", "/var/log/nginx" ]

EXPOSE 80 443