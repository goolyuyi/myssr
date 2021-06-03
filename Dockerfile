FROM nikolaik/python-nodejs:python3.9-nodejs16-slim

WORKDIR ~/myssr
COPY shadowsocksr shadowsocksr
COPY ssr-local-remote ssr-local-remote

ENV SERVER_PORT=80
ENV CLIENT_PORT=1080

EXPOSE $SERVER_PORT
EXPOSE $CLIENT_PORT

VOLUME ~/myssr/ssr-local-remote/private

CMD cd ./ssr-local-remote && yarn run start
