FROM node:14
WORKDIR /dms-ui
COPY package.json .
RUN npm install
COPY . .
CMD npm start