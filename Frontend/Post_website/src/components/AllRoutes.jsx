import React from "react";
import { Route, Routes } from "react-router-dom";
import Post from "../pages/Post";
import Register from "../pages/Register";
import Login from "../pages/login";
import Edit from "../pages/Edit";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Post />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/edit/:id" element={<Edit/>}></Route>
    </Routes>
  );
}

export default AllRoutes;
