import React from "react";
import PropTypes from "prop-types";

export const CardPsicologo = ({ info }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={info.profile_picture}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{`${info.name} ${info.lastname}`}</h5>
        <p className="card-text">{info.area_de_especialidad}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

CardPsicologo.propTypes = {
  info: PropTypes.object,
};
