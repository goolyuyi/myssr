FROM nikolaik/python-nodejs:python3.9-nodejs16

WORKDIR ~/myssr
COPY . .

ENV SERVER_PORT=1080
EXPOSE $SERVER_PORT
CMD cd ./ssr-local-remote && yarn run start
