import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../../styles/card_buscador.css"
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
                    <div className="col-12 ">
                        <b className="name-text">{name}{" "}{last_name}</b>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="category-text">{area_de_especialidad ? area_de_especialidad : "Psicologo Deportivo"}</p>
                    </div>
                </div>
                <div className='card-caption'>
                    <div className="vignette"></div>
                    <h2 className="card-caption-title text-center">Hello</h2>
                    <p className='card-caption-content'>
                        Blurb to get reader hooked.
                    </p>
                    <p><a className='card-caption-link' href='#'>READ MORE</a></p>
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