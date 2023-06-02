import React from "react";
import "./Labels.css";

const Labels = () => {
  return (
    <div className="labels">
      <div className="title">Etiquetas</div>
      <div className="grid">
        <div className="list">
          <div className="label">Gustavo</div>
          <div className="label">Jair</div>
          <div className="label">Karime</div>
        </div>
        <div className="list">
          <div className="label">Luis</div>
          <div className="label">Martín</div>
          <div className="label">Sebastián</div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
