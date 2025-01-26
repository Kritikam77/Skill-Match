import { useAuth0 } from "@auth0/auth0-react";
import { useEffect} from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [userData, setUserData] = useState<{
  //   email: string;
  //   name: string;
  //   picture:string;
  // } | null>(null);

  useEffect(() => {
    const sendData=async()=>{
      if (isAuthenticated && user) {
        //extract user data
        //console.log("user ",user);
        const userData = {
          email: user?.email || "",
          name: user?.name || "",
          picture:user?.picture || ""
        };
        const token = await getAccessTokenSilently();
        // console.log("Token from getAccessTokenSilently:", token); 
        // setUserData(userData);

        //send user data to backend
        if (userData.email && userData.name) {
          fetch(`${import.meta.env.VITE_API_URL}/api/v1/login`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((response) => response.json())
            // .then((resp)=>console.log("Response from backend ",resp))
            .catch((error) =>
              console.error("Error storing user data: ", error)
            );
        }
      }
    }

    sendData();
  }, [user, isAuthenticated,getAccessTokenSilently]);

  return (
    <div>
      <div className="w-[85vw] m-auto flex justify-around h-[12vh] font-oswald ">
        <div className="m-auto">
          <Link to="/">
            <span>Home</span>
          </Link>
        </div>

        <div className="m-auto">
          <Link to="/services">
            <span>Book Service</span>
          </Link>
        </div>

        <div className="m-auto font-bold text-[5vh]">SKILL MATCH</div>

        <div className="m-auto">
          <Link to="/">
            <span>Notifications</span>
          </Link>
        </div>

        <div className="m-auto">
          {isAuthenticated && user ? (
            <Link to="/profile">
              <span>{user.name}</span>
            </Link>
          ) : (
            <button onClick={() => loginWithRedirect()}>Login</button>
          )}
        </div>
      </div>
      <div className="bg-fontColor-tert h-[.1vh] w-[90vw] m-auto">
        {/* empty */}
      </div>
    </div>
  );
};

export default Header;
