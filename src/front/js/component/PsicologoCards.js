import React, { useState, useContext, useEffect } from "react";
import { Card } from "./card.js";
import { Context } from "../store/appContext.js";

export const PsicologoCards = () => {
  const { store, actions } = useContext(Context);

  const filter = () => {             // Funcion en donde se filtran los psicologos mediante los datos recibidos
    let filtrado = store.userPsicologos.filter(psico => 
      (psico.monto < 100 && psico.monto !== null) 
      || psico.name == "" 
      || psico.numero_fpv == "547"
    )
    console.log(filtrado)
    return filtrado
  }

  return (
    <div className="row" id="overflow">
      {
        filter() == "" ?   // Verifica que se haya hecho un filtro. Sino, se muestran todos los psicologos
          store.userPsicologos.map((vistaPsicologo, index) => {
            return (
              <Card
                key={index}
                area_de_especialidad={vistaPsicologo.area_de_especialidad}
                name={vistaPsicologo.name}
                last_name={vistaPsicologo.last_name}
                precio_consulta={vistaPsicologo.monto}
                profile_picture={vistaPsicologo.profile_picture}
                colSpacing="col-4"
              />
            );
          })
          : // Se muestran los psicologos filtrados 
          filter().map((vistaPsicologo, index) => {
            return (
              <Card
                key={index}
                area_de_especialidad={vistaPsicologo.area_de_especialidad}
                name={vistaPsicologo.name}
                last_name={vistaPsicologo.last_name}
                precio_consulta={vistaPsicologo.monto}
                profile_picture={vistaPsicologo.profile_picture}
                colSpacing="col-4"
              />
            );
          })
      }
    </div>
  );
};
