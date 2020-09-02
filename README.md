
# Bird Watching App

Bird watching application is built for bird watching enthusiasts that lets users to save observations with common name, scientific name, rarity, location, image, date and time of observation.Observations are saved in the mongodb and can be added, deleted or edited only users who are authenticated. The lastest version of the application production version of application can be viewed from https://bird-watching-app.herokuapp.com/

# Features

* React 
* Redux
* Material UI
* Google Map
* NodeJs
* JSON Web Token
* Cloudinary
* Express
* Mongoose
* MongoDb

# Testing 

* Jest
* Cypress
* Rest client

## Installation

* `git clone https://github.com/kecyGaurab/bird-watching`.
* `cd bird-watching`.
*  add `.env` file in frontend directory and in backend directory.
*  add `REACT_APP_GOOGLE_API_KEY` to the `.env` in frontend directory.
*  add `MONGODB_URI`, `PORT`, `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `SECRET` to       `.env`  in backend directory.
* `cd backend && npm install` or `yarn`.
* `yarn watch` to run the server with nodemon in watch mode or `yarn start` to run the server.
* In another terminal `cd frontend && yarn` or `npm install`.
* `yarn start` or `npm start` to start react app.
* `go to localhost:3000 on the browser`.
* Application has started.

## Testing

* To run E2E tests `cd frontend && yarn run cypress:open` or `npm run cypress:open`
* To run unit tests `cd frontend && yarn test` or `npm run test`

## Deployment

* The application has been deployed in Heroku and can be viewed on https://  bird-watching-app.herokuapp.com/

## Roadmap

* The application will allow users to add custom location by placing the pin on the map.
* More feature and filters to search.
* The application will also have offline support and developed as PWA.
