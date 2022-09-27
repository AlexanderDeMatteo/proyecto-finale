import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/card_buscador.css"
import default_profile_picture from "../../img/default_profile_picture.jpeg"

export const Card = ({
    name,
    last_name,
    profile_picture,
    area_de_especialidad,
    precio_consulta,
    colSpacing = "col-3",
}) => {
    return (
        <>
            <div className="col-4">
                <div className="container-card">
                    <div className="card">
                        <div className="slide slide1 shadow-sm">
                            <div className="content ">
                                <div className="avatar">
                                    <img className="psicologo-img" src={profile_picture ? profile_picture : default_profile_picture} />
                                </div>
                                <div className="psychologist-name">
                                    <p>{name}{" "}{last_name}</p>
                                </div>
                                <div className="psychologist-category">
                                    <p>{area_de_especialidad}</p>
                                </div>
                            </div>
                        </div>
                        <div className="slide slide2 shadow">
                            <div className="container h-100 pt-2">
                                <div className="row d-flex align-items-center ps-1 pe-2">
                                    <div className="col-4 content-box">
                                        <b className="">Hello</b>
                                    </div>
                                    <div className="col-4 content-box">
                                        <b className="">Hello</b>
                                    </div>
                                    <div className="col-4 content-box">
                                        <b className="">Hello</b>
                                    </div>
                                </div>
                                <div className="row text-center content-bottom-box mt-2">
                                    <div className="col-6 ">
                                        <button className="psychologist-buttom">Perfil</button>
                                    </div>
                                    <div className="col-6 ">

                                        <button className="psychologist-buttom">Agendar Cita</button>
                                    </div>
                                </div>
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
    last_name: PropTypes.string,
    profile_picture: PropTypes.string,
};