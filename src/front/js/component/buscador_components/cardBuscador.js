import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../../styles/card_buscador.scss"
import default_profile_picture from "../../../img/default_profile_picture.jpeg"

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


            <div className='psychologist-card card-slide-up'>
                <div className="row">
                    <div className="col-12 text-center mt-1">
                        <img className="card-img-psychologist shadow-sm" src={profile_picture ? profile_picture : default_profile_picture} />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-9 pe-0" style={{ borderRight: "solid 2px #999999", height: "5.8rem" }}>
                        <p className="name-text m-0 fw-bold">{name}{" "}{last_name}</p>
                        <span className="category-text mb-3">{area_de_especialidad ? area_de_especialidad : "Psicologo Deportivo rgdfgdfgfd"}</span>
                    </div>
                    <div className="col-3 p-0 align-self-center text-center">
                        <i class="fw-bold fa-solid fa-dollar-sign "></i><span style={{ fontSize: "1.2rem" }}>{" "}{precio_consulta ? precio_consulta : 30}</span>
                    </div>
                </div>


                <div className='card-caption'>
                    <div className="caption-up"><i className="vignette fa-solid fa-caret-up" ></i><i className="vignette2 fa-solid fa-caret-down" ></i></div>
                    <div className="row mt-4 card-box">
                        <div className="col-5 align-self-center text-center box1">
                            <h4 className="fw-bold">Citas</h4>
                            <p>30</p>
                        </div>
                        <div className="col-5 align-self-center text-center box2">
                            <h4 className="fw-bold">Exitos</h4>
                            <p>654</p>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-between card-box2">
                        <div className="col-12 align-self-center text-center box2 shadow">
                            <h4 className="fw-bold">Exitos</h4>
                            <p>654</p>
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