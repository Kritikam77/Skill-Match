const User =require( "./../models/User");
const Booking =require( "./../models/Booking");

exports.bookUser = async (req, res) => {
  const { userBId, dateBooked } = req.body;

  try {
    const userAId = req.user._id;

    const userA = await User.findById(userAId);
    const userB = await User.findById(userBId);

    if (!userA || !userB) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the booking
    const newBooking = new Booking({
      dateBooked,
      bookedBy: userA._id,
    });

    await newBooking.save();

    // Add booking to both User A's and User B's booking lists
    userA.bookings.push(newBooking._id);
    userB.bookedOn.push(newBooking._id);

    await userA.save();
    await userB.save();

    res
      .status(200)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error booking user" });
  }
};
