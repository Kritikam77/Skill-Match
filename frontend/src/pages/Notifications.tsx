import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

type Notification={
    userId:string,
    bookerid:string,
    message:string,
    isRead:boolean
}

const Notifications = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  },[]);
  const fetchNotifications = async () => {
    try {
      const tokenFetched = await getAccessTokenSilently();

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/notifications`,
        {
          headers: {
            Authorization: `Bearer ${tokenFetched}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("notifs ", response);
      setNotifications(response.data)
    } catch (error) {
      console.error("Error fetching profile data: ", error);
    }
  };
  return (
    <div className="bg-bgColor-light h-[100vh] w-full flex flex-col font-josefin">
      <Header />
      <div className="mt-10 flex h-full w-full">
        <div className="w-[95%] ml-auto mr-auto flex">
          {notifications.length > 0 ? (
            notifications.map((notif: Notification, index: number) => (
              <div key={index} className="border-b p-2">
                {index+1} . {notif.message}
              </div>
            ))
          ) : (
            <p className="font-bold text-[4vw] m-auto">No notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
