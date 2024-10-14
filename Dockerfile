FROM node:20-alpine

WORKDIR /user/src/main

COPY package* .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
