import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";
import photo1 from "/images/1.png";
import check from "/icons/check.png";
import close from "/icons/close.png";
import edit from "/icons/edit.png";
import plus from "/icons/plus.png";
import axios from "axios";
// import DatePicker from "react-multi-date-picker";

type Booking = {
  _id: string;
  skill: string;
  dateBooked: string;
  charge: number;
  bookedBy: {
    _id: string;
    name: string;
    email: string;
  };
};

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [editDesc, setEditDesc] = useState<boolean>(false); //to toggle edit desc button
  const [editService, setEditService] = useState<boolean>(false); //to toggle edit service button
  const [editLocation, setEditLocation] = useState<boolean>(false); //to toggle edit location button
  const [description, setDescription] = useState<string>(); //to manage state to send to BE for descrition update
  const [service, setService] = useState<string>(""); //to manage state to send to BE for service update
  const [location, setLocation] = useState<string>(); //to manage state to send to BE for location update
  const [token, setToken] = useState<null | string>(null); // to fetch token from auth0 for verification
  const [valueUpdated, setValueUpdated] = useState<boolean>(false); //to show updated desc/service on UI, we put this as dependency in useffect so we see instant change
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  // const [selectedOffDays, setSelectedOffDays] = useState<any[]>([]);

  const [userFetched, setUserFetched] = useState({
    bookedOn: [],
    bookings: [],
    createdAt: "",
    description: "",
    email: "",
    location: "",
    name: "",
    picture: "",
    services: [],
    __v: 0,
  });

  //fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isAuthenticated && user) {
          setLoading(true);
          const sendData = {
            email: user?.email || "",
          };

          const tokenFetched = await getAccessTokenSilently();
          setToken(tokenFetched);

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/profile`,
            sendData,
            {
              headers: {
                Authorization: `Bearer ${tokenFetched}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("profile fetched ", response.data.user[0]);

          setUserFetched((prev) => ({
            ...prev,
            ...response.data.user[0],
          }));
        }
      } catch (error) {
        console.error("Error fetching profile data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, valueUpdated]);

  //to toggle edit desc button
  const editDescriptionFunction = () => {
    setEditDesc(!editDesc);
  };

  //to toggle edit service button
  const editServiceFunction = () => {
    setEditService(!editService);
  };

  //to toggle edit service button
  const editLocationFunction = () => {
    setEditLocation(!editLocation);
  };

  //handle description change
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // console.log("from ",e.target.value)
    setDescription(e.target.value);
  };

  //handle service change
  const handleServiceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log("from ",e.target.value)
    setService(e.target.value);
  };

  //handle location change
  const handleLocationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log("from ",e.target.value)
    setLocation(e.target.value);
  };

  //send description change to backend
  const sendDescription = async () => {
    try {
      const sendData = {
        email: user?.email || "",
        description,
      };
      // console.log("hehe ",description)
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/updateDescription`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEditDesc(false);
      // console.log("user description ", response);
      setValueUpdated(!valueUpdated);
    } catch (error) {
      console.error("Error sending user description: ", error);
    }
  };

  //send service change to backend
  const sendService = async () => {
    try {
      const sendData = {
        email: user?.email || "",
        service,
      };
      // console.log("hehe ",description)
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/updateService`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEditService(false);
      // console.log("user description ", response);
      setValueUpdated(!valueUpdated);
    } catch (error) {
      console.error("Error sending user service: ", error);
    }
  };

  //send location change to backend
  const sendLocation = async () => {
    try {
      const sendData = {
        email: user?.email || "",
        location,
      };
      // console.log("hehe ",description)
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/updateLocation`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEditLocation(false);
      // console.log("user description ", response);
      setValueUpdated(!valueUpdated);
    } catch (error) {
      console.error("Error sending user location: ", error);
    }
  };

  //please login display
  if (!isAuthenticated) {
    return (
      <div className="bg-bgColor-light h-full w-full flex flex-col font-josefin">
        <Header />
        <div className="mt-[10vh] h-[80vh] w-full flex">
          <div className=" m-auto text-center font-extrabold text-[5vh] h-full w-full ">
            Please Login !!
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-bgColor-light h-full w-full flex flex-col font-josefin">
        <Header />
        <div className="mt-[10vh] h-[80vh] w-full flex">
          <div className="m-auto text-center font-extrabold text-[5vh] h-full w-full">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  //user display

  return (
    <div className="bg-bgColor-light h-full w-full flex flex-col font-josefin">
      <Header />
      <div className="mt-[10vh] h-[80vh] w-full grid grid-cols-[30%_45%_20%]">
        {/* Photo */}
        <div className="overflow-hidden">
          <div className="h-[50%] w-[80%] m-auto mt-5">
            <img
              src={userFetched ? userFetched.picture : photo1}
              className="h-full w-full object-cover border-2 border-black"
            />
          </div>
        </div>

        {/* Info of user logged in*/}
        <div className="flex flex-col">
          {/* Name */}
          <div className="text-[8vh] font-bold">{userFetched.name}</div>

          {/* Description */}
          <div className="text-fontColor-sec mt-5 mb-5 flex">
            <span className="mr-5">
              {editDesc ? (
                <textarea
                  rows={4}
                  cols={25}
                  placeholder={
                    userFetched.description
                      ? "Change description here..."
                      : "Edit description here..."
                  }
                  onChange={handleDescriptionChange}
                />
              ) : (
                <div>
                  {userFetched.description || "No description added !!"}
                </div>
              )}
            </span>
            <span>
              {editDesc ? (
                <>
                  <img
                    className="h-[4vh] inline-block mr-3 cursor-pointer"
                    onClick={sendDescription}
                    src={check}
                  />
                  <img
                    className="h-[3vh] inline-block cursor-pointer"
                    onClick={editDescriptionFunction}
                    src={close}
                  />
                </>
              ) : (
                <img
                  className="h-[3vh] cursor-pointer"
                  onClick={editDescriptionFunction}
                  src={edit}
                />
              )}
            </span>
          </div>

          {/* Services */}
          <div className="mb-5">
            <div className="font-bold text-[3.5vh]">Services:</div>
            <div className="flex flex-wrap gap-4 text-[2vh]">
              {userFetched.services?.length ? (
                <>
                  {userFetched.services.map((item, index) => (
                    <span
                      key={index}
                      className="pl-2 pr-2 pt-1 pb-1 border-2 border-black rounded-3xl ml-2 mr-2"
                    >
                      {item}
                    </span>
                  ))}
                  {editService && (
                    <>
                      <textarea
                        rows={1}
                        cols={10}
                        placeholder=""
                        onChange={handleServiceChange}
                        className="mr-5"
                      />
                      <img
                        className="h-[4vh] inline-block mr-3 cursor-pointer"
                        onClick={sendService}
                        src={check}
                      />
                      <img
                        className="h-[3vh] inline-block cursor-pointer"
                        onClick={editServiceFunction}
                        src={close}
                      />
                    </>
                  )}
                  {!editService && (
                    <img
                      className="h-[3vh] inline-block mr-3 cursor-pointer"
                      onClick={editServiceFunction}
                      src={plus}
                    />
                  )}
                </>
              ) : (
                <>
                  {editService ? (
                    <>
                      <textarea
                        rows={1}
                        cols={10}
                        placeholder=""
                        onChange={handleServiceChange}
                        className="mr-5"
                      />
                      <img
                        className="h-[4vh] inline-block mr-3 cursor-pointer"
                        onClick={sendService}
                        src={check}
                      />
                      <img
                        className="h-[3vh] inline-block cursor-pointer"
                        onClick={editServiceFunction}
                        src={close}
                      />
                    </>
                  ) : (
                    <div>
                      <span className="text-[3vh] text-fontColor-sec mr-4">
                        No services added !!
                      </span>
                      <img
                        className="h-[3vh] inline-block mr-3 cursor-pointer"
                        onClick={editServiceFunction}
                        src={plus}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="font-bold text-[3.5vh]">Location:</div>
            <div className="text-fontColor-sec mb-5 flex">
              <span className="mr-5">
                {editLocation ? (
                  <textarea
                    rows={1}
                    cols={10}
                    // placeholder={
                    //   userFetched.description
                    //     ? "Change location here..."
                    //     : "Edit location here..."
                    // }
                    onChange={handleLocationChange}
                  />
                ) : (
                  <div>
                    {userFetched.location || "Please enter your location !!"}
                  </div>
                )}
              </span>
              <span>
                {editLocation ? (
                  <>
                    <img
                      className="h-[4vh] inline-block mr-3 cursor-pointer"
                      onClick={sendLocation}
                      src={check}
                    />
                    <img
                      className="h-[3vh] inline-block cursor-pointer"
                      onClick={editLocationFunction}
                      src={close}
                    />
                  </>
                ) : (
                  <img
                    className="h-[3vh] cursor-pointer"
                    onClick={editLocationFunction}
                    src={edit}
                  />
                )}
              </span>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div className="font-bold text-[3.5vh]">Contacts:</div>
            <div className="text-fontColor-sec">{userFetched.email}</div>
          </div>
        </div>

        {/* your bookings */}
        <div>
          <div className="font-bold">Your Bookings</div>
          <div>
            {userFetched?.bookedOn.map((booking: Booking, index: number) => (
              <div
                key={booking._id}
                className="mb-4 p-4 border rounded-lg shadow-md"
              >
                <h2 className="font-semibold text-lg">
                  {index + 1}. Booking for - {booking.skill}
                </h2>
                <p>Booked By - {booking.bookedBy.name}</p>
                <p>
                  Date -{" "}
                  {new Date(booking.dateBooked).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>Charge - {booking.charge}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
