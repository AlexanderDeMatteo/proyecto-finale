import React from "react";
import PropTypes from "prop-types";

export const CardPsicologo = ({ info }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={
            info.profile_picture
              ? info.profile_picture
              : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          }
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
    </div>
  );
};

CardPsicologo.propTypes = {
  info: PropTypes.object,
};
