///////////////////////////////////
// DEPENDENCIES
//
const express = require(`express`);
const path = require(`path`);
const logger = require(`morgan`);
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);

///////////////////////////////////
// EXPRESS
//
const app = express();
app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve Fav Icon
const favicon = require(`serve-favicon`);
app.use(favicon(__dirname + `/public/mystic.png`));

// Static Resources
app.use(express.static(path.join(__dirname, `public`)));
app.use(express.static(path.join(__dirname, `app_client`)));

///////////////////////////////////
// ERROR HANDLING
//
// Forward 404 to Error Handler
app.use((req, res, next) => {
  var err = new Error(`Not Found`);
  err.status = 404;
  next(err);
});

// Dev Error Handler
if (app.get(`env`) === `production`) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render(`error`, {
      message: err.message,
      error: err
    });
  });
}

// Prod Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render(`error`, {
    message: err.message,
    error: {}
  });
});

///////////////////////////////////
// SERVER
//
const port = process.env.PORT || 8080;
app.listen(port);
console.log(`App listening on port `, port);

module.exports = app;

