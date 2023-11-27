const express = require("express");

const reviewController = require("../controllers/reviewController");

const router = express.Router();

//Reviews route CRUD

//Create a new review
router.post("/:id", reviewController.createReview, (req, res) =>
  res.status(201).send(res.locals.saveReviews)
);

//Get reviews from a specific trail
router.get("/:id", reviewController.getReviews, (req, res) =>
  res.status(200).send(res.locals.reviews)
);

//Update review
// router.put(
//   '/reviews/:trailId/:reviewId',
//   reviewController.updateReview,
//   (req, res) => res.status(201).send(res.locals.updateReview)
// );

// router.delete('/reviews', reviewController.deleteReview, (req, res) => {
//   return res.status(201).send(res.locals.saveReviews);
// });

module.exports = router;
