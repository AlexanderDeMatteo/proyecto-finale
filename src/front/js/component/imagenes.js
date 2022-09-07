import React, { useState, useContext, useEffect } from "react";
import "../../styles/imagenes.css"
import { Context } from "../store/appContext";


export const Imagenes = () => {
    const { actions } = useContext(Context)
    const [media, setMedia] = useState("")
    const [urlMedia, setUrlMedia] = useState("")
    useEffect(() => {
        if (media != "") uploadFile()


    }, [media])

    async function uploadFile() {
        let YOUR_CLOUD_NAME = "alexander0201";
        let YOUR_UNSIGNED_UPLOAD_PRESET = "zkvkmknt";

        let POST_URL =
            "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

        let formData = new FormData();
        formData.append("file", media)
        formData.append("cloud_name", YOUR_CLOUD_NAME);
        formData.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);

        try {
            const response = await fetch(POST_URL, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const body = await response.json()
                console.log(body)
                //funcion al flux
                setUrlMedia(body.url)
            }
        } catch (error) {
            document.querySelector(`#${id} .status-text`
            ).innerHTML = `<span className="failure">el archivo no pudo subirse...`;
        }
    };
    const handlePicture = () => {
        actions.picture_profile(urlMedia)
    }

    // window.onload = () => {

    //     document.getElementById('agregarFoto').onclick = function () {
    //         document.getElementById('miFoto').click();
    //     };
    // }
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
                    <div className="caja-drop-area">
                        <div className="drop-area">
                            <h2></h2>
                            <label for="img" className="agregarFoto">Seleccionar Imagen</label>
                            <input type="file" id="img" style={{ display: "none" }} onChange={(e) => setMedia(e.target.files[0])} />
                            {/* <button type="button" id="agregarFoto" >
                                <p>Seleccionar Imagen</p>
                                <input type="file" name="" id="miFoto" onChange={(e) => setMedia(e.target.files[0])} />
                            </button> */}
                        </div>
                        <div id="preview">
                            {urlMedia && <img width={50} height={50} src={urlMedia} />}
                        </div>
                    </div>

                    <p className="modal_paragraph">selecciona tu imagen de perfil</p>

                    <a href="#header" className="modal_close">cerrar</a>

                    <a href="#header" className="modal_close" onClick=
                        {handlePicture}
                    >guardar</a>

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