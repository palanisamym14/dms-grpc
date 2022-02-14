FROM node:14
WORKDIR /rpc-gateway-server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7788
CMD npm start