FROM nikolaik/python-nodejs:python3.9-nodejs16

WORKDIR ~/myssr
COPY . .

ENV SERVER_PORT=80
ENV CLIENT_PORT=1080

EXPOSE $SERVER_PORT
EXPOSE $CLIENT_PORT

CMD cd ./ssr-local-remote && yarn run start
