import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../../styles/card_buscador.scss"
import default_profile_picture from "../../../img/default_profile_picture.jpeg"
import { Link } from "react-router-dom";

export const Card = ({
    id,
    name,
    last_name,
    profile_picture,
    area_de_especialidad,
    precio_consulta,
    colSpacing = "col-3",
}) => {

    return (
        <>


            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="container-fluid">
                    <div className="card" style={{ border: "1px solid #fff", borderRadius: "15px", transition: "all 0.35s ease", background: "#fff", width: "15rem", height: "20rem" }}>
                        <div className="card-liner">
                            <figure><img src={profile_picture ? profile_picture : default_profile_picture} alt="" /> </figure>
                            <div className="card--social">
                                <ul>
                                    <li className="instagram"><a href="#" className="insta"><i className="bi bi-instagram"></i></a></li>
                                    <li className="codepen"><a href="#"><i className="fa fa-codepen"></i></a></li>
                                </ul>
                            </div>
                            <div className="card--title">
                                <h3>{name}{" "}{last_name ? last_name : "Pestana"}</h3>
                                <p>{area_de_especialidad ? area_de_especialidad : "Psicologo Deportivo"}</p>
                            </div>
                            <div className="card--desc">
                                <div className="row">
                                    <div className="col-6">
                                        1
                                    </div>
                                    <div className="col-6">
                                        2
                                    </div>
                                </div>
                            </div>
                            <div className="card--btn">
                                <a href="#" style={{ padding: "0" }}>
                                    <span className="moreinfo">More Info</span>
                                    <Link className="fullprof card-link">Profile</Link>
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