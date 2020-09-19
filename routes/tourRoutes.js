const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router
  .route('/top-5-cheapest')
  .get(tourController.aliastopTours, tourController.readAllTours);

router.route('/tour-stats').get(tourController.getStats);

router
  .route('/')
  .get(tourController.readAllTours)
  .post(tourController.createNewTour);
router
  .route('/:id')
  .get(tourController.readSigleTour)
  .patch(tourController.updateSingleTour)
  .delete(tourController.deleteSingleTour);

module.exports = router;
