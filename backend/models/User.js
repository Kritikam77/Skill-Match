const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    maxlength: 1000,
    default: "",
  },
  services: {
    type: [String],
    validate: {
      validator: (value) => value.length <= 10,
      message: "Array can contain at most 10 items",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  offDays: [
    {
      type: Date,
    },
  ],
  location: {
    type: String,
    default: "",
  },
  bookedOn: [
    // this person is booked on these days
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  bookings: [
    //this person has booked these bookings
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
