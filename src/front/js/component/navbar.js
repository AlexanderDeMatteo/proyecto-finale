import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"

export const Navbar = () => {
	return (
		<nav id="menu" className="nav justify-content-center">
			<a className="nav-link active" aria-current="page" href="/">logo</a>
			<a className="nav-link" href="#">servicios</a>
			<a className="nav-link" href="#">about us</a>
			<a className="nav-link" href="#">registro</a>
			<a className="nav-link">login</a>
		</nav>
	);
};
