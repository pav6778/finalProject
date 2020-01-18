const express = require("express")
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false)
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session')
const passport = require('passport')

// Define middleware here

app.use(session({
  secret: 'vasilii',
  resave: true,
  saveUninitialized: true
}))
require('./config/passport')(passport)

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mindsplash", function(err) {
  if(err)console.log(err)

  console.log("connection successful.")
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
