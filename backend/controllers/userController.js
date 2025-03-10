const User = require("./../models/User");
const Booking = require("./../models/Booking");
const Notification = require("./../models/Notification");

exports.createUser = async (req, res) => {
  // console.log("request ",req)
  //access username from req.user
  const { email, name, picture } = req.body;
  //console.log(email, name, picture);
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      //create a new user and save it
      const user = new User({ email, name, picture });
      await user.save();

      // console.log("create user working")
      return res.status(201).json({
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.error("Error saving user data: ", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.updateUserDescription = async (req, res) => {
  const { email, description } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's description
    if (description) user.description = description;

    await user.save();

    res
      .status(200)
      .json({ message: "Profile description updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating description" });
  }
};

exports.addUserService = async (req, res) => {
  const { email, service } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the service already exists in the array
    if (user.services.includes(service)) {
      return res.status(400).json({ error: "Service already exists" });
    }

    // Add the new service to the user's services array
    user.services.push(service);

    // Ensure the services array does not exceed the maximum allowed length
    if (user.services.length > 10) {
      return res
        .status(400)
        .json({ error: "You can only have up to 10 services" });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Service added successfully",
      services: user.services, // Send the updated services array
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding service" });
  }
};

exports.updateUserLocation = async (req, res) => {
  const { email, location } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's location
    if (location) user.location = location;

    await user.save();

    res
      .status(200)
      .json({ message: "Profile location updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating location" });
  }
};

//logged in users profile
exports.getProfile = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.find({ email })
      .populate({
        path: "bookedOn",
        populate: {
          path: "bookedBy",
          select: "name email",
        },
      })
      .populate({
        path: "bookings",
        populate: {
          path: "bookedBy",
          select: "name email",
        },
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

//any user
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.find({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

exports.getUsersByService = async (req, res) => {
  try {
    const { service, locations } = req.body;

    if (!service) {
      return res.status(400).json({ error: "Service is required." });
    }

    // Case-insensitive regex for the service
    const serviceRegex = new RegExp(
      service.replace(/\s+/g, "").replace(/\W+/g, "\\W*"),
      "i"
    );

    // Define the query to filter by service
    let query = { services: { $regex: serviceRegex } };

    // If locations array is provided and not empty, filter by location with case-insensitive regex
    if (Array.isArray(locations) && locations.length > 0) {
      const locationRegexes = locations.map(
        (location) => new RegExp(location, "i") // Create a case-insensitive regex for each location
      );
      query.location = { $in: locationRegexes }; // Match users whose location matches any regex
    }

    // Fetch users from the database
    const users = await User.find(query);

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users by service and location:", error);
    res.status(500).json({ error: "Error fetching users." });
  }
};

exports.addOffDays = async (req, res) => {
  try {
    const { email, dates } = req.body;

    //validate input
    if (!dates || !Array.isArray(dates)) {
      return res.status(400).json({
        error: "Invalid or missing dates array",
      });
    }
    // console.log("dates on be ",dates);
    //convert input to date objects
    const parsedDates = dates.map((date) => new Date(date));

    //find user and update their offdays
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    //add their off days to user's db
    user.offDays = [
      ...new Set([
        ...user.offDays.map((d) => d.toISOString()),
        ...parsedDates.map((d) => d.toISOString()),
      ]),
    ].map((d) => new Date(d));

    //save updates user
    await user.save();

    res.status(200).json({
      message: "Off days updates successfully",
    });
  } catch (error) {
    console.error("Error adding off days for the user:", error);
    res.status(500).json({ error: "Error adding off days." });
  }
};

exports.bookService = async (req, res) => {
  try {
    const { id, user, date, charge, skill } = req.body;

    // Validate the input
    if (!id || !date || !user || !charge || !skill) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the service provider  and user
    const serviceProvider = await User.findOne({ _id: id });
    const bookingUser = await User.findOne({ email: user });

    if (!serviceProvider || !bookingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new booking
    const newBooking = new Booking({
      dateBooked: date,
      bookedBy: bookingUser._id,
      charge,
      skill,
    });
    

    // Save the booking
    await newBooking.save();

    // Add the booking to `bookedOn` for service provider
    serviceProvider.bookedOn.push(newBooking._id);

    // Add the booking to `bookings` for the user
    bookingUser.bookings.push(newBooking._id);

    // Save the updated users
    await serviceProvider.save();
    await bookingUser.save();

    //saving notifications in database
    const newDate=date.split("T")[0]
    const notification=new Notification({
      userId:serviceProvider._id,
      bookerId:bookingUser._id,
      message:`You have a booking on date ${newDate} for service " ${skill} " by ${bookingUser.name} for $${charge}.`
    })

    await notification.save();

    // Return a success response
    res
      .status(201)
      .json({
        message:
          "We've sent a notification to user. Please wait for communication.",
        booking: newBooking,
      });
  } catch (error) {
    console.error("Error booking user", error);
    res.status(500).json({ error: "Error booking user." });
  }
};

exports.getNotifications=async(req,res)=>{
  try {
    const {email}=req.body;

    const notifications=await Notification.find({email}).sort({createdAt:-1})

    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({
      error:"Error fetching notifications."
    })
  }
}