import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar2.scss"
import { Context } from "../store/appContext";





export const Sidebar = () => {
    const { store } = useContext(Context)



    const [selectedTab, setSelectedTab] = React.useState({ 'li_1': 'have-children', 'li_2': 'have-children' })
    const [selectedTabStyle, setselectedTabStyle] = React.useState({ 'li_1': { 'display': 'none' }, 'li_2': { 'display': 'none' } })


    function changeSelect(e) {
        const { name } = e.target
        if (e.target.name && selectedTab[name] === 'have-children') {
            setSelectedTab(prevSelected => ({
                ...prevSelected, [name]: 'have-children active'
            }))
            // setSelectedTab({ 'li_1': 'have-children active' })
            setselectedTabStyle(prevSelected => ({
                ...prevSelected, [name]: { 'display': 'block' }
            }))
            // setselectedTabStyle({ 'li_1': { 'display': 'block' } })

        } else if (e.target.name) {
            setSelectedTab(prevSelected => ({
                ...prevSelected, [name]: 'have-children'
            }))
            // setSelectedTab({ 'li_1': 'have-children active' })
            setselectedTabStyle(prevSelected => ({
                ...prevSelected, [name]: { 'display': 'none' }
            }))
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
                <ul className="sidebar-menu">
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
                    <li className={selectedTab['li_2']} onClick={changeSelect} ><a name='li_2' href="#"><span className="fa fa-tags"></span>Navega</a>
                        <ul style={selectedTabStyle['li_2']}>
                            <li><a href="#">Noticias</a></li>
                            <li><a href="/buscador">Buscador de psicologos</a></li>
                        </ul>
                    </li>

                </ul>

            </main>

        </nav>
    );
};
