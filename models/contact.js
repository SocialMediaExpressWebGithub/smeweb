import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minLength: [2, "Full name must be larger than 2 characters"],
      maxLength: [50 , "Full name must be less than 50 characters"]
    } ,

    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      match: [/^[\w,%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"]
    },

    message:{
      type:String,
      required: [true,"Message is required." ]
    },

    createdDate: {
      type: Date,
      default : Date.now
    }
  },
  {
    timestamps: true,
  }
);

let contactModal;

try {
  // Check if the model already exists
  contactModal = mongoose.model("contactus");
} catch (error) {
  // If the model doesn't exist, create it
  contactModal = mongoose.model("contactus", contactSchema);
}

export default contactModal;