FROM node:14
WORKDIR /rpc-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start