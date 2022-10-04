import React, { useState, useContext, useEffect } from "react";
import { Card } from "../buscador_components/cardBuscador";
import { Context } from "../../store/appContext.js";
import PropsType from "prop-types";

export const PsicologoCards = ({ filtros }) => {             // recibe por props los argumentos para filtrar
  const { store, actions } = useContext(Context);

  const filtrado = () => {             // Funcion en donde se filtran los psicologos mediante los datos recibidos
    let filtrados = store.userPsicologos.filter(psico =>
      (psico.monto < filtros?.precio && psico.monto !== null)
      || psico.name.toLowerCase() == filtros?.nombre.toLowerCase()
      || psico.numero_fpv == filtros?.numeroFpv
      || psico.estado == filtros?.estado
      || psico.ciudad == filtros?.ciudad
    )
    return filtrados
  }

  return (
    <div style={{ margin: "inherit" }}>
      <div className="container-fluid">
        <div className="row">

          {
            filtrado() == "" ?   // Verifica que se haya hecho un filtro. Sino, se muestran todos los psicologos
              store.userPsicologos.map((vistaPsicologo, index) => {
                return (
                  <Card
                    key={index}
                    id={vistaPsicologo.id}
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
              filtrado().map((vistaPsicologo, index) => {
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
      </div>
    </div>
  );
};

PsicologoCards.propsType = {
  filtros: PropsType.object
}