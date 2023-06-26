import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { serverLink } from "../main";
import { toast } from "react-hot-toast";
import { AppContext } from "../components/AppContextProvider";
import AllPosts from "../components/AllPosts";
import "../styles/main.css";

function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { setIsAuth, isAuth } = useContext(AppContext);

  //delete function
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${serverLink}/post/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      toast.error("Please Fill all the details!");
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${serverLink}/post/addPost`,
          {
            title,
            description,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setLoading(false);
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setRefresh((prev) => !prev);
      } catch (error) {
        setLoading(false);
        console.log("error:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  const getAllPosts = async () => {
    try {
      let { data } = await axios.get(`${serverLink}/post/getAllPost`, {
        withCredentials: true,
      });
      setUserPosts(data.userPosts);
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [refresh]);

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <>
    
      <form className="text-center" onSubmit={handleForm}>
        <input
          type="text"
          value={title}
          placeholder="Post Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <button disabled={loading}>Add Post</button>
      </form>



      <h1 className="allPosts">Your All Posts</h1>
      <div className="mainDiv">
        {userPosts?.map((el) => {
          return (
            <AllPosts
              key={el._id}
              title={el.title}
              description={el.description}
              id={el._id}
              deleteHandler={deleteHandler}
              // updateHandler={updateHandler}
            />
          );
        })}
      </div>
    </>
  );
}

export default Post;
