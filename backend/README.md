# Backend

## Install container
### 1. Install Rancher Desktop: https://rancherdesktop.io/

### 2. Open a terminal and Install the Container Registry plug-in:
##### ibmcloud plugin install container-registry -r 'IBM Cloud'

## Configure the IBM Cloud
### 1.	Login on IBM Cloud
##### ibmcloud login --sso

### 2.	Choose your account: 
Example: 012345

### 3.	Set the region:
##### ibmcloud cr region-set us-south
 
## Build the image

### 1. Before you build, check if frontend > src > components > app > app.js, the lines 70 to 80 are not commented:
<img width="636" alt="Captura de Tela 2025-06-14 às 23 53 07" src="https://github.com/user-attachments/assets/f5bd3dc8-c832-481e-8e65-5249bcbe0897" />


### 2. Check if backend > src > main.ts, the lines 16 to 22 are commented:
 <img width="748" alt="Captura de Tela 2025-06-14 às 23 55 31" src="https://github.com/user-attachments/assets/032ffdbb-676f-4411-8b96-908ab21611b3" />

### If everything it's ok, do:
##### git add .

### And a commit on git:
##### git commit -m "your text"

Example: git commit -m "update the assistant.module.ts"

## To build a image:

### 1. Run the Rancher Desktop to create a container server.

### 2.	Open Visual Studio, and go to the terminal backend (or one that you would like to build (assistant or frontend))
##### docker buildx build --platform=linux/amd64 . -t us.icr.io/chatbot/chatbot/backend:1.0.73

Notice: This is the version 1.0.73 of backend (ALWAYS are 1 version above), if you want to list the images: 
##### docker image list
You will know which one is the lastest image that you need to build. (If on image list is 1.0.72, so you have to build the 1.0.73 - as you can see on the command above).

### 3.	After run the build:
##### git push 
You can see the commit on GitHub inside your branch 

## Push to Container Registry
### 1. Login on Container Registry from IBMCloud
##### ibmcloud cr login

### 2.	Push to upload into Conteiner Registry from IBM Cloud:
Example:
##### docker push us.icr.io/chatbot/chatbot/backend:1.0.73

It was uploaded to Container Registry from IBM Cloud

## On Github / Bitbucket client, choose: release/esteira
### 1. If you update something on the environments (PR, PRHA, SBX, TH, TI, TU) into config, you must do the commit describing what you done.

### 2. If you update only backend, go to chatbot.deploy.yaml , and update the version on line 24.
If you build the image 1.0.73, replace to this version on line 24.
 
### 3. Update the version of package.json. Always you do a new deploy of image, you need to update to one version above.
If before was the version 0.3.58 - now it's 0.3.59
Remind: All the times you update something, you need to do a commit and describe the action.

## Deploy the new version on client environment:

### On Bamboo or Azure:
#### You'll notice that a new version was uploaded, when it's turn to green, go to play button and "Inicia-Deploy"
#### It starts to do deploy on TU environment, and you'll put the version to TH. 
#### Notice: The ENVIO_GMUD it's only to go to Production. If you'll test on development, do the deploy to TH.

All the environments has to be on 0.3.59 version, if the environments TU, TI and TH it's on the same version, now it's time to test your bot.


## Other commands of docker:

#Remove images
##### docker rmi -f $(docker images -aq)

#List images 
##### docker ps --all --storage

#Remove image container
##### docker image rm 

#Remove container
##### docker container rm 

#Run container showing port 8080 within container with port 3000 out of container
##### docker run -p 3000:8080--name nomeimagem

#run build image standard
##### docker build . -t chatbot-diti/backend:version

To mac chip apple:
##### docker buildx build --platform=linux/amd64  . -t grupo/image:tag

#save image in file format
##### docker save -o ./backend.tar chatbot-diti/backend:versao

#go to container and run linux command
##### docker exec -it <container name> /bin/bash

#Remove all images/containers that weren't used  (wipe)
##### docker system prune -a

#create local volume
##### docker run --platform=linux/amd64 --env-file .env -v /Users/user/git/Chatbot/volume_local:/opt/app-root/src/volume_local/bot:0.0.1
