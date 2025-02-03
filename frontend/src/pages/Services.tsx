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
  const [location, setLocation] = useState("");
  const [locArray, setLocArray] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setSearchClicked] = useState(false);

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
    // console.log("locc ", locArray);
    fetchServices();
  }, [locArray]);

  const addToLocation = () => {
    setLocArray((prev) => [...prev, location]);
  };

  //remove from locArray
  const removeLocation = (index: number) => {
    setLocArray((prev) => prev.filter((_, i) => i != index));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addToLocation()
      fetchServices();
    }
  };
  return (
    <div className="bg-bgColor-light h-[100vh] w-full flex flex-col font-josefin">
      <Header />

      {/* Look for a service title */}
      <div className="flex font-oswald font-extrabold mt-5 mb-10">
        <span className="m-auto text-[4vh] md:text-[5vh] ">LOOK FOR A SERVICE!</span>
      </div>

      <div className="w-full h-[70vh] grid md:grid-cols-[20vw_60vw]">
        {/* Location Section */}
        <div className="ml-auto mr-auto h-full w-[90%]">
          {/* Location search bar */}
          <div className="flex items-center justify-center mt-5 relative max-w-md">
            <input
              type="text"
              placeholder="Enter location..."
              className="border border-gray-300 rounded-3xl py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img
              src={plus}
              alt="Add Location"
              className="absolute right-5 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
              onClick={addToLocation}
            />
          </div>

          {/* Selected Locations */}
          <div className="w-full h-[50%]">
            <div className="flex flex-col items-center space-x-3 mt-5 ml-5">
              {locArray.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-800 mr-5">{item}</span>
                  <button
                    onClick={() => removeLocation(index)}
                    className="text-red-500 font-bold text-2xl hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Location Button */}
          <button
            className="bg-fontColor-prim p-2 rounded-xl text-white mt-10 ml-10 hidden md:block"
            onClick={() => setLocArray([])}
          >
            Clear All
          </button>
        </div>

        {/* Results Section */}
        <div className="grid grid-rows-[20%_80%] ml-auto mr-auto h-full w-[90%]">
          {/* Service search bar */}
          <div className="flex items-center justify-center mt-5 m-auto relative max-w-md">
            <input
              type="text"
              placeholder="Search for a service..."
              className="border border-gray-300 rounded-3xl py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              onChange={(e) => setService(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img
              src={searchIcon}
              alt="Search Icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
              onClick={fetchServices}
            />
          </div>

          {/* Content - Loader & Results */}
          <div className="overflow-y-auto h-[55vh] flex justify-center items-center">
            {loading ? <ClipLoader color="#000" size={50} /> : ""}
            {users && users.length > 0 ? (
              <div className="w-full">
                {users.map((item, index) => (
                  <Link
                    to={`/user/${item._id}`}
                    key={index}
                    className="overflow-hidden bg-white md:w-[90%] h-[25vh] grid grid-cols-[30%_40%_30%] mb-10 rounded-3xl"
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
            ) : (
              <div className="text-center">
                <div className="text-red-600 text-[2vh]">
                  Searching for {service}
                </div>
                <div>No Results Found!</div>
              </div>
            )}

            {/* {searchClicked ? (
              <div className="text-center text-gray-500 text-[2vh]">
                Search something
              </div>
            ) : (
              <div className="text-center text-gray-500 text-[2vh]">
                
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
