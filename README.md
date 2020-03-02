
# mypocket
Hi there, this is a app to manager bills.
You can add yours recipes and expenses and create goals to help with your life objectives.

# Project
This is a offline first app made with react-native, AdonisJs at backend and postgresql database. To run the project, you need to install [postgresql](https://www.postgresql.org/), [nodeJs](https://nodejs.org/en/), [react-native](https://reactnative.dev/) and I recomend you install the [Adonis CLI](https://adonisjs.com/docs/4.1/installation) and [yarn](https://classic.yarnpkg.com/pt-BR/docs/install/) too (it will help you in the future). 
Tip: This mobile app was started using Rocketseat advanced tamplate, [chekout.](https://github.com/Rocketseat/react-native-template-rocketseat-advanced)

# Running
Be sure to follow the Project part before start this session.

## Backend
First, create a database to the project and create a .env file in the backend folder, this .env will be a copy to .env.example with the every field filled. After that, run `yarn install`, `adonis migration:run` and `adnis serve --dev`to start the server.

## Frontend
In the mobile folder, run `yarn install`, when finished, you can plugin your device or start a emulator to run the app. Ahh, remember to change the server address in `/mobile/src/services/api.js`

## OBS
This project is current tested in an android environment, I don't have sure about the behavior app in an IOS device.
