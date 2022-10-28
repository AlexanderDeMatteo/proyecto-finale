import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar2.scss";
import { Context } from "../store/appContext";

export const Sidebar = () => {
  const { store } = useContext(Context);

  const [selectedTab, setSelectedTab] = React.useState({
    li_1: "nav-item",
    li_2: "have-children",
    li_3: "have-children",
    li_4: "have-children",
  });
  const [selectedTabStyle, setselectedTabStyle] = React.useState({
    li_1: { display: "none" },
    li_2: { display: "none" },
    li_3: { display: "none" },
    li_4: { display: "none" },
  });

  function changeSelect(e) {
    console.log(e);
    const { name } = e.target;
    if (e.target.name && selectedTab[name] === "nav-item") {
      setSelectedTab((prevSelected) => ({
        ...prevSelected,
        [name]: "nav-item active",
      }));
      // setSelectedTab({ 'li_1', 'li_2': 'nav-item active' })
      setselectedTabStyle((prevSelected) => ({
        ...prevSelected,
        [name]: { display: "block" },
      }));
      // setselectedTabStyle({ 'li_1', 'li_2': { 'display': 'block' } })
    } else if (e.target.name) {
      setSelectedTab((prevSelected) => ({
        ...prevSelected,
        [name]: "nav-item",
      }));
      // setSelectedTab({ 'li_1', 'li_2': 'have-children active' })
      setselectedTabStyle((prevSelected) => ({
        ...prevSelected,
        [name]: { display: "none" },
      }));
    }
  }
  return (
    <nav className="nav flex-column" id="box2">
      {/* <p>Personal</p>
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
            {store.userData.is_psicologo ? <a className="nav-link" href="#">Mercado</a> : ""} */}

      <main>
        {/* <ul className="sidebar-menu">

        </ul> */}
        <div className="wrapper">
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <div className="sidebar">
              {/* <div className="form-inline">
                                <div className="input-group" data-widget="sidebar-search">
                                    <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-sidebar">
                                            <i className="fas fa-search fa-fw" />
                                        </button>
                                    </div>
                                </div>
                            </div> */}
              {/* <ul className="sidebar-menu">
                                <li><span className="nav-section-title"></span></li>
                                <li className={selectedTab['li_1']} onClick={changeSelect}><a name='li_1' href="#"><span className="fa fa-university"></span>Personal</a>
                                    <ul style={selectedTabStyle['li_1']} >
                                        <li><a href="#">Perfil</a></li>
                                        <li><a href="#">Sesiones Online</a></li>
                                        {store.userData.is_psicologo ? <li> <a className="nav-link" href="#">Agenda del dia</a></li> : ""}
                                        {store.userData.is_psicologo ? <li><a className="nav-link" href="#">Contactos personales</a></li> : ""}
                                        {store.userData.is_psicologo ? <li><a className="nav-link" href="#">Configuracion</a></li> : ""}
                                    </ul>
                                </li>
                                {store.userData.is_psicologo ? <li className={selectedTab['li_2']} onClick={changeSelect} ><a name='li_2' href="#"><span className="fa fa-tags"></span>Admin. Pacientes</a>
                                    <ul style={selectedTabStyle['li_2']}>
                                        <li><a className="dropdown-item" href="#">Expedientes</a></li>
                                        <li><a className="dropdown-item" href="#">Manejo de agenda</a></li>
                                    </ul>
                                </li> : ""}
                                {store.userData.is_psicologo ? <li className={selectedTab['li_3']} onClick={changeSelect} ><a name='li_3' href="#"><span className="fa fa-tags"></span>Admin. Cuenta</a>
                                    <ul style={selectedTabStyle['li_3']}>
                                        <li><a className="dropdown-item" href="#">Facturacion</a></li>
                                        <li><a className="dropdown-item" href="#">Modalidad de pago</a></li>
                                    </ul>
                                </li> : ""}
                                <li className={selectedTab['li_4']} onClick={changeSelect} ><a name='li_4' href="#"><span className="fa fa-tags"></span>Navega</a>
                                    <ul style={selectedTabStyle['li_4']}>
                                        <li><a href="#">Noticias</a></li>
                                        <li><a href="/buscador">Buscador de psicologos</a></li>
                                        {store.userData.is_psicologo ? <li> <a className="nav-link" href="#">Mercado</a></li> : ""}
                                    </ul>
                                </li>

                            </ul> */}
              <nav className="mt-2">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <li className={selectedTab["li_1"]} onClick={changeSelect}>
                    <a name="li_1" href="#" className="nav-link">
                      <i className="nav-icon fas fa-tachometer-alt" />
                      <p>
                        Personal
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul
                      style={selectedTabStyle["li_1"]}
                      className="nav nav-treeview"
                    >
                      <li className="nav-item">
                        <a href="/perfil" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Perfil</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/sessions" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Sesiones Online</p>
                        </a>
                      </li>
                      {store.userData.is_psicologo ? (
                        <div>
                          {" "}
                          <li className="nav-item">
                            <a href="/calendar" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Agenda del dia</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Contactos personales</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Configuracion</p>
                            </a>
                          </li>
                        </div>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>
                  {store.userData.is_psicologo ? (
                    <li className={selectedTab["li_2"]} onClick={changeSelect}>
                      <a name="li_2" href="#" className="nav-link">
                        <i className="nav-icon fas fa-tachometer-alt" />
                        <p>
                          Administración de Pacientes
                          <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul
                        style={selectedTabStyle["li_2"]}
                        className="nav nav-treeview"
                      >
                        <div>
                          {" "}
                          <li className="nav-item">
                            <a href="../../index3.html" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Expedientes</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="../../index3.html" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Manejo de Agenda</p>
                            </a>
                          </li>
                        </div>
                      </ul>
                    </li>
                  ) : (
                    ""
                  )}
                  {store.userData.is_psicologo ? (
                    <li className={selectedTab["li_3"]} onClick={changeSelect}>
                      <a name="li_3" href="#" className="nav-link">
                        <i className="nav-icon fas fa-tachometer-alt" />
                        <p>
                          Administración de Cuenta
                          <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul
                        style={selectedTabStyle["li_3"]}
                        className="nav nav-treeview"
                      >
                        <div>
                          {" "}
                          <li className="nav-item">
                            <a href="../../index3.html" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Facturacion</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="../../index3.html" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Modalidad de Pago</p>
                            </a>
                          </li>
                        </div>
                      </ul>
                    </li>
                  ) : (
                    ""
                  )}
                  <li className={selectedTab["li_4"]} onClick={changeSelect}>
                    <a name="li_4" href="#" className="nav-link">
                      <i className="nav-icon fas fa-tachometer-alt" />
                      <p>
                        Navega
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul
                      style={selectedTabStyle["li_4"]}
                      className="nav nav-treeview"
                    >
                      <li className="nav-item">
                        <a href="../../index.html" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Noticias</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/buscador" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Buscador de Psicologo</p>
                        </a>
                      </li>
                      {store.userData.is_psicologo ? (
                        <div>
                          {" "}
                          <li className="nav-item">
                            <a href="../../index3.html" className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>Mercado</p>
                            </a>
                          </li>
                        </div>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>

                  {/* <li className="nav-header">EXAMPLES</li>
                                    <li className="nav-item">
                                        <a href="../calendar.html" className="nav-link">
                                            <i className="nav-icon far fa-calendar-alt" />
                                            <p>
                                                Calendar
                                                <span className="badge badge-info right">2</span>
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="../gallery.html" className="nav-link">
                                            <i className="nav-icon far fa-image" />
                                            <p>Gallery</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="../kanban.html" className="nav-link">
                                            <i className="nav-icon fas fa-columns" />
                                            <p>Kanban Board</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-envelope" />
                                            <p>
                                                Mailbox
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="../mailbox/mailbox.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Inbox</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../mailbox/compose.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Compose</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../mailbox/read-mail.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Read</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-book" />
                                            <p>
                                                Pages
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="../examples/invoice.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Invoice</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/profile.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Profile</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/e-commerce.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>E-commerce</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/projects.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Projects</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/project-add.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Project Add</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/project-edit.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Project Edit</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/project-detail.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Project Detail</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/contacts.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Contacts</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/faq.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>FAQ</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/contact-us.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Contact us</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-plus-square" />
                                            <p>
                                                Extras
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>
                                                        Login &amp; Register v1
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul className="nav nav-treeview">
                                                    <li className="nav-item">
                                                        <a href="../examples/login.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon" />
                                                            <p>Login v1</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="../examples/register.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon" />
                                                            <p>Register v1</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="../examples/forgot-password.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon" />
                                                            <p>Forgot Password v1</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="../examples/recover-password.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon" />
                                                            <p>Recover Password v1</p>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>
                                                        Login &amp; Register v2
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul className="nav nav-treeview">
                                                    <li className="nav-item">
                                                        <a href="../examples/login-v2.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon" />
                                                            <p>Login v2</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="../examples/register-v2.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon" />
                                                            <p>Register v2</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="../examples/forgot-password-v2.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon" />
                                                            <p>Forgot Password v2</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="../examples/recover-password-v2.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon" />
                                                            <p>Recover Password v2</p>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/lockscreen.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Lockscreen</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/legacy-user-menu.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Legacy User Menu</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/language-menu.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Language Menu</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/404.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Error 404</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/500.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Error 500</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/pace.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Pace</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../examples/blank.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Blank Page</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../../starter.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Starter Page</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-search" />
                                            <p>
                                                Search
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="../search/simple.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Simple Search</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="../search/enhanced.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Enhanced</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-header">MISCELLANEOUS</li>
                                    <li className="nav-item">
                                        <a href="../../iframe.html" className="nav-link">
                                            <i className="nav-icon fas fa-ellipsis-h" />
                                            <p>Tabbed IFrame Plugin</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://adminlte.io/docs/3.1/" className="nav-link">
                                            <i className="nav-icon fas fa-file" />
                                            <p>Documentation</p>
                                        </a>
                                    </li>
                                    <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="fas fa-circle nav-icon" />
                                            <p>Level 1</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-circle" />
                                            <p>
                                                Level 1
                                                <i className="right fas fa-angle-left" />
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Level 2</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>
                                                        Level 2
                                                        <i className="right fas fa-angle-left" />
                                                    </p>
                                                </a>
                                                <ul className="nav nav-treeview">
                                                    <li className="nav-item">
                                                        <a href="#" className="nav-link">
                                                            <i className="far fa-dot-circle nav-icon" />
                                                            <p>Level 3</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#" className="nav-link">
                                                            <i className="far fa-dot-circle nav-icon" />
                                                            <p>Level 3</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#" className="nav-link">
                                                            <i className="far fa-dot-circle nav-icon" />
                                                            <p>Level 3</p>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>Level 2</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="fas fa-circle nav-icon" />
                                            <p>Level 1</p>
                                        </a>
                                    </li>
                                    <li className="nav-header">LABELS</li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-circle text-danger" />
                                            <p className="text">Important</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-circle text-warning" />
                                            <p>Warning</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-circle text-info" />
                                            <p>Informational</p>
                                        </a>
                                    </li> */}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </nav>
  );
};
