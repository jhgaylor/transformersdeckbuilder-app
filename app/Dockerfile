# build environment
FROM node:9.6.1 as builder

RUN mkdir /app
WORKDIR /app

# add node modules .bin to path
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine

RUN rm -rf /etc/nginx/conf.d && mkdir /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
