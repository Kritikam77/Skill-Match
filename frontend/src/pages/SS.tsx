/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header from "../components/Header";
import searchIcon from "/icons/searchIcon.png";
import plus from "/icons/plus.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  description: string;
  location: string;
  services: string[];
  createdAt: string;
  offDays: string[];
  bookedOn: string[];
  bookings: string[];
  __v: number;
}

const Services = () => {
  const [service, setService] = useState("");
  const [users, setUsers] = useState<User[] | null>(null);
  const [locArray, setLocArray] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  //request to backend to fetch users with service
  const fetchServices = async () => {
    try {
      setLoading(true); // Show loader when fetching starts
      setSearchClicked(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/getServices`,
        { service, locations: locArray }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching services: ", error);
    } finally {
      setLoading(false); // Hide loader when fetching completes
    }
  };

  //call fetchservices on locArray or date change too
  useEffect(() => {
    console.log("locc ", locArray);
    fetchServices();
  }, [locArray]);



  return (
    <div className="bg-bgColor-light h-[100vh] w-full flex flex-col font-josefin">
 
      <div className="w-full h-[70vh] grid grid-cols-[20vw_60vw_20vw]">
        

        {/* Results Section */}
        <div className="grid grid-rows-[20%_80%] ml-auto mr-auto h-full w-[90%]">
          {/* Service search bar */}
         

          {/* Content - Loader & Results */}
          <div className="overflow-y-auto h-[55vh] flex justify-center items-center">
            {loading ? (
              <ClipLoader color="#000" size={50} />
            ) : users && users.length > 0 ? (
              <div className="w-full">
                {users.map((item, index) => (
                  <Link
                    to={`/user/${item._id}`}
                    key={index}
                    className="overflow-hidden bg-white w-[90%] h-[25vh] grid grid-cols-[30%_40%_30%] mb-10 rounded-3xl"
                  >
                    {/* User Image */}
                    <div className="h-[80%] overflow-hidden m-auto">
                      <img
                        src={item.picture}
                        alt="User"
                        className="object-contain w-full h-full m-auto"
                      />
                    </div>

                    {/* User Details */}
                    <div>
                      <div className="text-[4vh] font-bold mt-3 mb-3">
                        {item.name}
                      </div>
                      <div className="grid grid-cols-[45%_55%] gap-3">
                        <div className="text-[2vh] font-bold text-right">
                          Location:
                        </div>
                        <div className="text-[2vh] text-fontColor-sec">
                          {item.location}
                        </div>
                      </div>
                      <div className="grid grid-cols-[45%_55%] gap-3">
                        <div className="text-[2vh] font-bold text-right">
                          Services:
                        </div>
                        <div className="text-[2vh] text-fontColor-sec">
                          {item.services.map((service, serviceIndex) => (
                            <div key={serviceIndex}>{service}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : searchClicked ? (
              <div className="text-center text-gray-500 text-[2vh]">
                Search something
              </div>
            ) : (
              <div className="text-center">
                <div className="text-red-600 text-[2vh]">
                  Searching for {service}
                </div>
                <div>No Results Found!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
