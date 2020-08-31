const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

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
