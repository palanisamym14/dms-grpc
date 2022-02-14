FROM node:14
WORKDIR /rpc-server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 30034
CMD npm start