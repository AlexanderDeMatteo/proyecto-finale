import { func } from "prop-types";
import React, { useState, useEffect } from "react";


export const Drag_and_drop = () => {
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


    window.onload = () => {

        document.getElementById('get_file').onclick = function () {
            document.getElementById('my_file').click();
        };

        //     const dropArea = document.querySelector(".drop-area");
        //     const dragText = dropArea.querySelector("h2");
        //     const button = dropArea.querySelector("button");
        //     const input = dropArea.querySelector("#input-file");
        //     let files;

        //     button.addEventListener("click", (e) => {
        //         input.click();
        //     });

        //     input.addEventListener("change", (e) => {
        //         files = this.files;
        //         dropArea.classList.add("active");
        //         showFiles(files);
        //         dropArea.classList.remove("active");
        //     });

        //     dropArea.addEventListener("dragover", (e) => {
        //         e.preventDefault();
        //         dropArea.classList.add("active");
        //         dragText.textContent = "suelta para subir los archivos";
        //     });

        //     dropArea.addEventListener("dragleave", (e) => {
        //         e.preventDefault();
        //         dropArea.classList.remove("active");
        //         dragText.textContent = "arrastra y suelta imagenes";
        //     });

        // dropArea.addEventListener("drop", (e) => {
        //     e.preventDefault();
        //     files = e.dataTransfer.files;
        //     showFiles(files);
        //     dropArea.classList.remove("active");
        //     dragText.textContent = "arrastra y suelta imagenes";
        // });

        //     function showFiles(files) {
        //         if (files.length == undefined) {
        //             processFile(files);
        //         } else {
        //             for (const file of files) {
        //                 processFile(file);
        //             }
        //         }
        //     }

        //     function processFile(file) {
        //         const docType = file.type;
        //         const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

        //         if (validExtensions.includes(docType)) {
        //             //archivo valido
        //             const fileReader = new FileReader();
        //             const id = `file-${Math.random().toString(32).substring(7)}`;

        //             fileReader.addEventListener('load', e => {
        //                 const fileUrl = fileReader.result;
        //                 const image = `
        //                 <div id="${id}" className="file-container">
        //                     <img src="${fileUrl}" alt="${file.name}" width="50">
        //                     <div className="status">
        //                         <span>${file.name}</pan>
        //                         <span className="status-text">
        //                             Loading...
        //                         <span/>
        //                     </div>
        //                 <div/>
        //                 `;
        //                 const html = document.querySelector('#preview').innerHTML;
        //                 document.querySelector('#preview').innerHTML = image + html;
        //             });


        //             fileReader.readAsDataURL(file)
        //             // uploadFile(file, id);

        //         } else {
        //             //no es un archivo valido
        //             alert('no es un archivo valido')
        //         }
        //     }
    }







    // function uploadFile(file) {
    //     const formData = new formData();
    //     formData.append("file", file);

    //     try {
    //         const response = await fetch("", {
    //             method: "POST",
    //             body: formData
    //         });

    //         const responseText = await response.text();

    //         document.querySelector(`#${id} .status-text`
    //         ).innerHTML = `<span className="succes"> archivo subido correctamente...`;

    //     } catch (error) {
    //         document.querySelector(`#${id} .status-text`
    //         ).innerHTML = `<span className="failure">el archivo no pudo subirse...`;
    //     }
    // };



    return (
        <>
            <div className="caja-drop-area">
                <div className="drop-area">
                    <h2>Arrastra y suelta imagenes</h2>
                    {/* <span>0</span> */}
                    <input type="button" id="get_file" value="selecionar imagen" />
                    <input type="file" name="" id="my_file" onChange={(e) => setMedia(e.target.files[0])} />
                </div>
                <div id="preview">
                    {urlMedia && <img width={50} height={50} src={urlMedia} />}
                </div>
            </div>



        </>








    )
}