import { func } from "prop-types";
import React from "react";
import "../../styles/drag_and_drop.css"

export const Drag_and_drop = () => {
    window.onload = () => {

        const dropArea = document.querySelector(".drop-area");
        const dragText = dropArea.querySelector("h2");
        const button = dropArea.querySelector("button");
        const input = dropArea.querySelector("#input-file");
        let files;

        button.addEventListener("click", (e) => {
            input.click();
        });

        input.addEventListener("change", (e) => {
            files = this.files;
            dropArea.classList.add("active");
            showFiles(files);
            dropArea.classList.remove("active");
        });

        dropArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropArea.classList.add("active");
            dragText.textContent = "suelta para subir los archivos";
        });

        dropArea.addEventListener("dragleave", (e) => {
            e.preventDefault();
            dropArea.classList.remove("active");
            dragText.textContent = "arrastra y suelta imagenes";
        });

        dropArea.addEventListener("drop", (e) => {
            e.preventDefault();
            files = e.dataTransfer.files;
            showFiles(files);
            dropArea.classList.remove("active");
            dragText.textContent = "arrastra y suelta imagenes";
        });

        function showFiles(files) {
            if (files.length == undefined) {
                processFile(files);
            } else {
                for (const file of files) {
                    processFile(file);
                }
            }
        }

        function processFile(file) {
            const docType = file.type;
            const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

            if (validExtensions.includes(docType)) {
                //archivo valido
                const fileReader = new FileReader();
                const id = `file-${Math.random().toString(32).substring(7)}`;

                fileReader.addEventListener('load', e => {
                    const fileUrl = fileReader.result;
                    const image = `
                    <div id="${id}" className="file-container">
                        <img src="${fileUrl}" alt="${file.name}" width="50">
                        <div className="status">
                            <span>${file.name}</pan>
                            <span className="status-text">
                                Loading...
                            <span/>
                        </div>
                    <div/>
                    `;
                    const html = document.querySelector('#preview').innerHTML;
                    document.querySelector('#preview').innerHTML = image + html;
                });


                fileReader.readAsDataURL(file)
                uploadFile(file, id);

            } else {
                //no es un archivo valido
                alert('no es un archivo valido')
            }
        }
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
                    <span>0</span>
                    <button>selecciona tus archivos</button>
                    <input type="file" name="" id="input-file" hidden multiple />
                </div>
                <div id="preview"></div>
            </div>



        </>








    )
}