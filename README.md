# Google Gemini Generative AI 

## Angular App => Ask a Question with Historic

## Screenshots

<img src="/public/assets/screenshot_ipad-air-tab1.png" style="width:30%"> <img src="/public/assets/screenshot_ipad-air-tab2.png" style="width:30%">

## Install requirements

Run `npm install` to install project requirements.

## Configure Google Gemini Generative AI api token at environment.ts file.

Replace text `YOUR-GEMINI-GENERATIVE-AI-API-KEY` with your api key.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Docker

### Build
Run `docker build . --tag=gemini-app` to build your image

### Run
Run `docker run --name:gemini-app -p 80:80` to run your image into a container

### Docker Compose
Run `docker-compose up` to build and start app.
