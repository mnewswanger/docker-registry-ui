FROM node as builder

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

RUN npm run build

FROM nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
