FROM node:lts-slim as builder
COPY ./frontend /app/frontend
WORKDIR /app/frontend
RUN yarn config set registry https://registry.npm.taobao.org -g
RUN yarn
RUN yarn build
FROM nginx:1.23.3
COPY --from=builder /app/frontend/dist/* /usr/share/nginx/html