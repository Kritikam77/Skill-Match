import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";
import photo1 from "/images/1.png";
import axios from "axios";
import { useParams } from "react-router-dom";

type ServiceType = {
  id:string | undefined;
  user:string | undefined,
  date: Date | null;
  charge: string | null;
  skill: string | null;
};
const User = () => {
  const { id } = useParams();
  const { user,getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [serviceState, setServiceState] = useState<ServiceType>({
    id:id,
    user:user?.email,
    date:  null,
    charge:  null,
    skill: null,
  });

  const [bookingText,setBookingText]=useState("");

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenFetched = await getAccessTokenSilently();

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenFetched}`,
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("user fetched ", response.data.user[0]);
        setUserFetched((prev) => ({
          ...prev,
          ...response.data.user[0],
        }));
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const bookService=async ()=>{
    try {
        const tokenFetched = await getAccessTokenSilently();

        // console.log("text ",serviceState)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/bookService`,
        serviceState,
        {
          headers: {
            Authorization: `Bearer ${tokenFetched}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("user booking response ",response);
      setBookingText(response.data.message);
    } catch (error) {
       console.error("Error booking user: ", error);
    
    }
  }

  // useEffect(() => {
  //   console.log("thisss ", userFetched);
  // }, [userFetched]);

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

  if (userFetched && isAuthenticated) {
    return (
      <div className="bg-bgColor-dark h-full w-full flex flex-col font-josefin text-fontColor-quad">
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

          {/* Info */}
          <div className="flex flex-col">
            {/* Name */}
            <div className="text-[8vh] font-bold">{userFetched.name}</div>

            {/* Description */}
            <div className="text-fontColor-quad mt-5 mb-5 flex">
              <span className="mr-5">
                <div>
                  {userFetched.description || "No description added !!"}
                </div>
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
                        className="pl-2 pr-2 pt-1 pb-1 border-2 border-fontColor-quad rounded-3xl ml-2 mr-2"
                      >
                        {item}
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-[3vh] text-fontColor-quad mr-4">
                        No services added !!
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="font-bold text-[3.5vh]">Location:</div>
              <div className="text-fontColor-quad mb-5 flex">
                <span className="mr-5">
                  <div>{userFetched.location || "No location added !!"}</div>
                </span>
              </div>
            </div>

            {/* Contacts */}
            <div>
              <div className="font-bold text-[3.5vh]">Contacts:</div>
              <div className="text-fontColor-quad">{userFetched.email}</div>
            </div>
          </div>

          {/* book service */}
          <div className="flex flex-col mr-10">
            <h2 className="font-bold">Book this user</h2>
            <div className="mt-5">
              Service: <br />
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // console.log(e.target.value);
                  setServiceState({ ...serviceState, skill: e.target.value });
                }}
                className="text-black"
              />
            </div>

            <div className="mt-5">
              Price: <br />
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // console.log(serviceState)
                  setServiceState({ ...serviceState, charge: e.target.value });
                }}
                className="text-black"
              />
            </div>

            <div className="mt-5">
              Date: <br />
              <input
                type="date"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setServiceState({
                    ...serviceState,
                    date: e.target.value ? new Date(e.target.value) : null,
                  });
                }}
                className="text-black"
              />
            </div>

            <button
              className="bg-fontColor-prim p-2 rounded-xl text-white mt-10 ml-10"
              onClick={bookService}
            >
              Book Service
            </button>

            <div className="text-red-400">{bookingText}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgColor-light h-full w-full flex flex-col font-josefin">
      <Header />
      <div className="mt-[10vh] h-[80vh] w-full flex">
        <div className=" m-auto text-center font-extrabold text-[5vh] h-full w-full ">
          Loading.............
        </div>
      </div>
    </div>
  );
};

export default User;
