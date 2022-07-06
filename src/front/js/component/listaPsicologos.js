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
      {store.userPsicologos.map((esto, index) => {
        return (
          <Card
            key={index}
            area_de_especialidad={esto.area_de_especialidad}
            name={esto.name}
            lastname={esto.lastname}
            precio_consulta={esto.monto}
            profile_picture={esto.profile_picture}
            colSpacing="col-4"
          />
        );
      })}
    </div>
  );
};
