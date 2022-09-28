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


            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="card-psychologist p-3">
                    <div class="d-flex align-items-center">
                        <div class="image shadow">
                            <img src={profile_picture ? profile_picture : default_profile_picture} class="rounded" width="155" />
                        </div>
                        <div class="ml-3 w-100">
                            <h4 class="mb-0 mt-0 fw-bold psychologist-name">{name}{" "}{last_name}</h4>
                            <span className="psychologist-category">{area_de_especialidad ? area_de_especialidad : "Psicologo deportivo"}</span>
                            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats shadow">
                                <div class="d-flex flex-column dividerX">
                                    <span class="queries">Consultas</span>
                                    <span class="number1 text-center">38</span>
                                </div>
                                <div class="d-flex flex-column dividerX">
                                    <span class="patients">Pacientes</span>
                                    <span class="number2 text-center">980</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="price">Precio</span>
                                    <span class="number3 text-center">{`${precio_consulta ? precio_consulta : "10"}$`}</span>
                                </div>
                            </div>
                            <div class="button mt-2 d-flex flex-row align-items-center">
                                <button class="btn btn-sm btn-outline-primary w-100 shadow">Agendar</button>
                                <button class="btn btn-sm btn-primary w-100 ml-2 shadow">Perfil</button>
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