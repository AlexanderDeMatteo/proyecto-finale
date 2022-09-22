import React, { useState, useContext, useEffect } from "react";
import "../../styles/buscador_de_psicologos.css";
import { Context } from "../store/appContext";
import { CardPsicologo } from "../component/PsicologosCard";

export const Buscador_de_psicologos = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    // actions.privateData()
    actions.handle_user_psicologo();
  }, []);
  return (
    <>
      <div className="container">
        <div className="boxBuscador">
          {store.userPsicologos.map((psicologo, index) => {
            return <CardPsicologo info={psicologo} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};
