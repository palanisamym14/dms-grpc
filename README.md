# Docker Compose MERN Stack with Nginx example

Dockerize fullstack: React, Nodejs Express and MongoDB (MERN stack application) example using Docker Compose with Nginx.

## ENV
```bash
TOKEN_KEY=secret
DB_CONNECTION_STRING= (mlab mongo url)


RPC_SERVER_BASE_URL=0.0.0.0
RPC_SERVER_BASE_PORT=30034

NODE_LOCAL_PORT=8080

REACT_PORT=5000

TOKEN_KEY=secret

```

##swagger doc
```bash
http://host:port/api-docs
```
## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the MongoDB and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```
