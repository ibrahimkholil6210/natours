const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.readAllTours)
  .post(tourController.checkValidity, tourController.createNewTour);
router
  .route('/:id')
  .get(tourController.readSigleTour)
  .patch(tourController.updateSingleTour)
  .delete(tourController.deleteSingleTour);

module.exports = router;
