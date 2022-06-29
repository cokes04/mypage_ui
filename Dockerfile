FROM node:16.15.1 as builder

WORKDIR /app
COPY ./package*.json ./ 
RUN npm install # npm install
COPY . . 
RUN npm run build 

FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
