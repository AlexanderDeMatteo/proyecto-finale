import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import "../../styles/navbar.css"
import { Context } from "../store/appContext";

export const Navbar = () => {
	const [isLogOut, setIsLogOut] = useState(false)
	const { actions, store } = useContext(Context)
	useEffect(() => {
		if (localStorage.getItem("token") && isLogOut) setIsLogOut(false)
	}, [localStorage.getItem("token"), isLogOut])

	useEffect(() => {
		// actions.privateData()
		actions.handle_user_data();
	}, [])

	return (
		<nav id="menu" className="navbar navbar-expand-sm nav justify-content-center">
			<NavLink className="nav-link" id="nav-item" to="/">Home</NavLink>
			<NavLink className="nav-link" id="nav-item" to="/servicios">Servicios</NavLink>
			<NavLink className="nav-link" id="nav-item" to="/about_us">About Us</NavLink>
			{!localStorage.getItem("token") ? <NavLink className="nav-link" id="nav-item"
				to="/signup">registro</NavLink> : ""}
			{!localStorage.getItem("token") ? <NavLink className="nav-link" id="nav-item" to="/signin">Login</NavLink> : ""}
			{/* {!localStorage.getItem("token") && store.userData.is_psicologo ? <NavLink className="nav-link" to="/market_place">Mercado</NavLink> : ""} */}
			<NavLink className="nav-link" id="nav-item" to="/noticias">Noticias</NavLink>

			{localStorage.getItem("token") ?
				<li className="nav-item dropdown" id="hola">
					<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
						{store.userData.profile_picture ? <img id="avatar"
							width="40" height="40" className="rounded-circle img-fluid"
							src={store.userData.profile_picture}
							alt="Sample image"
						/> : <img id="avatar"
							width="40" height="40" className="rounded-circle img-fluid"
							src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
							alt="Sample image" />}
					</a>
					<ul className="dropdown-menu">
						<li className="dropdown-item"><NavLink to="/perfil">Perfil</NavLink></li>
						<li className="dropdown-item"><NavLink to="/status">Status</NavLink></li>
						<li className="dropdown-item"><NavLink to="/facturacion">Facturacion</NavLink></li>
						<li onClick={(e) => {
							localStorage.removeItem("token");
							setIsLogOut(true)
						}} className="dropdown-item">Log Out</li>
					</ul>
				</li>
				: ""}
			{isLogOut && <Redirect to={"/"} />}
		</nav>
	);
};
