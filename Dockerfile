FROM nginx:alpine

WORKDIR /app/static

COPY ./build .
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]