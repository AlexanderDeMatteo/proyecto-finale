import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/paginaPrincipal.css"

export const PaginaPrincipal = () => {
    const API_URL = process.env.BACKEND_URL;
    const [show, setShow] = useState(true);
    const [profileUser, setProfile] = useState({});




    function Editar() {
        setShow(wasShow => !wasShow)

    }


    function handleChange(event) {
        event.persist()
        setProfile(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const handle_user_data = async () => {
        let response = await fetch(`${API_URL}/api/user-data`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            // body: JSON.stringify([])
        });

        if (response.ok) {
            let body = await response.json()
            setProfile(body)
        }
    }

    const guardar = async () => {
        delete profileUser.email
        delete profileUser.id
        delete profileUser.status
        console.log(profileUser)
        const response = await fetch(`${API_URL}/api/user-data`, {
            method: "PUT",
            body: JSON.stringify(profileUser),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        if (response.ok) {
            alert("datos actualizados");
        }
    };


    useEffect(() => {
        handle_user_data();
    }, []);



    return (
        <div className="box3">
            <section >
                <div className="container py-5">
                    {/* <div className="row">
                        <div className="col">
                        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#">User</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                                </ol>
                            </nav>
                        </div>
                    </div> */}

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                        className="rounded-circle img-fluid" />
                                    <h5 className="my-3">{profileUser.name}</h5>
                                    <p className="text-muted mb-1">{profileUser.area_de_especialidad}</p>
                                    <p className="text-muted mb-4">{profileUser.hubicacion}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-primary">Follow</button>
                                        <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fas fa-globe fa-lg text-warning"></i>
                                            <p className="mb-0">https://mdbootstrap.com</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-github fa-lg" ></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-twitter fa-lg" ></i>
                                            <p className="mb-0">@mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-instagram fa-lg" ></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-facebook-f fa-lg" ></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Name</p>
                                        </div>
                                        <div className="col-sm-9">

                                            {!show ? <input onChange={handleChange} type="text" className="text-muted mb-0" name="name" value={profileUser.name} /> : <p className="text-muted mb-0">{profileUser.name}</p>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">lastname</p>
                                        </div>
                                        <div className="col-sm-9">
                                            {!show ? <input onChange={handleChange} type="text" className="text-muted mb-0" name="last_name" value={profileUser.last_name} /> : <p className="text-muted mb-0">{profileUser.last_name}</p>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p name="email" value={profileUser.email} className="text-muted mb-0">{profileUser.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Area de Especialidad</p>
                                        </div>
                                        <div className="col-sm-9">
                                            {!show ? <input onChange={handleChange} type="text" className="text-muted mb-0" name="area_de_especialidad" value={profileUser.area_de_especialidad} /> : <p className="text-muted mb-0">{profileUser.area_de_especialidad}</p>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Telefono</p>
                                        </div>
                                        <div className="col-sm-9">
                                            {!show ? <input onChange={handleChange} type="text" className="text-muted mb-0" name="numero_telefonico" value={profileUser.numero_telefonico} /> : <p className="text-muted mb-0">{profileUser.numero_telefonico}</p>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">numero de FPV</p>
                                        </div>
                                        <div className="col-sm-9">
                                            {!show ? <input onChange={handleChange} type="text" className="text-muted mb-0" name="numero_fpv" value={profileUser.numero_fpv} /> : <p className="text-muted mb-0">{profileUser.numero_fpv}</p>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">pais</p>
                                        </div>
                                        <div className="col-sm-9">
                                            {!show ? <input onChange={handleChange} type="text" className="text-muted mb-0" name="pais" value={profileUser.pais} /> : <p className="text-muted mb-0">{profileUser.pais}</p>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">ciudad</p>
                                        </div>
                                        <div className="col-sm-9">
                                            {!show ? <input onChange={handleChange} type="text" className="text-muted mb-0" name="ciudad" value={profileUser.ciudad} /> : <p className="text-muted mb-0">{profileUser.ciudad}</p>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">status</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p name="status" value={profileUser.status} className="text-muted mb-0">{profileUser.status}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <button id="boton1" onClick={guardar} type="button" className="btn btn-primary">guardar</button>
                                            <button id="boton2" onClick={Editar} type="button" className="btn btn-primary">Editar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4 mb-md-0">
                                <div className="card-body">
                                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                    </p>
                                    <p className="mb-1" >Web Design</p>
                                    <div className="progress rounded" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="80"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" >Website Markup</p>
                                    <div className="progress rounded" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="72"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" >One Page</p>
                                    <div className="progress rounded" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="89"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" >Mobile Template</p>
                                    <div className="progress rounded" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="55"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" >Backend API</p>
                                    <div className="progress rounded mb-2" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="66"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4 mb-md-0">
                                <div className="card-body">
                                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                    </p>
                                    <p className="mb-1" >Web Design</p>
                                    <div className="progress rounded" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="80"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" >Website Markup</p>
                                    <div className="progress rounded" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="72"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" >One Page</p>
                                    <div className="progress rounded" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="89"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" >Mobile Template</p>
                                    <div className="progress rounded" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="55"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" >Backend API</p>
                                    <div className="progress rounded mb-2" >
                                        <div className="progress-bar" role="progressbar" aria-valuenow="66"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};