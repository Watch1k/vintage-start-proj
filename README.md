# Vintage

Vintage start project

## Installing

In order to start working with project, you must:

####  Clone repository to your local machine

```
git clone https://bitbucket.org/vintageua/vintage-start-proj.git
```

####  Install dependencies

With NPM
```
npm i -g jscs && npm i
```

With yarn
```
yarn add global jscs && yarn install
```

#### Configure WebStorm

Turn off 'Safe write' option
```
Settings | Appearance & Behavior | System Settings | Use "safe write" (save changes to temporary file first)
```

Change ECMAScript version
```
Settings | Languages & Frameworks | Javascript | Javascript language version: "ECMAScript6"
```

Enable JSCS linter
```
Settings | Languages & Frameworks | Javascript | Code Quality Tools | JSCS | "Enable"
```

## NPM scripts

Run production bundle

```
npm run-script runProd
```

Production bundle with deploying to remote server**

```
npm run-script runProdDeploy
```

Run development bundle

```
npm run-script runDev
```

Development bundle with browsersync livereload server

```
npm run-script runDevLivereload
```

Development bundle with deploying to remote server**

```
npm run-script runDevDeploy
```

** In order to start work with ftp, you must edit ftp connection settings in gulpfile.js and then set username and password:

```
set FTP_USER=(username for ftp-connection here)
set FTP_PWD=(password for ftp-connection here)
```

## JSDoc

Install JSDoc globally

```
npm install jsdoc -g
```

Generate docs (once)

```
npm run-script runDocsCompile
```

Open docs
```
npm run-script openDocs
```

## Built with

* [Gulp](http://gulpjs.com/)
* [Pug](https://github.com/pugjs/pug)
* [Webpack 2.2](https://webpack.js.org/)
* [Sass](http://sass-lang.com/)
* [Babel](https://babeljs.io/)
* [Browsersync](https://www.browsersync.io/)

## Versioning

Current version is 0.1.3
