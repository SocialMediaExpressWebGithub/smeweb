import mongoose, { Schema } from "mongoose";

const newsDetailsSchema = new Schema(
  {
    newsheader: String,
    image: String,
    description: String,
    video: String,
    source: String,
    eventplace: String,
    newsdate: Date,
  },
  {
    timestamps: true,
  }
);

let NewsDetailsModel;

try {
  // Check if the model already exists
  NewsDetailsModel = mongoose.model("newsdetails");
} catch (error) {
  // If the model doesn't exist, create it
  NewsDetailsModel = mongoose.model("newsdetails", newsDetailsSchema);
}

export default NewsDetailsModel;