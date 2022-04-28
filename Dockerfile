FROM node:14 AS builder

WORKDIR app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .

CMD ["nginx","-g","daemon off;"]