const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router
  .route('/')
  .get(userController.readAllUsers)
  .post(userController.createNewUser);

router
  .route('/:id')
  .get(userController.readSigleUser)
  .patch(userController.updateSingleUser)
  .delete(userController.deleteSingleUser);

module.exports = router;
