import React from "react";
import "./Labels.css";

const Labels = () => {
  return (
    <div className="labels">
      <div className="title">Alumnos</div>
      <div className="grid">
        <div className="list">
          <div className="label">Ethan Sullivan</div>
          <div className="label">Jackson Bennett</div>
          <div className="label">Olivia Rodriguez</div>
        </div>
        <div className="list">
          <div className="label">Liam Thompson</div>
          <div className="label">Mason Parker</div>
          <div className="label">Caleb Morgan</div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
