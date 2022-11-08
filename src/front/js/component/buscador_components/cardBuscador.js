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
            <div className="col-4">
                <div className="card">
                    <div className="card-liner">
                        <figure><img src="https://i.imgur.com/mXf4bBv.jpg" alt="" /> </figure>
                        <div className="card--social">
                            <ul>
                                <li className="instagram"><a href="#" className="insta"><i className="bi bi-instagram"></i></a></li>
                                <li className="codepen"><a href="#"><i className="fa fa-codepen"></i></a></li>
                            </ul>
                        </div>
                        <div className="card--title">
                            <h3>Sarfaraz Stark</h3>
                            <p>Web Developer</p>
                        </div>
                        <div className="card--desc">
                            <hr />
                            <p>“Everybody should learn to program a computer, because it teaches you how to think.”</p>
                        </div>
                        <div className="card--btn">
                            <a href="#">
                                <span className="moreinfo"><i className="fa fa-info-circle"></i> CSS HOVER CARD</span>
                                <span className="fullprof">Dont Forget To Like <i className="fa fa-heart"></i> </span>
                            </a>
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