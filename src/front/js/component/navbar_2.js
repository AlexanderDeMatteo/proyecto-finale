import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar2.css"

export const Navbar2 = () => {
    return (
        <nav class="nav flex-column" id="box2">
            <p>Personal</p>
            <a class="nav-link active" aria-current="page" href="#">Perfil</a>
            <a class="nav-link" href="#">Sesiones Online</a>
            <a class="nav-link" href="#">Agenda del dia</a>
            <a class="nav-link" href="#">Contactos personales</a>
            <a class="nav-link" href="#">Configuracion</a>
            <p>Administración</p>
            <li class="nav-item dropdown" id="hola">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Admin. Pacientes</a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Expedientes</a></li>
                    <li><a class="dropdown-item" href="#">Manejo de agenda</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown" id="hola">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Admin.Cuenta</a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Facturacion</a></li>
                    <li><a class="dropdown-item" href="#">Modalidad de pago</a></li>
                </ul>
            </li>
            <p>Navega</p>
            <a class="nav-link" href="#">Noticias</a>
            <a class="nav-link" href="#">Buscador de colegas</a>
            <a class="nav-link" href="#">market place</a>


        </nav>
    );
};
