const Review = require('../models/Review');
const catchAsync = require('../utils/catchAsync');

exports.getAllReview = catchAsync(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    reviews: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createNewReview = catchAsync(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
