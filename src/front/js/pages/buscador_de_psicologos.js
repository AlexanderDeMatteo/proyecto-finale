import React, { useState, useContext, useEffect } from "react";
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
      <div className="container-fluid">
        <div className="row justify-content-evenly mt-5">
          {store.userPsicologos.map((psicologo, index) => {
            return <CardPsicologo info={psicologo} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};
