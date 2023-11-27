const Review = require("../reviewModel");
const reviewController = {};
const User = require("../userModel");

//Create a new review
reviewController.createReview = async (req, res, next) => {
  try {
    const { review } = req.body;
    const { userName, text } = review
      const newReview = await Review.create({ 
        trailId: req.params.id, 
        review:  { userName, text}
      });
      res.locals.saveReview = newReview;
      console.log("newReview: ", newReview);
      return next();
    
  } catch (err) {
    return next({
      log: `Express error handler caught in reviewController.createReview: ${err} `,
      status: 400,
      message: { err: "error occured while writing review" },
    });
  }
};

//Get reviews from a specific trail
reviewController.getReviews = async (req, res, next) => {
  try {
    const response = await Review.find({ trailId: req.params.id });
    if (response) {
      const reviewsWithId = response.map(reviewDoc => ({
        _id: reviewDoc._id,
        review: reviewDoc.review
      }));
      console.log("all reviews: ", reviewsWithId);
      return next();
    } else {
      return next({
        log: `Express error handler caught in reviewController.getReviews: review not found `,
        status: 400,
        message: { err: "review not found" },
      });
    }
  } catch (err) {
    return next({
      log: `Express error handler caught in reviewController.getReviews: ${err} `,
      status: 400,
      message: { err: "error occured while getting reviews" },
    });
  }
};

//update review
reviewController.updateReview = async (req, res, next) => {
  try {
    const { reviewId, trailId } = req.params;
    console.log("trailId: ", trailId);
    console.log("reviewId: ", reviewId);
    const { text } = req.body.review
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId, trailId: trailId },
      { "review.text": text },
      { new: true }
    );
    if (updatedReview) {
      res.locals.updatedReview = updatedReview;
      return next();
    } else {
      return next({
        log: `Express error handler caught in reviewController.getReviews: review not found `,
        status: 400,
        message: { err: "review not found" },
      });
    }
  } catch (err) {
    return next({
      log: `Express error handler caught in reviewController.getReviews: ${err} `,
      status: 400,
      message: { err: "error occured while getting reviews" },
    });
  }
};

//delete review
reviewController.deleteReview = async (req, res, next) => {
    try {
      const { review } = req.body;
      const updatedReview = await Review.deleteOne(
        { trailId: req.params.id },
        { review },
        { new: true }
      );
  
      if (updatedReview) {
        res.locals.updatedReview = updatedReview;
        return next();
      } else {
        return next({
          log: `Express error handler caught in reviewController.getReviews: review not found `,
          status: 400,
          message: { err: "review not found" },
        });
      }
    } catch (err) {
      return next({
        log: `Express error handler caught in reviewController.getReviews: ${err} `,
        status: 400,
        message: { err: "error occured while getting reviews" },
      });
    }
  };
module.exports = reviewController;


