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

            <div className="col-4" style={{ textAlign: "-webkit-center" }}>
                <div className="card card-primary card-outline w-75">
                    <div >
                        <div className="text-center">
                            <img
                                src={
                                    profile_picture ? profile_picture : default_profile_picture
                                }
                                alt="User profile picture"
                                id="avatar_perfil"
                                className="profile-user-img img-fluid img-circle"
                            />
                        </div>
                        <h5 className="my-3 text-center">
                            {name} {last_name}
                        </h5>
                        <p className="text-muted mb-1 text-center">
                            {area_de_especialidad}
                        </p>
                        <p className="text-muted mb-2 text-center">
                            {precio_consulta}
                        </p>
                        <a href="#" className="btn btn-primary btn-block">
                            <b>Follow</b>
                        </a>
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