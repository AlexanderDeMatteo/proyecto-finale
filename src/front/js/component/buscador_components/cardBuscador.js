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


            <div className='psychologist-card card-slide-up'>
                <div className="row">
                    <div className="col-12 text-center mt-1 pb-1" style={{ borderBottom: "solid 3px #d4c8bb" }}>
                        <img className="card-img-psychologist shadow-sm" src={profile_picture ? profile_picture : default_profile_picture} />
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-9 pe-0" style={{ borderRight: "solid 3px #d4c8bb", height: "5.5rem" }}>
                        <p className="name-text m-0 fw-bold">{name}{" "}{last_name}</p>
                        <span className="category-text mb-3">{area_de_especialidad ? area_de_especialidad : "Psicólogo organizacional"}</span>
                    </div>
                    <div className="col-3 p-0 align-self-center text-center">
                        <i class="fw-bold fa-solid fa-dollar-sign "></i><span style={{ fontSize: "1.2rem" }}>{" "}{precio_consulta ? precio_consulta : 30}</span>
                    </div>
                </div>


                <div className='card-caption'>
                    <div className="caption-up" style={{ borderBottom: "solid 2px #d4c8bb" }}><i className="vignette fa-solid fa-caret-up" ></i><i className="vignette2 fa-solid fa-caret-down" ></i></div>
                    <div className="row mt-4 card-box">
                        <div className="col-5 align-self-center text-center box1">
                            <h4 >Pacientes</h4>
                            <p className="fw-bold">30</p>
                        </div>
                        <div className="col-5 align-self-center text-center box2">
                            <h4 >Exitos</h4>
                            <p className="fw-bold">654</p>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-between card-box2">
                        <div className="col-12 align-self-center text-center box2 shadow">
                            <h4 className="mb-0">Precio Consulta</h4>
                            <span className="fw-bold" style={{ fontSize: "1.2rem" }}>{"$"}{" "}{precio_consulta ? precio_consulta : 30}</span>
                        </div>
                    </div>
                    <div className="row dividerX"></div>
                    <div className="row text-center mt-2 ms-2 me-2">
                        <div className="col-6">
                            <button className="buttonRow1">Chat</button>
                        </div>
                        <div className="col-6">
                            <button className="buttonRow1">Agendar</button>
                        </div>
                    </div>
                    <div className="row mt-3 ms-2 me-2 text-center">
                        <div className="col-12">
                            <Link to={`/perfil/${id}`} style={{ width: "5rem" }} className="buttonRow2">Perfil</Link>
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