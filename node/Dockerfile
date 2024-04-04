FROM node:latest

RUN apt-get update && \
    apt-get install -y iputils-ping netcat-openbsd

WORKDIR /node

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]