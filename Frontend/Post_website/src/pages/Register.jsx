import React, { useContext, useState } from "react";
import "../styles/main.css";
import { serverLink } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { AppContext } from "../components/AppContextProvider";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth, isAuth,loading,setIsLoading } = useContext(AppContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${serverLink}/user/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data)
      setIsAuth(true);
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setIsLoading(false);

    } catch (error) {
      console.log("error:", error);
      setIsAuth(false);
      toast.error(error.response.data.message);
      setIsLoading(false);

    }
  };
  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleForm}>
          <h3 className="text-center">Sign Up</h3>

          <div className="mb-2">
            <label htmlFor="fname">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button disabled={loading?true:false} className="btn btn-primary">Sign in</button>
          </div>

          <p className="text-end mt-2">
            Already have an Account ?
            <Link to="/login" className="ms-2">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
