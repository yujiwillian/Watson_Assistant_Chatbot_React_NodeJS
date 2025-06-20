# Watson Assistant Chatbot App React

## Steps to run this app:

### 1. Download Node
https://nodejs.org/en

### 2. Install NVM
MACOS: https://sukiphan.medium.com/how-to-install-nvm-node-version-manager-on-macos-d9fe432cc7db

Windows: https://forum.casadodesenvolvedor.com.br/topic/44475-como-instalar-o-nvm-windows/

### 4. Install git
MACOS: https://git-scm.com/download/mac

Windows: https://git-scm.com/downloads/win

### 5. Download all the repositories

### 6. In frontend/.env.example, change the .env.example to .env
   
### 7. In backend/.env.example, put the credencials of your Watson Assistant project and save as .env.

### 8. If there's no authentication, leaves the lines 69 to 80 as comments: 
Path: frontend > src > components > app > app.js
 
<img width="412" alt="Captura de Tela 2025-06-14 às 22 24 53" src="https://github.com/user-attachments/assets/1dac9552-47fa-47f2-8b8f-58737d15611d" />


### 9. If there's no authentication, in frontend > src > contexts > user-context.js line 8, change: isLoaded: true
 
<img width="473" alt="Captura de Tela 2025-06-14 às 22 27 30" src="https://github.com/user-attachments/assets/cb8385c3-047e-450e-8f33-f66668ee5518" />


### 10. Install CORS plugin on Firefox: https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/versions/
And turn on.

### 11. To run backend, assistant and frontend:
Open 3 new terminals and type:

##### nvm install 18

To use node version: 

##### nvm use 18

## Backend:
##### cd backend
##### npm install -g @nestjs/cli
##### npm cache clean --force
##### rm -rf node_modules package-lock.json
##### npm install

And to run:
##### npm start

## Assistant:
##### cd assistant
##### npm install -g @nestjs/cli
##### npm cache clean --force
##### rm -rf node_modules package-lock.json
##### npm install

And to run:
##### npm start

## Frontend:
##### cd frontend:
##### nvm install 14.17
##### nvm use 14.17
##### npm install -g yarn

And to run:
##### yarn start


Preview:
<img width="1512" alt="Captura de Tela 2025-06-14 às 15 37 25" src="https://github.com/user-attachments/assets/6cb0fef7-5299-49bd-9388-512569af78be" />



## Proxy – If you have a integration with a system to open issue / requests
(Need to install Python, if you don't have it: https://www.python.org/downloads/) 

Open a new terminal and go to the project directory: exemple: cd Downloads/Chatbot

Run:
##### pip install proxy.py

It will install the proxy. When finished, run the code to initiate:
##### proxy

In the backend/.env you'll do:

<img width="656" alt="Captura de Tela 2025-06-14 às 22 09 23" src="https://github.com/user-attachments/assets/fa28c473-0e26-4b9a-a2c0-073e66ce1084" />





