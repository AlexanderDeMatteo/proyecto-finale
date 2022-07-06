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
			<NavLink className="nav-link" to="/">logo</NavLink>
			<NavLink className="nav-link" to="/servicios">servicios</NavLink>
			<NavLink className="nav-link" to="/about_us">about us</NavLink>
			{!localStorage.getItem("token") ? <NavLink className="nav-link"
				to="/signup">registro</NavLink> : ""}
			{!localStorage.getItem("token") ? <NavLink className="nav-link" to="/signin">login</NavLink> : ""}
			{store.userData.is_psicologo && !localStorage.getItem("token") ? <NavLink className="nav-link" to="/market_place">market place</NavLink> : ""}
			<NavLink className="nav-link" to="/noticias">noticias</NavLink>

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
						<li className="dropdown-item"><NavLink to="/perfil">perfil</NavLink></li>
						<li className="dropdown-item"><NavLink to="/status">status</NavLink></li>
						<li className="dropdown-item"><NavLink to="/facturacion">facturacion</NavLink></li>
						<li onClick={(e) => {
							localStorage.removeItem("token");
							setIsLogOut(true)
						}} className="dropdown-item">log out</li>
					</ul>
				</li>
				: ""}
			{isLogOut && <Redirect to={"/"} />}
		</nav>
	);
};
