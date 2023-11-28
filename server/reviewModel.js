const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    // sets the name of the DB that our collections are part of
    dbName: "reviews",
  })
  .then(() => console.log("Connected to Database: reviews."))
  .catch((err) => console.log(err));

const reviewSchema = new Schema({
  trailId: { type: Number, required: true },
  review: {
    userName: { type: String, required: true },
    text: { type: String, required: true, maxlength: 30 },
  },
});

// reviewSchema.index({ trailId: 1, 'review.userName': 1 }, { unique: true });

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
