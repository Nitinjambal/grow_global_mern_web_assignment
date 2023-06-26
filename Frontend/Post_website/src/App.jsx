import { Toaster, toast } from "react-hot-toast";
import AllRoutes from "./components/AllRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import { useContext, useEffect } from "react";
import { AppContext } from "./components/AppContextProvider";
import { serverLink } from "./main";
import axios from "axios";

function App() {

  const {  setUser,IsAuth, setIsAuth, setIsLoading } =
  useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${serverLink}/user/MyProfile`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res:", res);
        setUser(res.data.user);
        setIsAuth(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error:", error);
        setUser({});
        toast.error("Login first");
        setIsAuth(false);
        setIsLoading(false);
      });
  }, [IsAuth]);

  return (
    <>
      <AppNavbar />
      <AllRoutes />
      <Toaster />
    </>
  );
}

export default App;
