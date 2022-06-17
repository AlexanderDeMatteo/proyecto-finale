import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar3.css"

export const Navbar3 = () => {
    return (
        <nav id="menu" className="nav justify-content">
            <a className="nav-link active" aria-current="page" href="/">logo</a>
            <a className="nav-link" href="#">servicios</a>
            <a className="nav-link" href="#">about us</a>
            <a className="nav-link" href="/signup">market place</a>
            <a className="nav-link" href="/signup">noticias</a>
            <li className="nav-item dropdown" id="hola">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                    <img id="avatar"
                        src="https://img.freepik.com/vector-gratis/ilustracion-concepto-psicologo_114360-2179.jpg?size=338&ext=jpg&ga=GA1.2.1846917735.1655248269"
                        className="img-fluid"
                        alt="Sample image"
                    />
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">status</a></li>
                    <li><a class="dropdown-item" href="#">Facturacion</a></li>
                    <li><a class="dropdown-item" href="#">log out</a></li>
                </ul>
            </li>
        </nav>
    );
};
