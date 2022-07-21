import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [carName, setCarName] = useState("");
  const [carReview, setCarReview] = useState("");

  const submitReview = () => {
    Axios.post("http://localhost:4000/api/insert", {
      carName: carName,
      carReview: carReview,
    }).then(() => {
      console.log("promise is returning");
      alert("successful insert");
    });
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
      </div>
    </div>
  );
}

export default App;
