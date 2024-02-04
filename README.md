<h1> Nth Track (Client)
    <img src="https://github.com/mubashir-angathil/nthtrack-client/blob/master/public/vite.png" height="40px" alt="Movie Trends Logo"/>
</h1>
Welcome to "Nth Track" – an advanced project management system designed to streamline the process of handling permission-based requests for your projects. This comprehensive README guide aims to assist you in seamlessly initiating the project, providing crucial insights for both developers and users.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install the Packages](#install-the-packages)
    - [Setup Environment Variables](#setup-environment-variables)
  - [Starting the Server](#starting-the-server)
  - [Technologies Used](#technologies-used)


### Installation

#### Clone the Repository
```bash
git clone https://github.com/your-username/nthtrack-client.git
cd issue-tracker
```

#### Install the Packages
```
npm install 
```
#### Setup Environment Variables
- Rename ```.env.sample``` to ```.env.development```
- Update the file with your configuration.


#### Prerequisites
Before running the client, ensure you have the Nth Track server running. Follow the instructions in the [README](https://github.com/mubashir-angathil/nthtrack-server/blob/master/README.md) to set up and start the server.

#### Starting the Server
- For a normal server:
  ```
  npm start
  ```
- For a development server:
  ```
  npm run dev
  ```
#### Technologies Used
- React Js
- Typescript
- Vite
- Socket.io
