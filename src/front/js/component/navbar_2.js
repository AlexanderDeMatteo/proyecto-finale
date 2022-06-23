import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar2.css"

export const Navbar2 = () => {
    return (
        <nav className="nav flex-column" id="box2">
            <p>Personal</p>
            <a className="nav-link active" aria-current="page" href="#">Perfil</a>
            <a className="nav-link" href="#">Sesiones Online</a>
            <a className="nav-link" href="#">Agenda del dia</a>
            <a className="nav-link" href="#">Contactos personales</a>
            <a className="nav-link" href="#">Configuracion</a>
            <p>Administración</p>
            <li className="nav-item dropdown" id="hola">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Admin. Pacientes</a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Expedientes</a></li>
                    <li><a className="dropdown-item" href="#">Manejo de agenda</a></li>
                </ul>
            </li>
            <li className="nav-item dropdown" id="hola">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Admin.Cuenta</a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Facturacion</a></li>
                    <li><a className="dropdown-item" href="#">Modalidad de pago</a></li>
                </ul>
            </li>
            <p>Navega</p>
            <a className="nav-link" href="#">Noticias</a>
            <a className="nav-link" href="#">Buscador de colegas</a>
            <a className="nav-link" href="#">market place</a>


        </nav>
    );
};
