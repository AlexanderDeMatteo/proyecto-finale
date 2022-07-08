import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar2.css"
import { Context } from "../store/appContext";

export const Sidebar = () => {
    const { store } = useContext(Context)
    return (
        <nav className="nav flex-column" id="box2">
            <p>Personal</p>
            <a className="nav-link active" aria-current="page" href="/Perfil">Perfil</a>
            <a className="nav-link" href="#">Sesiones Online</a>
            {store.userData.is_psicologo ? <a className="nav-link" href="#">Agenda del dia</a> : ""}
            {store.userData.is_psicologo ? <a className="nav-link" href="#">Contactos personales</a> : ""}
            {store.userData.is_psicologo ? <a className="nav-link" href="#">Configuracion</a> : ""}
            {store.userData.is_psicologo ? <p>Administración</p> : ""}
            <li className="nav-item dropdown" id="">
                {store.userData.is_psicologo ? <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Admin. Pacientes</a> : ""}
                {store.userData.is_psicologo ? <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Expedientes</a></li>
                    <li><a className="dropdown-item" href="#">Manejo de agenda</a></li>
                </ul> : ""}
            </li>
            <li className="nav-item dropdown" id="">
                {store.userData.is_psicologo ? <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Admin.Cuenta</a> : ""}
                <ul className="dropdown-menu">
                    {store.userData.is_psicologo ? <li><a className="dropdown-item" href="#">Facturacion</a></li> : ""}
                    {store.userData.is_psicologo ? <li><a className="dropdown-item" href="#">Modalidad de pago</a></li> : ""}
                </ul>
            </li>
            <p>Navega</p>
            <a className="nav-link" href="#">Noticias</a>
            {store.userData.is_psicologo ? <a className="nav-link" href="#">Buscador de colegas</a> : <a className="nav-link" href="/buscador">Buscador de psicologos</a>}
            {store.userData.is_psicologo ? <a className="nav-link" href="#">market place</a> : ""}


        </nav>
    );
};
