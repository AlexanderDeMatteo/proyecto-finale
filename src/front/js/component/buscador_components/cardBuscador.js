import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../../styles/card_buscador.scss"
import default_profile_picture from "../../../img/default_profile_picture.jpeg"
import { Link } from "react-router-dom";

export const Card = ({
    id,
    name,
    profile_picture,
    area_de_especialidad,
    precio_consulta,
    state,
    city,
    numberFpv,
    phoneNumber,
    colSpacing = "col-3",
}) => {

    return (
        <>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="container-fluid">
                    <div className="card" style={{ border: "1px solid #fff", borderRadius: "15px", transition: "all 0.35s ease", background: "#fff", width: "17.1rem", height: "20.5rem" }}>
                        <div className="card-liner">
                            <figure><img src={profile_picture ? profile_picture : default_profile_picture} alt="" /> </figure>
                            <div className="card--social">
                                <ul>
                                    <li className="instagram">
                                        <Link to={`/profile/${id ? id : 0}`}>
                                            <i className="fa-regular fa-user"></i>
                                        </Link>
                                    </li>
                                    <li className="codepen">
                                        <Link to={`/calendar`}>
                                            <i className="fa-regular fa-calendar-days"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="card--title">
                                <h3>{name}</h3>
                                <p>{area_de_especialidad ? area_de_especialidad : "Psicologo Deportivo"}<br />
                                    {`${city}, ${state}`}
                                </p>
                            </div>
                            <div className="card--desc">
                                <div className="row">
                                    <div className="col-6 mt-3">
                                        Consulta:
                                        <br />
                                        {`00$`}
                                    </div>
                                    <div className="col-6 mt-3">
                                        {`Contacto: ${phoneNumber}`}
                                    </div>
                                    <div className="col-6">
                                        {`Horario: 08:00-16:00`}
                                    </div>
                                    <div className="col-6">
                                        Nro° FPV: <br />
                                        {`${numberFpv}`}
                                    </div>
                                </div>
                            </div>
                            <div className="card--btn">
                                <a href="#" style={{ padding: "0" }}>
                                    <span className="moreinfo">More Info</span>
                                    <Link to={`/profile/${id ? id : 0}`} className="fullprof card-link">Profile</Link>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Card.propTypes = {
    id: PropTypes.number,
    area_de_especialidad: PropTypes.string,
    colSpacing: PropTypes.string,
    precio_consulta: PropTypes.number,
    name: PropTypes.string,
    last_name: PropTypes.string,
    profile_picture: PropTypes.string,
};