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
        ciudad: "",
        ci: ""
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

    const [showFiltros, setShowFiltros] = useState(false)

    useEffect(() => {
        // actions.privateData()
        actions.handle_user_psicologo();
    }, [])

    return (
        <>
            <div className="content-wrapper">
                <div className="boxPrincipal">
                    <div className="d-flex py-1 justify-content-start" >
                        <p>Encuentra tu psicologo ideal</p>
                        <button
                            type="button"
                            className="ms-1 btn btn-primary"
                            onClick={(e) => {
                                if (showFiltros == true) return setShowFiltros(false)
                                setShowFiltros(true)
                            }}>
                            <i className="fa-solid fa-sliders"></i> Filtros
                        </button>
                    </div>

                    <div className="boxBuscador">
                        <PsicologoCards filtros={filtros} />
                        {showFiltros ?
                            <div className="filtros">
                                <form>
                                    <button className="dropdowns btn btn-secondary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEspecialidad" aria-expanded="false" aria-controls="collapseExample">
                                        Busqueda por Especialidad
                                    </button>
                                    <div className="collapse" id="collapseEspecialidad">
                                        <div className="card card-body">
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
                                        </div>
                                    </div>
                                    <button className="dropdowns btn btn-secondary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCredenciales" aria-expanded="false" aria-controls="collapseExample">
                                        Busqueda por Credenciales
                                    </button>
                                    <div className="collapse" id="collapseCredenciales">
                                        <div className="card card-body">
                                            Cedula de Identidad
                                            <input
                                                className="form-control"
                                                placeholder="Cedula de Identidad"
                                                name="ci"
                                                value={filtros.ci}
                                                onChange={(e) => { handleChange(e) }} />
                                            Numero FPV
                                            <input
                                                className="form-control"
                                                placeholder="Numero FPV del Psicologo"
                                                name="numeroFpv"
                                                value={filtros.numeroFpv}
                                                onChange={(e) => { handleChange(e) }} />
                                        </div>
                                    </div>
                                    <button className="dropdowns btn btn-secondary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDatos" aria-expanded="false" aria-controls="collapseExample">
                                        Busqueda por Datos Personales
                                    </button>
                                    <div className="collapse" id="collapseDatos">
                                        <div className="card card-body">
                                            Nombre y Apellido
                                            <input
                                                className="form-control"
                                                placeholder="Nombre del Psicologo"
                                                name="nombre"
                                                value={filtros.nombre}
                                                onChange={(e) => { handleChange(e) }} />
                                        </div>
                                    </div>
                                    <button className="dropdowns btn btn-secondary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrecio" aria-expanded="false" aria-controls="collapseExample">
                                        Busqueda por Precio de Consulta
                                    </button>
                                    <div className="collapse" id="collapsePrecio">
                                        <div className="card card-body">
                                            Precio
                                            <input
                                                className="form-control"
                                                placeholder="Precio Maximo por Consulta"
                                                name="precio"
                                                value={filtros.precio}
                                                onChange={(e) => { handleChange(e) }} />
                                        </div>
                                    </div>
                                    <button className="dropdowns btn btn-secondary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLocal" aria-expanded="false" aria-controls="collapseExample">
                                        Busqueda por Localizacion
                                    </button>
                                    <div className="collapse" id="collapseLocal">
                                        <div className="card card-body">
                                            Estado
                                            <input
                                                className="form-control"
                                                placeholder="Estado de Residencia"
                                                name="estado"
                                                value={filtros.estado}
                                                onChange={(e) => { handleChange(e) }} />
                                            Ciudad
                                            <input
                                                className="form-control"
                                                placeholder="Ciudad de Residencia"
                                                name="ciudad"
                                                value={filtros.ciudad}
                                                onChange={(e) => { handleChange(e) }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            :
                            null}
                    </div>
                </div>
            </div>
        </>
    )
}
