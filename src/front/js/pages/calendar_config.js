import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar_config.css"
import { Context } from "../store/appContext.js";

import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";

export const CalendarCogif_custom = () => {
    const { actions, store } = useContext(Context)
    const [dateList, setdateList] = useState([]);
    const [showcreate, setShowCreate] = useState(false);
    const [data, setData] = useState(JSON.stringify(store))
    const [DatesCreate, setDatesCreate] = useState({ "horaincio": 0, "horafina": 0 });


    const transition = useTransition(dateList, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
    });
    const transition_2 = useTransition(showcreate, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
        leave: { x: 0, y: 50, opacity: 0 },
    });

    useEffect(() => {
        actions.getSchedule()
        // setdateList([{ text: '9am - 10am' }, { text: '1pm-2pm' },]);
        // setdateList(store.userTime);



    }, [store])

    function onChangeCalendar(event) {
        event.preventDefault();
        console.log(dateList)
        actions.createSchedule()
        // setdateList([]);
        if (DatesCreate.horaincio && DatesCreate.horafina) {
            setdateList((prevDate) => ([...prevDate, { text: DatesCreate.horaincio + "am - " + DatesCreate.horafina + "pm " }]));
        }
        setDatesCreate({ "horaincio": 0, "horafina": 0 })
    }
    function testbutton(event) {
        event.preventDefault();
        actions.getSchedule()
        console.log(store.userTime)
        setdateList(store.userTime)
        setShowCreate(!showcreate)
        // console.log(dateList)
        // console.log(store.userTime)
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
                <div className="row">

                    <div className="col-md-12">
                        <form>
                            <div className="card-body">
                                {/* <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Trabaja en Fin de Semana</label>
                                </div> */}
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Horarios</label>
                                    {/* <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" /> */}
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                                        <div className="row">
                                            {transition((style, item) =>
                                                item ? <animated.div style={style} className="col-12 col-sm-4" ><div className="info-box bg-light">
                                                    <div className="info-box-content">
                                                        {/* <span className="info-bozx-text text-center text-muted">Total amount spent</span> */}
                                                        <span className="info-box-number text-center text-muted mb-0">{item.start_time + ' - ' + item.end_time}</span>
                                                    </div>
                                                </div> </animated.div> : '')}




                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={testbutton}>Agregar nuevo horario</button>
                                        <br /><br />

                                        {transition_2((style, item) =>
                                            item ? <animated.div style={style} className="form-group">
                                                {/* <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" /> */}
                                                {/* <div className="card-body"> */}
                                                {/* <label htmlFor="exampleInputEmail1">Horarios</label> */}
                                                <div className="row">
                                                    <div className="col-3">
                                                        De: <input onChange={handleChange} name='horaincio' type="text" value={DatesCreate.horaincio} className="form-control" placeholder="Hora de Inicio" />
                                                    </div>
                                                    <div className="col-4">
                                                        Hasta:<input onChange={handleChange} name='horafina' type="text" value={DatesCreate.horafina} className="form-control" placeholder="Hora de Fin" />
                                                    </div>
                                                    <div className="col-5">
                                                        <button className="btn btn-primary button_create_date" onClick={onChangeCalendar}>Crear Horario</button>
                                                    </div>

                                                </div>
                                                {/* </div> */}
                                            </animated.div> : <div className="form-group" />)}



                                        {/* {showcreate ? : <></>} */}

                                    </div>

                                </div>


                                {/* <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>a */}




                                {/* <div className="card-footer">

                                </div> */}
                            </div>








                        </form>
                    </div>
                </div>



            </div>
        </>
    )
}
