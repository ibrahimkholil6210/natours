const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/top-5-cheapest')
  .get(tourController.aliastopTours, tourController.readAllTours);

router.route('/tour-stats').get(tourController.getStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.readAllTours)
  .post(tourController.createNewTour);
router
  .route('/:id')
  .get(tourController.readSigleTour)
  .patch(tourController.updateSingleTour)
  .delete(tourController.deleteSingleTour);

module.exports = router;
