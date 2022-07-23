import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [carName, setCarName] = useState("");
  const [carReview, setCarReview] = useState("");
  const [carReviewList, setCarReviewList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((res) => {
      setCarReviewList(res.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      carName: carName,
      carReview: carReview,
    });

    setCarReviewList([
      ...carReviewList,
      { carName: carName, carReview: carReview },
    ]);
  };

  const deleteReview = (carId) => {
    Axios.delete(`http://localhost:3001/api/delete/${carId}`);
  };

  const updateReview = (name) => {
    Axios.put(`http://localhost:3001/api/update`, {
      carName: name,
      carReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>Application</h1>
      <div className="form">
        <label>Car Name</label>
        <input
          type="text"
          name="carName"
          onChange={(e) => setCarName(e.target.value)}
        />
        <label>Review</label>
        <input
          type="text"
          name="carReview"
          onChange={(e) => setCarReview(e.target.value)}
        />

        <button onClick={submitReview}>Submit</button>

        {carReviewList.map((review) => {
          return (
            <div className="card" key={review.id}>
              <h3>{review.carName}</h3>
              <p>{review.carReview}</p>

              <button
                onClick={() => {
                  deleteReview(review.id);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(review.carName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
