# Document managemant system with gRPC


## ENV
```bash
TOKEN_KEY=secret
DB_CONNECTION_STRING= (mlab mongo url)


RPC_SERVER_BASE_URL=0.0.0.0
RPC_SERVER_BASE_PORT=30034

NODE_LOCAL_PORT=8080

REACT_APP_API_BASE_URL=http://127.0.0.1
REACT_APP_API_PORT=8080

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

### API DOC
Api swagger document avaliable in below link

```bash
http://localhost:8080/api/api-doc
```

### Healthcheck 
```bash
http://localhost:8080/api/health
```

### UI 
```bash
http://localhost
```
### Architecture Diagram
![Alt text](architecture_diagram%20.png?raw=true "Title")
### ER Diagram
![Alt text](er_digram.png?raw=true "Title")

