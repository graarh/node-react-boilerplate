typescript + mocha + babel boilerplate
---------------------------------------
Good for:

* migration from es2015 js code to typescript
* ts + mocha fresh start if you plan to use old js code

Supports both ts and js. Allows mixed imports: js from ts, ts from js.

Absolute path imports starting with 'server/', see sample code.

Express and heroku support.

React app, based on react-scripts, with mustache templates for preloaded server values.

## Available Scripts

In the project directory, you can run:

###  `yarn start`

Runs the app. Be sure to run `yarn build` before.
Open [http://localhost](http://localhost) to view it in the browser.

### `yarn r-start`

Runs the react app in dev mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches mocha tests.

### `yarn r-test`

Launches the react test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the react app and the server app.

### `yarn r-build`

Builds the react app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

