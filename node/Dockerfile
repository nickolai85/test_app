FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y build-essential libssl-dev
RUN apt-get install -y curl
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN /usr/bin/npm install -g gulp
RUN npm i gulp

#RUN npm cache clean -f
#RUN npm install -g n
#RUN n stable
#RUN n 6.11.4
#RUN node -v