const {authCheck} =require( "../middlewares/authCheck");

const express = require("express");
const {
  createUser,
  getProfile,
  addUserService,
  updateUserDescription,
  updateUserLocation,
  getUsersByService,
  getUserById,
  addOffDays,
  bookService,
  getNotifications,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", authCheck, createUser);
router.post("/profile", authCheck, getProfile);
router.get("/user/:id", authCheck, getUserById);
router.post("/updateDescription", authCheck, updateUserDescription);
router.post("/updateService", authCheck, addUserService);
router.post("/updateLocation", authCheck, updateUserLocation);
router.post("/getServices", getUsersByService);
router.post("/updateOffDays", authCheck, addOffDays);
router.post("/bookService", authCheck, bookService);
router.get("/notifications", authCheck, getNotifications);


module.exports = router;
