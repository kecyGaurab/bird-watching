.

IMPORTANT NOTE -
This project has a mongoDB connection setup. Setup the connection based on the environments in the .env file.

File structure
client - Holds the client application
public - This holds all of our static files

src


components - This folder holds all of the different components that will make up our views
App.js - This is what renders all of our browser routes and different views
index.js - This is what renders the react app by rendering App.js, should not change
package.json - Defines npm behaviors and packages for the client
server - Holds the server application
config - This holds our configuration files, like mongoDB uri
controllers - These hold all of the callback functions that each route will call
models - This holds all of our data models
server.js - Defines npm behaviors and packages for the client
package.json - Defines npm behaviors like the scripts defined in the next section of the README
.gitignore - Tells git which files to ignore
README - This file!
Available Scripts
In the project directory, you can run:

yarn start
Runs just the server app in production mode.

yarn client
Runs both the client app and the server app in development mode.
Open http://localhost:3000 to view the client in the browser.

yarn watch
Runs just the server in development mode.

yarn build:ui
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
