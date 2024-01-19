# Letgo Clone Web (Frontend)

![alt text](https://github.com/letgo-clone/letgo-clone-web/blob/main/src/assets/img/home-page.png)

## Hello Everyone
www.letgo.com site design is a project that I clone exactly. In this project, I learned and developed technologies such as Typescript and Material UI. 

I used NodeJS (Express), PostgreSQL, JWT, Redis with Typescript to create RESTful API service as backend. 

As frontend, I created React with Typescript, I used Redux for State and Material UI for CSS framework.
 
In the project, all functions except chat are as in letgo.com 
is working.

### Features
* ReactJS with Typescript 
* Material UI
* Redux

## Deploy (Vercel)
https://letgo-web.vercel.app/

## Requirements
* NodeJS (min v20.10.0)

## How to install

* ### STEP 1: You need to install the backend side to your local
    * [Link for Letgo Clone Backend](https://github.com/letgo-clone/letgo-clone-backend)

* ### STEP 2: Make sure that the backend is running on port 8080.

* ### STEP 3: Create the ".env" file. and add the following
  
```
VITE_GRANT_TYPE = client_credentials
VITE_CLIENT_ID = letgo_clone_client
VITE_CLIENT_SECRET = 7f68ee6df7739cda
VITE_ENDPOINT = http://localhost:8080
```  

* ### STEP 4: install all packages with the command
```
npm install
npm run dev
```

* ### 🎉 The project will run on port 5173

## Package.json

```
{
  "name": "letgo-clone-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/styled": "^11.11.0",
    "@fontsource/open-sans": "^5.0.17",
    "@mui/icons-material": "^5.14.16",
    "@mui/material": "^5.14.17",
    "@mui/styled-engine-sc": "^6.0.0-alpha.5",
    "@reduxjs/toolkit": "^1.9.7",
    "formik": "^2.4.5",
    "jwt-decode": "^4.0.0",
    "localforage": "^1.10.0",
    "match-sorter": "^6.3.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-material-ui-carousel": "^3.4.2",
    "react-redux": "^8.1.3",
    "react-router-dom": "^6.18.0",
    "react-slugify": "^3.0.3",
    "sort-by": "^1.2.0",
    "styled-components": "^6.1.0",
    "sweetalert2": "^11.10.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
```


Good Encodings





