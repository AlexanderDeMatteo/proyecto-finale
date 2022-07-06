import React, { useState, useContext, useEffect } from "react";
import "../../styles/buscador_de_psicologos.css"
import { Context } from "../store/appContext";
import { PsicologoCards } from "../component/listaPsicologos";

export const Buscador_de_psicologos = () => {
    const { actions, store } = useContext(Context)
    const [aja, setAja] = useState({})
    useEffect(() => {
        // actions.privateData()
        actions.handle_user_psicologo();
    }, [])
    return (

        <>
            <div className="boxPrincipal">
                <p>"hola</p>

                <div className="boxBuscador">
                    <PsicologoCards data={aja} />


                </div>
            </div>






        </>








    )
}
