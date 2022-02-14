FROM node:14
WORKDIR /dms-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start