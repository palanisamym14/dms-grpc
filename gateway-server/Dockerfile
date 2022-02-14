FROM node:14
WORKDIR /rpc-gateway-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start