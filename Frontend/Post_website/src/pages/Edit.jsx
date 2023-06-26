import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverLink } from "../main";
import { toast } from "react-hot-toast";

const inetialValue = {
  title: "",
  description: "",
};

function Edit() {
  const [formData, setFormData] = useState(inetialValue);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  //handleChange for inputs value
  const handleChange = (e) => {
    let { value } = e.target;

    setFormData((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  const handleForm = (e) => {
    e.preventDefault();

    if (formData.title==="" || formData.description==="") {
      toast.error("Please Fill all the details!");
    } else {
      setLoading(true);
      axios
        .put(`${serverLink}/post/${id}`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error:", error);
          toast.error("Something went wrong");
          setLoading(false);
        });
      setFormData(inetialValue);
    }
  };

  //useEffect
  useEffect(() => {
    axios
      .get(`${serverLink}/post/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFormData(res.data.post);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  return (
    <div>
      <form className="text-center" onSubmit={handleForm}>
        <h1>EDIT POST</h1>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Post Title"
          onChange={(e) => handleChange(e)}
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={(e) => handleChange(e)}
        />

        <br />
        <button disabled={loading} type="submit">
          Edit Post
        </button>
      </form>
    </div>
  );
}

export default Edit;
