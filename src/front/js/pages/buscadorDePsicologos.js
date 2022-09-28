import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/buscador_de_psicologos.css"
import { Context } from "../store/appContext.js";
import { PsicologoCards } from "../component/PsicologoCards";

export const BuscadorDePsicologos = () => {
    const { actions, store } = useContext(Context)
    const [filtros, setFiltros] = useState({       // estado donde se guardan los parametros del filtro
        precio: "",
        nombre: "",
        numeroFpv: "",
        especialidades: [],
        estado: "",
        ciudad: ""
    })

    const handleChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value.toLowerCase() })
    }

    const handleCheck = (e) => {                 // verifica si las especialidades ya han sido marcadas para saber si las agrega o las quita
        if (filtros.especialidades.find(especialidad => especialidad == e.target.value) == undefined) {
            setFiltros({ ...filtros, especialidades: [...filtros.especialidades, e.target.value] })
            return
        } else {
            setFiltros({
                ...filtros,
                especialidades: filtros.especialidades.filter(especialidad => especialidad !== e.target.value)
            })
        }
    }

    let especialidades = ["Psicología Cognitiva", "Psicología Clínica",   // array de las especialidades
        "Neuro Psicología", "Psicólogia Biológica",
        "Psicología Comparativa o Etiología", "Psicología Educativa",
        "Psicología Evolutiva", "Psicología del Deporte",
        "Psicología Jurídica", "Psicología de la Personalidad",
        "Psicología de la Salud", "Psicología de Parejas",
        "Psicología Familiar", "Psicología Empresarial y Organizacional",
        "Psicología Militar", "Psicología Escolar",
        "Psicología Gerontológica", "Psicología Experimental",
        "Psicología Del Desarrollo", "Psicología de Ingeniería",
        "Psicología del Marketing", "Sexología",
        "Psicología comunitaria"]

    useEffect(() => {
        // actions.privateData()
        actions.handle_user_psicologo();
    }, [])

    return (
        <>
            <div className="content-wrapper">
                <div className="boxPrincipal">
                    <div className="d-flex py-1 justify-content-between">
                        <p>Encuentra tu psicologo ideal</p>
                        <button className="btn btn-primary me-2 ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            <i className="fa-solid fa-sliders"></i> Filtros
                        </button>
                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div className="offcanvas-header">
                                <h1 className="offcanvas-title" id="offcanvasExampleLabel">Filtros</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <form>
                                    <h4 className="mt-2">Especialidades</h4>
                                    {especialidades.map((especialidad, index) => {       // mapea el array especialidades
                                        return (
                                            <div key={index} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={especialidad}
                                                    id="flexCheckDefault"
                                                    name="especialidades"
                                                    onClick={(e) => {
                                                        handleCheck(e)
                                                    }} />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    {especialidad}
                                                </label>
                                            </div>
                                        )
                                    })}
                                    <h4 className="mt-2">Precio</h4>
                                    <input
                                        className="form-control"
                                        placeholder="Precio Maximo por Consulta"
                                        name="precio"
                                        value={filtros.precio}
                                        onChange={(e) => { handleChange(e) }} />
                                    <h4 className="mt-2">Estado</h4>
                                    <input
                                        className="form-control"
                                        placeholder="Estado de Residencia"
                                        name="estado"
                                        value={filtros.estado}
                                        onChange={(e) => { handleChange(e) }} />
                                    <h4 className="mt-2">Ciudad</h4>
                                    <input
                                        className="form-control"
                                        placeholder="Ciudad de Residencia"
                                        name="ciudad"
                                        value={filtros.ciudad}
                                        onChange={(e) => { handleChange(e) }} />
                                    <h4 className="mt-2">Numero FPV</h4>
                                    <input
                                        className="form-control"
                                        placeholder="Numero FPV del Psicologo"
                                        name="numeroFpv"
                                        value={filtros.numeroFpv}
                                        onChange={(e) => { handleChange(e) }} />
                                    <h4 className="mt-2">Nombre del Psicologo</h4>
                                    <input
                                        className="form-control"
                                        placeholder="Nombre del Psicologo"
                                        name="nombre"
                                        value={filtros.nombre}
                                        onChange={(e) => { handleChange(e) }} />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="boxBuscador">
                        <PsicologoCards filtros={filtros} />
                    </div>
                </div>
            </div>
        </>
    )
}
