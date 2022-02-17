import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  date: "",
  Event: "",
  Category: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, date, Event, Category } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("event").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name  ||!date || !Event || !Category) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child("Event").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Event Added Successfully");
          }
        });
      } else {
        fireDb.child(`Event/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success(" Updated Successfully");
          }
        });
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeHolder="Your Name..."
          value={name || " "}
          onChange={handleInputChange}
        />
        
         <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          placeHolder="due date"
          value={date || ""}
          onChange={handleInputChange}/>
        
        <label htmlFor="Event">Event</label>
        <input
          type="text"
          id="event"
          name="Event"
          placeHolder="Record your Event"
          value={Event || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="name">Category</label>
        <input
          type="text"
          id="Category"
          name="Category"
          placeHolder="category..."
          value={Category || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
