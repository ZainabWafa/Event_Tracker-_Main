import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fireDb.child("Event").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete the event ?")
    ) {
      fireDb.child(`Event/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success(" Deleted Successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child("Event")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };
  const handleReset = () => {
    setSort(false);
    fireDb.child("Event").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  };

  const filterData = (value) => {
    fireDb
      .child("Event")
      .orderByChild("Category")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Event</th>
            <th style={{ textAlign: "center" }}>Category</th>
            {!sort && <th style={{ textAlign: "center" }}>Action</th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].date}</td>
                  <td>{data[id].Event}</td>
                  <td>{data[id].Category}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                   <td>{item.date}</td> 
                  <td>{item.Event}</td>
                  <td>{item.Category}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <label>Sort By:</label>
      <select className="dropdown" name="colValue" onChange={handleChange}>
        <option>Please Select</option>
        <option value="name">Name</option>
        <option value="Event">Event</option>
        <option value="Event">Date</option>
        {/* <option value="Category">Category</option> */}
      </select>
      <button className="btn btn-reset" onClick={handleReset}>
        Reset
      </button>
      <br />
      <label>Category:</label>
      <button className="btn btn-active" onClick={() => filterData("Personal")}>
        Personal
      </button>
      <button
        className="btn btn-inactive"
        onClick={() => filterData("Work")}
      >
        Work
      </button>
      <button className="btn btn-Family" onClick={() => filterData("Family")}>
        Family
      </button>
    </div>
  );
};

export default Home;
