const router = require('express').Router();
const usersController = require("../../controllers/usersController");

router.route('/')
.get(usersController.findAll)
.post(usersController.create);


router.route("/login")
.post(usersController.authenticate);

router.route("/logout")
.get(usersController.logOut);

router.route("/obj")
.get(usersController.findById)
.post(usersController.update);



module.exports = router;   
