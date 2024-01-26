FROM almalinux:latest

COPY dist /home/dist
COPY node-v16.13.0-linux-x64.tar.xz /home

WORKDIR /home
RUN mkdir -p /home/dist/src && \
    mv /home/dist/server.bundle.js /home/dist/src/server.bundle.js && \
    mv /home/dist/server.bundle.js.LICENSE.txt /home/dist/src/server.bundle.js.LICENSE.txt && \
    xz -d node-v16.13.0-linux-x64.tar.xz && \
    tar -xvf node-v16.13.0-linux-x64.tar && \
    mv node-v16.13.0-linux-x64  /usr/local/node && \
    echo "export NODE_HOME=/usr/local/node" >> /etc/profile && \
    echo "export PATH=$NODE_HOME/bin:$PATH" >> /etc/profile && \
    echo "source /etc/profile" >> ~/.bashrc

WORKDIR /home/dist/src
EXPOSE 3000 2000
ENTRYPOINT ["/usr/local/node/bin/node", "server.bundle.js"]