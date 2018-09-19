FROM node:6.9.4

# Prepare app directory 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

# Install dependencies
COPY package.json /usr/src/app/
RUN npm install 

ADD . /usr/src/app/

EXPOSE 3000
