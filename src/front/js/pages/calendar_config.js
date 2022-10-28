import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar_config.css"
import { Context } from "../store/appContext.js";

import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";

export const CalendarCogif_custom = () => {
    const { actions, store } = useContext(Context)
    // const [dateList, setdateList] = useState([]);
    const [dateList, setdateList] = useState([]);
    const [DatesCreate, setDatesCreate] = useState({ "horaincio": 0, "horafina": 0 });

    const transition = useTransition(dateList, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },

    });

    useEffect(() => {
        setdateList([{ text: '9am - 10am' }, { text: '1pm-2pm' },]);
        // console.log(store)
        // let pp = store.userData
        // console.log(pp)
        // actions.get_user_dates(1)
        // console.log(store)

    }, [])

    function onChangeCalendar(event) {
        event.preventDefault();
        console.log(dateList)
        // setdateList([]);
        if (DatesCreate.horaincio && DatesCreate.horafina) {
            setdateList((prevDate) => ([...prevDate, { text: DatesCreate.horaincio + "am - " + DatesCreate.horafina + "pm " }]));
        }
        setDatesCreate({ "horaincio": 0, "horafina": 0 })
    }

    function handleChange(event) {
        console.log(event)
        const { name, value, type, checked } = event.target
        setDatesCreate(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }



    return (
        <>

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Configuracion de Calendario</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="row">

                    <div class="col-md-12">
                        <form>
                            <div class="card-body">
                                {/* <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Trabaja en Fin de Semana</label>
                                </div> */}
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Horarios</label>
                                    {/* <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" /> */}
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                                        <div class="row">

                                            {transition((style, item) =>
                                                item ? <animated.div style={style} className="col-12 col-sm-4" ><div class="info-box bg-light">
                                                    <div class="info-box-content">
                                                        {/* <span class="info-bozx-text text-center text-muted">Total amount spent</span> */}
                                                        <span class="info-box-number text-center text-muted mb-0">{item.text}</span>
                                                    </div>
                                                </div> </animated.div> : '')}




                                        </div>
                                        <button type="submit" class="btn btn-primary">Agregar nuevo horario</button>
                                        <br /><br />
                                        <div class="form-group">
                                            {/* <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" /> */}
                                            {/* <div class="card-body"> */}
                                            {/* <label for="exampleInputEmail1">Horarios</label> */}
                                            <div class="row">
                                                <div class="col-3">
                                                    De: <input onChange={handleChange} name='horaincio' type="text" value={DatesCreate.horaincio} class="form-control" placeholder="Hora de Inicio" />
                                                </div>
                                                <div class="col-4">
                                                    Hasta:<input onChange={handleChange} name='horafina' type="text" value={DatesCreate.horafina} class="form-control" placeholder="Hora de Fin" />
                                                </div>
                                                <div class="col-5">
                                                    <button class="btn btn-primary button_create_date" onClick={onChangeCalendar}>Crear Horario</button>
                                                </div>

                                            </div>
                                            {/* </div> */}
                                        </div>

                                    </div>

                                </div>


                                {/* <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>a */}




                                {/* <div class="card-footer">

                                </div> */}
                            </div>








                        </form>
                    </div>
                </div>



            </div>
        </>
    )
}
