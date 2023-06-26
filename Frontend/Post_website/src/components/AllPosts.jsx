import React from "react";
import "../styles/main.css";
import { Link } from "react-router-dom";

function AllPosts({ title, description, deleteHandler,  id }) {
  return (
    <div className="subDiv">
      <div>
        <h3>Title : {title}</h3>
      </div>

      <div>
        <h6>{description}</h6>
      </div>

      <Link to={`/edit/${id}`}>
        <button className="postButton" >
          Edit Post
        </button>
      </Link>

      <button className="postButton" onClick={() => deleteHandler(id)}>
        Delete Post
      </button>
    </div>
  );
}

export default AllPosts;
