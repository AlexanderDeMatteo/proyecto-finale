import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/buscador_de_psicologos.css"
import { Context } from "../store/appContext.js";
import { PsicologoCards } from "../component/PsicologoCards";

export const BuscadorDePsicologos = () => {
    const { actions, store } = useContext(Context)
    // const [aja, setAja] = useState({})
    const [filtros, setFiltros] = useState({       // estado donde se guardan los parametros del filtro
        precio: "",
        nombre: "",
        numeroFpv: "",
        especialidades: "",
        estado: "",
        ciudad: ""
    })

    const handleChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        // actions.privateData()
        actions.handle_user_psicologo();
    }, [])

    return (
        <>
            <div className="boxPrincipal">
                <div className="d-flex py-1">
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
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Pediatra"
                                        id="flexCheckDefault"
                                        name="especialidades"
                                        onClick={(e) => { handleChange(e) }} />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Default checkbox
                                    </label>
                                </div>
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
                                    placeholder="Precio Maximo por Consulta"
                                    name="estado"
                                    value={filtros.estado}
                                    onChange={(e) => { handleChange(e) }} />
                                <h4 className="mt-2">Ciudad</h4>
                                <input
                                    className="form-control"
                                    placeholder="Precio Maximo por Consulta"
                                    name="ciudad"
                                    value={filtros.ciudad}
                                    onChange={(e) => { handleChange(e) }} />
                                <h4 className="mt-2">Numero FPV</h4>
                                <input
                                    className="form-control"
                                    placeholder="Precio Maximo por Consulta"
                                    name="numeroFpv"
                                    value={filtros.numeroFpv}
                                    onChange={(e) => { handleChange(e) }} />
                            </form>
                        </div>
                    </div>
                    <p>Encuentra tu psicologo ideal</p>
                </div>
                <div className="boxBuscador">
                    <PsicologoCards filtros={filtros} />
                </div>
            </div>
        </>
    )
}
