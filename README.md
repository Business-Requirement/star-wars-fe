# React Typescript stater App

This React project is mainly use with Typescript, power by create-react-app

## I. vailable Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode at location: Open [http://localhost:3000](http://localhost:3000)

### `npm run build`

Builds the app for production to the `build` folder.

## II. Docker

To test docker locally you can use bellow command on your root project folder.
Notice: you need to install docker on your machine first

1. Build Docker image  
   `"docker build --rm -t <docker-name> ."` Usually we use `docker-name` with format `<project-name>:<tag>`  
   Example `"docker build --rm -t react-starter:latest ."`
2. Rund Docker  
   `"docker run -p 3000:3000 <docker-name>"` in this `3000:3000` has format `host-port:app-port` meaning that we forward app-port (app running in docker) to host-port (host machine port). So you can check the app running at `http://localhost:<host-port>`  
   To set environment to container we can use `"docker run -p 3001:3000 -e NODE_ENV=staging <docker-name>"`  
   Example `"docker run -p 3000:3000 react-starter:latest"`
3. Stop and Remove docker  
   `"docker stop <container-id>"`  
   `"docker rm <container-id>"`
   In this `<container-id>` you can find with command `"docker ps -a"`
