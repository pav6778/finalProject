const mongoose = require("mongoose");
const db = require("../models");



mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/mindsplash"
);

const userSeed = [
    {
        email: "Vasya@gmail.com",
        password: "easypass",
        lines: [],
        date: new Date(Date.now())
    },
    {
        email: "fedya@gmail.com",
        password: "easypass",
        lines: [],
        date: new Date(Date.now())
    }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
