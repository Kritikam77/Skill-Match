const mongoose=require("mongoose");

const BookingSchema = new mongoose.Schema({
  dateBooked: {
    type: Date,
    required: true,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
