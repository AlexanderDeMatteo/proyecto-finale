import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/paginaPrincipal.css";
import Imager from "../component/perfil_components/consulta.jpg";
import Imager1 from "../component/perfil_components/consulta2.jpg";
import Imager2 from "../component/perfil_components/consulta3.jpeg";
import Imager3 from "../component/perfil_components/consulta3.jpeg";
import Imager4 from "../component/perfil_components/consulta4.jpg";
import psicologo_img from "../component/perfil_components/psicologo.png";
import { Imagenes } from "../component/perfil_components/imagenes";
import { AboutMe } from "../component/perfil_components/AboutMe";
import { uploadFile } from "../component/drag_and_drop";
import Planilla from "../component/selector";
import { Receptor_planillas } from "../component/receptor_planillas";

export const Perfil = () => {
  const API_URL = process.env.BACKEND_URL;
  const [show, setShow] = useState(true);
  const [lista, setLista] = useState({
    la_lista: [],
  });
  const [profileUser, setProfile] = useState({});
  const [modal, setmodal] = useState();
  const history = useHistory();
  const { actions, store } = useContext(Context);
  const [selectedTab, setSelectedTab] = React.useState({
    li_0: { nav: "nav-link active", tab: "active tab-pane" },
    li_1: { nav: "nav-link", tab: "tab-pane" },
    li_2: { nav: "nav-link", tab: "tab-pane" },
    li_3: { nav: "nav-link", tab: "tab-pane" },
    li_4: { nav: "nav-link", tab: "tab-pane" },
  });

  useEffect(() => {
    // actions.privateData()
    actions.handle_user_data();
  }, []);

  function changeSelect(e) {
    const { name } = e.target;
    console.log(store);
    if (e.target.name && selectedTab[name].nav === "nav-link") {
      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter((key) => predicate(obj[key]))
          .reduce((res, key) => ((res[key] = obj[key]), res), {});
      let result = Object.filter(
        selectedTab,
        (score) => score.nav === "nav-link active"
      );
      let [firstKey] = Object.keys(result);

      setSelectedTab((prevSelected) => ({
        ...prevSelected,
        [name]: { nav: "nav-link active", tab: "active tab-pane" },
        [firstKey]: { nav: "nav-link", tab: "tab-pane" },
      }));
    } else if (e.target.name) {
      console.log("bbb");
      setSelectedTab((prevSelected) => ({
        ...prevSelected,
        [name]: { nav: "nav-link", tab: "tab-pane" },
      }));
    }
  }

  function handleModal() {
    show.modal;
  }

  function Editar() {
    if (!show) {
      guardar();
    }
    setShow((wasShow) => !wasShow);
  }

  function handleChange(event) {
    console.log(event.target.value)
    console.log(event.target.name)
    // event.persist();
    actions.handle_edit(event.target.value, event.target.name);
    // actions.handle_edit(prevFormData => {
    //return {
    //  ...prevFormData,
    // [event.target.name]: event.target.value
    //  }
    // })
  }

  // function onDeleter(event, value) {
  // console.log(event.getEventModifierState)
  // console.log(value)
  // // lista.push({ title: value.title, year: value.year })
  // // setLista([])

  // }

  const onDeleter = (e, value) => {
    e.preventDefault();
    let element = lista.la_lista.filter((name) => name !== value);
    console.log(element, "Line 64");
    setLista((prevLista) => {
      return {
        la_lista: element,
      };
    });
  };

  // const handle_user_data = async () => {
  // let response = await fetch(`${API_URL}/api/user-data`, {
  // method: 'GET',
  // headers: {
  // "Content-Type": "application/json",
  // Authorization: `Bearer ${localStorage.getItem("token")}`
  // },
  // // body: JSON.stringify([])
  // });

  // if (response.ok) {
  // let body = await response.json()
  // console.log(body, "assssssssssssssssssssssssssssssssssssssss")
  // setProfile(body)

  // }
  // }

  const guardar = async () => {
    //delete store.userData.profile_picture;
    //delete store.userData.email;
    //delete store.userData.id;
    //delete store.userData.status;
    //delete store.userData.numero_fpv;
    //delete store.userData.is_psicologo;
    const response = await fetch(`${API_URL}/api/user-data`, {
      method: "PUT",
      body: JSON.stringify(store.userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      alert("datos actualizados");
      actions.handle_user_data();
    }
  };

  function handleSelect(event, value) {
    // lista.push({ title: value.title, year: value.year })
    console.log(lista, "Line 109");
    console.log(lista.la_lista, "Line 110");
    // setLista(lista)
    // this.forceUpdate()
    let vistaPsicologo = lista.la_lista;
    if (value != null) {
      vistaPsicologo.push({ title: value.title });
      console.log(vistaPsicologo, "Line 115");
      setLista((prevLista) => {
        return {
          la_lista: vistaPsicologo,
        };
      });
    }
  }

  return (
    <div>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Perfil</h1>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-primary card-outline">
                  <div >
                    <div className="text-center">
                      <img
                        src={
                          store.userData.profile_picture
                            ? store.userData.profile_picture
                            : psicologo_img
                        }
                        alt="User profile picture"
                        id="avatar_perfil"
                        className="profile-user-img img-fluid img-circle"
                      />
                    </div>
                    <h5 className="my-3 text-center">
                      {store.userData.name} {store.userData.last_name}
                    </h5>
                    <p className="text-muted mb-1 text-center">
                      {store.userData.area_de_especialidad}
                    </p>
                    <p className="text-muted mb-2 text-center">
                      {store.userData.phone_number}
                    </p>
                    <p className="text-muted mb-2 text-center">
                      {store.userData.email}
                    </p>

                    <div className="text-center">
                      <Imagenes />
                    </div>

                    <a href="#" className="btn btn-primary btn-block">
                      <b>Follow</b>
                    </a>
                  </div>



                </div>
                <AboutMe user_data={store.userData} />



              </div>

              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li onClick={changeSelect} className="nav-item">
                        <a
                          className={selectedTab["li_0"].nav}
                          name="li_0"
                          data-toggle="tab"
                        >
                          Información
                        </a>
                      </li>
                      <li onClick={changeSelect} className="nav-item">
                        <a
                          className={selectedTab["li_1"].nav}
                          name="li_1"
                          data-toggle="tab"
                        >
                          Perfil
                        </a>
                      </li>
                      {/* <li onClick={changeSelect} className="nav-item">
                        <a
                          className={selectedTab["li_2"]["nav"]}
                          name="li_2"
                          data-toggle="tab"
                        >
                          Estrategia Terapeutica
                        </a>
                      </li>
                      <li onClick={changeSelect} className="nav-item">
                        <a
                          className={selectedTab["li_3"]["nav"]}
                          name="li_3"
                          data-toggle="tab"
                        >
                          Experiencias
                        </a>
                      </li> */}
                      <li onClick={changeSelect} className="nav-item">
                        <a
                          className={selectedTab["li_4"]["nav"]}
                          name="li_4"
                          data-toggle="tab"
                        >
                          Redes
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className={selectedTab["li_0"]["tab"]} id="timeline">
                        <div className="post clearfix">
                          <div className="user-block">
                            {/* <span className="username"> */}
                            <strong>

                              <a >Estrategia Terapeutica</a>
                            </strong>
                            {/* <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a> */}
                            {/* </span> */}

                          </div>

                          {!show ? (
                            <textarea
                              className="form-control"
                              id="inputEstrategia"
                              placeholder="Estrategia"
                              value=" Lorem ipsum represents a long-held tradition htmlFor designers,
                            typographers and the like. Some people hate it and argue htmlFor
                            its demise, but others ignore the hate as they create awesome
                            tools to help create filler text htmlFor everyone from bacon lovers
                            to Charlie Sheen fans."/>

                          ) : (
                            <p>
                              Lorem ipsum represents a long-held tradition htmlFor designers,
                              typographers and the like. Some people hate it and argue htmlFor
                              its demise, but others ignore the hate as they create awesome
                              tools to help create filler text htmlFor everyone from bacon lovers
                              to Charlie Sheen fans.
                            </p>
                          )}



                        </div>


                        <div className="post">
                          <div className="user-block">
                            {/* <span className="username"> */}
                            <strong>

                              <a >Experiencias</a>
                            </strong>
                            {/* <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a> */}
                            {/* </span> */}

                          </div>

                          <div className="row mb-3">
                            <div className="col-sm-6">
                              <img className="img-fluid" src={Imager} alt="Photo" />
                            </div>

                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-6">
                                  <img className="img-fluid mb-3" src={Imager1} alt="Photo" />
                                  <img className="img-fluid mb-3" src={Imager2} alt="Photo" />
                                </div>

                                <div className="col-sm-6">
                                  <img className="img-fluid mb-3" src={Imager3} alt="Photo" />
                                  <img className="img-fluid mb-3" src={Imager4} alt="Photo" />
                                </div>

                              </div>

                            </div>

                          </div>

                          {!show ? (
                            <textarea
                              className="form-control"
                              id="inputEstrategia"
                              placeholder="Estrategia"
                              value=" Lorem ipsum represents a long-held tradition htmlFor designers,
                            typographers and the like. Some people hate it and argue htmlFor
                            its demise, but others ignore the hate as they create awesome
                            tools to help create filler text htmlFor everyone from bacon lovers
                            to Charlie Sheen fans."/>

                          ) : (
                            <p>
                              Lorem ipsum represents a long-held tradition htmlFor designers,
                              typographers and the like. Some people hate it and argue htmlFor
                              its demise, but others ignore the hate as they create awesome
                              tools to help create filler text htmlFor everyone from bacon lovers
                              to Charlie Sheen fans.
                            </p>
                          )}


                        </div>
                        <div className="form-group row">
                          <div >
                            <button
                              type="submit"
                              onClick={Editar}
                              className="btn btn-danger"
                            >
                              {!show ? "Guardar" : "Editar"}
                            </button>

                          </div>
                        </div>
                      </div>
                      <div className={selectedTab["li_1"]["tab"]} id="activity">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              for="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <div>
                                {!show ? (
                                  <input
                                    onChange={handleChange}
                                    type="email"
                                    className="form-control"
                                    name="name"
                                    placeholder="Nombre"
                                    value={store.userData.name}
                                  />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {store.userData.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              for="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Apellido
                            </label>
                            <div className="col-sm-10">
                              <div>
                                {!show ? (
                                  <input
                                    onChange={handleChange}
                                    type="email"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Apellido"
                                    value={store.userData.last_name || ""}
                                  />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {store.userData.last_name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              for="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Fecha de nacimiento
                            </label>

                            <div className="col-sm-10">
                              <div>
                                {!show ? (
                                  <input type="text" class="form-control" placeholder="mm/dd/yyyy" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {store.userData.birht_date}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              for="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Correo
                            </label>
                            <div className="col-sm-10">
                              <div>
                                {!show ? (
                                  <input
                                    onChange={handleChange}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Correo"
                                    value={store.userData.email || ""}
                                  />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {store.userData.email}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              for="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Sexo
                            </label>
                            <div className="col-sm-10">
                              <div>
                                {!show ? (
                                  <select class="custom-select form-control-border" id="exampleSelectBorder">
                                    <option>M</option>
                                    <option>F</option>
                                    <option>Otro</option>
                                  </select>
                                ) : (
                                  <p className="text-muted mb-0">
                                    {store.userData.sex}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* {store.userData.is_psicologo ? (
                                            <div className="form-group row">
                                                <label for="inputName" className="col-sm-2 col-form-label">
                                                    Area de Especialidad
                                                </label>
                                                <div className="col-sm-10">
                                                    <div>
                                                        {!show ? (
                                                        <input onChange={handleChange} type="email"
                                                            className="form-control" name="email" placeholder="Correo"
                                                            value={ store.userData.area_de_especialidad } />
                                                        ) : (
                                                        <p className="text-muted mb-0">
                                                            {store.userData.area_de_especialidad}
                                                        </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            ) : (
                                            ""
                                            )} */}
                          {store.userData.is_psicologo ? (
                            <div className="form-group row">
                              <label
                                for="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Monto de consulta
                              </label>
                              <div className="col-sm-10">
                                <div>
                                  {!show ? (
                                    <input
                                      onChange={handleChange}
                                      type="email"
                                      className="form-control"
                                      name="monto"
                                      placeholder="Monto"
                                      value={store.userData.monto || ""}
                                    />
                                  ) : (
                                    <p className="text-muted mb-0">
                                      {store.userData.monto}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {store.userData.is_psicologo ? (
                            <div className="form-group row">
                              <label
                                for="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Numero Telefonico
                              </label>
                              <div className="col-sm-10">
                                <div>
                                  {!show ? (
                                    <input
                                      onChange={handleChange}
                                      type="number"
                                      className="form-control"
                                      name="phone_number"
                                      placeholder="numero telefonico"
                                      value={store.userData.phone_number || ""}
                                    />
                                  ) : (
                                    <p className="text-muted mb-0">
                                      {store.userData.phone_number}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {store.userData.is_psicologo ? (
                            <div className="form-group row">
                              <label
                                for="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Numero FPV
                              </label>
                              <div className="col-sm-10">
                                <div>
                                  {!show ? (
                                    <input
                                      onChange={handleChange}
                                      type="email"
                                      className="form-control"
                                      name="fpv_number"
                                      placeholder="fpv"
                                      value={store.userData.fpv_number || ""}
                                    />
                                  ) : (
                                    <p className="text-muted mb-0">
                                      {store.userData.fpv_number}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="form-group row">
                            <label
                              for="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Estado
                            </label>
                            <div className="col-sm-10">
                              <div>
                                {!show ? (
                                  <input
                                    onChange={handleChange}
                                    type="email"
                                    className="form-control"
                                    name="state"
                                    placeholder="Nombre"
                                    value={store.userData.state || ""}
                                  />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {store.userData.state}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              for="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Ciudad
                            </label>
                            <div className="col-sm-10">
                              <div>
                                {!show ? (
                                  <input
                                    onChange={handleChange}
                                    type="email"
                                    className="form-control"
                                    name="city"
                                    placeholder="Ciudad"
                                    value={store.userData.city || ""}
                                  />
                                ) : (
                                  <p className="text-muted mb-0">
                                    {store.userData.city}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* <div className="form-group">
                            <label>Ares de Especialidad</label>
                            <select className="form-control select2">
                              <option>option 1</option>
                              <option>option 2</option>
                              <option>option 3</option>
                              <option>option 4</option>
                              <option>option 5</option>
                            </select>
                          </div> */}


                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button
                                type="submit"
                                onClick={Editar}
                                className="btn btn-danger"
                              >
                                {!show ? "Guardar" : "Editar"}
                              </button>
                              {/* <button
                                type="submit"
                                onClick={() => { guardar() }}
                                className="btn btn-danger"
                              >
                                hola
                              </button> */}
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className={selectedTab["li_2"]["tab"]} id="timeline">
                        <div className="tab-pane" id="settings">
                          <form className="form-horizontal">
                            <div className="form-group row">
                              <div className="form-group row">
                                <label
                                  for="inputExperience"
                                  className="col-sm-2 col-form-label"
                                >
                                  Estrategia
                                </label>
                                <div className="col-sm-10">
                                  <textarea
                                    className="form-control"
                                    id="inputEstrategia"
                                    placeholder="Estrategia"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className={selectedTab["li_3"]["tab"]} id="timeline">
                        <div className="tab-pane" id="settings">
                          <form className="form-horizontal">
                            <div className="form-group row">
                              <div className="form-group row">
                                <label
                                  for="inputExperience"
                                  className="col-sm-2 col-form-label"
                                >
                                  Experiencias
                                </label>
                                <div className="col-sm-10">
                                  <textarea
                                    className="form-control"
                                    id="inputExperience"
                                    placeholder="Experiencia"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>

                      </div>
                      <div className={selectedTab["li_4"]["tab"]} id="timeline">
                        <div className="tab-pane" id="settings">
                          <form className="form-horizontal">
                            <div className="form-group row">
                              <label
                                for="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Educacion
                              </label>
                              <div className="col-sm-10">
                                <div>
                                  {!show ? (
                                    <input
                                      onChange={handleChange}
                                      type="email"
                                      className="form-control"
                                      name="name"
                                      placeholder="Nombre"
                                      value={store.userData.education}
                                    />
                                  ) : (
                                    <p className="text-muted mb-0">
                                      {store.userData.name}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                for="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Instagram
                              </label>
                              <div className="col-sm-10">
                                <div>
                                  {!show ? (
                                    <input
                                      onChange={handleChange}
                                      type="email"
                                      className="form-control"
                                      name="instagram"
                                      placeholder="Instagram"
                                      value={store.userData.instagram || ""}
                                    />
                                  ) : (
                                    <p className="text-muted mb-0">
                                      {store.userData.instagram}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="form-group row">
                              <label
                                for="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Facebook
                              </label>
                              <div className="col-sm-10">
                                <div>
                                  {!show ? (
                                    <input
                                      onChange={handleChange}
                                      type="email"
                                      className="form-control"
                                      name="facebook"
                                      placeholder="Facebook"
                                      value={store.userData.facebook || ""}
                                    />
                                  ) : (
                                    <p className="text-muted mb-0">
                                      {store.userData.facebook}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                for="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Twitter
                              </label>
                              <div className="col-sm-10">
                                <div>
                                  {!show ? (
                                    <input
                                      onChange={handleChange}
                                      type="email"
                                      className="form-control"
                                      name="twitter"
                                      placeholder="Twitter"
                                      value={store.userData.twitter || ""}
                                    />
                                  ) : (
                                    <p className="text-muted mb-0">
                                      {store.userData.twitter}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>


                            {/* {store.userData.is_psicologo ? (
                                            <div className="form-group row">
                                                <label for="inputName" className="col-sm-2 col-form-label">
                                                    Area de Especialidad
                                                </label>
                                                <div className="col-sm-10">
                                                    <div>
                                                        {!show ? (
                                                        <input onChange={handleChange} type="email"
                                                            className="form-control" name="email" placeholder="Correo"
                                                            value={ store.userData.area_de_especialidad } />
                                                        ) : (
                                                        <p className="text-muted mb-0">
                                                            {store.userData.area_de_especialidad}
                                                        </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            ) : (
                                            ""
                                            )} */}






                            <div className="form-group row">
                              <div className="offset-sm-2 col-sm-10">
                                <button
                                  type="submit"
                                  onClick={Editar}
                                  className="btn btn-danger"
                                >
                                  {!show ? "Guardar" : "Editar"}
                                </button>
                                {/* <button
                                  type="submit"
                                  onClick={() => { guardar() }}
                                  className="btn btn-danger"
                                >
                                  hola
                                </button> */}
                              </div>
                            </div>
                          </form>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


