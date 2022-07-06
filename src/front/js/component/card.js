import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/card.css"

export const Card = ({
  name,
  lastname,
  profile_picture,
  area_de_especialidad,
  precio_consulta,
  colSpacing = "col-3",
}) => {
  return (
    <>
      <div className="container py-5 " id="card-box">
        <div className="row d-flex align-items-center ">
          <div className="">
            <div className="card">
              {/* style="border-radius: 15px; background-color: #93e2bb;" */}
              <div className="card-body p-4 text-black">
                <div>
                  <h6 className="mb-4">{area_de_especialidad}</h6>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="small mb-0">
                      <i className="far fa-clock me-2"></i>45 min
                    </p>
                    <p className="fw-bold mb-0">{precio_consulta}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <img id="imagen_card"
                      src={profile_picture ? profile_picture : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                      alt="Generic placeholder image"
                      className="img-fluid rounded-circle border border-dark border-3"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">
                        {name} {lastname}
                      </p>
                      <ul className="mb-0 list-unstyled d-flex flex-row">
                        <li>
                          <i className="fas fa-star fa-xs"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-xs"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-xs"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-xs"></i>
                        </li>
                        <li>
                          <i className="fas fa-star fa-xs"></i>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-rounded btn-sm"
                        data-mdb-ripple-color="dark"
                      >
                        + Follow
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-rounded btn-sm"
                        data-mdb-ripple-color="dark"
                      >
                        See profile
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-floating btn-sm"
                        data-mdb-ripple-color="dark"
                      >
                        <i className="fas fa-comment"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <p className="my-4 pb-1"></p>
                <button
                  type="button"
                  className="btn btn-success btn-rounded btn-block btn-lg"
                >
                  <i className="far fa-clock me-2"></i>Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Card.propTypes = {
  area_de_especialidad: PropTypes.string,
  colSpacing: PropTypes.string,
  precio_consulta: PropTypes.number,
  name: PropTypes.string,
  lastname: PropTypes.string,
  profile_picture: PropTypes.string,
};
