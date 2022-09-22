import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const [isLogOut, setIsLogOut] = useState(false);
  const { actions, store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token") && isLogOut) setIsLogOut(false);
  }, [localStorage.getItem("token"), isLogOut]);

  useEffect(() => {
    // actions.privateData()
    actions.handle_user_data();
  }, []);

  return (
    <div class="wrapper">
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button">
              <i class="fas fa-bars"></i>
            </a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="../../index3.html" class="nav-link">
              Home
            </a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="#" class="nav-link">
              Contact
            </a>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a
              class="nav-link"
              data-widget="navbar-search"
              data-target="#main-header-search"
              href="#"
              role="button"
            >
              <i class="fas fa-search"></i>
            </a>
            <div class="navbar-search-block" id="main-header-search">
              <form class="form-inline">
                <div class="input-group input-group-sm">
                  <input
                    class="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-navbar" type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                    <button
                      class="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="far fa-comments"></i>
              <span class="badge badge-danger navbar-badge">3</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" class="dropdown-item">
                <div class="media">
                  <img
                    src="../../dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                    class="img-size-50 mr-3 img-circle"
                  />
                  <div class="media-body">
                    <h3 class="dropdown-item-title">
                      Brad Diesel
                      <span class="float-right text-sm text-danger">
                        <i class="fas fa-star"></i>
                      </span>
                    </h3>
                    <p class="text-sm">Call me whenever you can</p>
                    <p class="text-sm text-muted">
                      <i class="far fa-clock mr-1"></i> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <div class="media">
                  <img
                    src="../../dist/img/user8-128x128.jpg"
                    alt="User Avatar"
                    class="img-size-50 img-circle mr-3"
                  />
                  <div class="media-body">
                    <h3 class="dropdown-item-title">
                      John Pierce
                      <span class="float-right text-sm text-muted">
                        <i class="fas fa-star"></i>
                      </span>
                    </h3>
                    <p class="text-sm">I got your message bro</p>
                    <p class="text-sm text-muted">
                      <i class="far fa-clock mr-1"></i> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <div class="media">
                  <img
                    src="../../dist/img/user3-128x128.jpg"
                    alt="User Avatar"
                    class="img-size-50 img-circle mr-3"
                  />
                  <div class="media-body">
                    <h3 class="dropdown-item-title">
                      Nora Silvester
                      <span class="float-right text-sm text-warning">
                        <i class="fas fa-star"></i>
                      </span>
                    </h3>
                    <p class="text-sm">The subject goes here</p>
                    <p class="text-sm text-muted">
                      <i class="far fa-clock mr-1"></i> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item dropdown-footer">
                See All Messages
              </a>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="far fa-bell"></i>
              <span class="badge badge-warning navbar-badge">15</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span class="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <i class="fas fa-envelope mr-2"></i> 4 new messages
                <span class="float-right text-muted text-sm">3 mins</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <i class="fas fa-users mr-2"></i> 8 friend requests
                <span class="float-right text-muted text-sm">12 hours</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <i class="fas fa-file mr-2"></i> 3 new reports
                <span class="float-right text-muted text-sm">2 days</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
              <i class="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-widget="control-sidebar"
              data-slide="true"
              href="#"
              role="button"
            >
              <i class="fas fa-th-large"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// <nav id="menu" className="navbar navbar-expand-sm nav justify-content-center">
// 	<NavLink className="nav-link" id="nav-item" to="/">Home</NavLink>
// 	<NavLink className="nav-link" id="nav-item" to="/servicios">Servicios</NavLink>
// 	<NavLink className="nav-link" id="nav-item" to="/about_us">About Us</NavLink>
// 	{!localStorage.getItem("token") ? <NavLink className="nav-link" id="nav-item"
// 		to="/signup">registro</NavLink> : ""}
// 	{!localStorage.getItem("token") ? <NavLink className="nav-link" id="nav-item" to="/signin">Login</NavLink> : ""}
// 	{/* {!localStorage.getItem("token") && store.userData.is_psicologo ? <NavLink className="nav-link" to="/market_place">Mercado</NavLink> : ""} */}
// 	<NavLink className="nav-link" id="nav-item" to="/noticias">Noticias</NavLink>

// 	{localStorage.getItem("token") ?
// 		<li className="nav-item dropdown" id="hola">
// 			<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
// 				{store.userData.profile_picture ? <img id="avatar"
// 					width="40" height="40" className="rounded-circle img-fluid"
// 					src={store.userData.profile_picture}
// 					alt="Sample image"
// 				/> : <img id="avatar"
// 					width="40" height="40" className="rounded-circle img-fluid"
// 					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
// 					alt="Sample image" />}
// 			</a>
// 			<ul className="dropdown-menu">
// 				<li className="dropdown-item"><NavLink to="/perfil">Perfil</NavLink></li>
// 				<li className="dropdown-item"><NavLink to="/status">Status</NavLink></li>
// 				<li className="dropdown-item"><NavLink to="/facturacion">Facturacion</NavLink></li>
// 				<li onClick={(e) => {
// 					localStorage.removeItem("token");
// 					setIsLogOut(true)
// 				}} className="dropdown-item">Log Out</li>
// 			</ul>
// 		</li>
// 		: ""}
// 	{isLogOut && <Redirect to={"/"} />}
// </nav>
