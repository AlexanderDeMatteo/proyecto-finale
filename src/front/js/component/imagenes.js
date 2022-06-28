import React, { useState, useContext, useEffect } from "react";
import "../../styles/imagenes.css"
import { Drag_and_drop } from "../component/drag_and_drop"

export const Imagenes = () => {

    return (



        <>
            <header id="header" className="header">
                <a href="#modal" className="cta">cambiar imagen de perfil</a>
            </header>

            <section id="modal" className="modal">
                <div className="modal_container">
                    <figure className="modal_picture">
                        <img src="" className="modal_img" />
                    </figure>
                    <Drag_and_drop />

                    <p className="modal_paragraph">lorem20</p>

                    <a href="#header" className="modal_close">cerrar</a>

                </div>
            </section>

        </>
    )


    //     document.getElementById("btnabrir").addEventListener("click", function () {
    //         document.getElementsByClassName("fondo_transparente")[0].style.display = "block"
    //         return false
    //     })

    //     document.getElementsByClassName("modal_cerrar")[0].addEventListener("click", function () {
    //         document.getElementsByClassName("fondo_transparente")[0].style.display = "none"
    //     })


    //     return (
    //         <>
    //             <div className="page">
    //                 <a href="#" className="boton" id="btnabrir">ABRIR VENTANA</a>
    //             </div>
    //             <div className="fondo_transparente">
    //                 <div className="modal">
    //                     <div className="modal_cerrar">
    //                         <span>x</span>
    //                     </div>
    //                     <div className="modal_titulo">ventana modal</div>
    //                     <div className="modal_mensaje">
    //                         mensaje modal
    //                     </div>
    //                     <div className="modal_botones">
    //                         <a href="" className="boton">compartir</a>
    //                         <a href="" className="boton">aceptar</a>
    //                     </div>
    //                 </div>
    //             </div>

    //         </>
    //     )
    // }



}