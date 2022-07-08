import React, { useState, useContext, useEffect } from "react";
import { Card } from "./card.js";
import { Context } from "../store/appContext.js";

export const PsicologoCards = (data) => {
  const { store, actions } = useContext(Context);
  console.log(Context)
  console.log(data)
  console.log({ store })
  console.table(store.userPsicologos)
  return (
    <div className="row" id="overflow">
      {store.userPsicologos.map((vistaPsicologo, index) => {
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
      })}
    </div>
  );
};
