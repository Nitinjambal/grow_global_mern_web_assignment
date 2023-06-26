import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../components/AppContextProvider";
import { toast } from "react-hot-toast";
import { serverLink } from "../main";
import "../styles/main.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth, isAuth, setIsLoading, loading, setUserName } =
    useContext(AppContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios?.post(
        `${serverLink}/user/login`,
        {
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

      setIsAuth(true);
      toast.success(data.message);
      setUserName(data.message);
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      setIsAuth(false);
      setIsLoading(false);
      toast.error("Invalid Email Or Password");
    }
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleForm}>
          <h3 className="text-center">Sign In</h3>

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
            <button
              className="btn btn-primary"
              disabled={loading ? true : false}
            >
              Sign in
            </button>
          </div>

          <p className="text-end mt-2">
            New here?
            <Link to="/register" className="ms-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
