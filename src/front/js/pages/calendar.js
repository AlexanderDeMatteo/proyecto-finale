import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar.css"
import { Context } from "../store/appContext.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";

export const Calendar_custom = () => {
    const { actions, store } = useContext(Context)
    const [selectedDate, setSelectedDate] = useState(new Date().toString().split(" "));
    const [items, setItems] = useState([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);

    const transition = useTransition(items, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },

    });

    useEffect(() => {
        console.log(store)
        let pp = store.userData
        console.log(pp)
        actions.get_user_dates(1)
        console.log(store)

    }, [])

    function onChangeCalendar(event) {
        setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setSelectedDate(event.toString().split(" "))

    }
    const months = {
        'Oct': 'Oct',
        'Dec': 'Dic',
        'Jan': 'Ene',
        'Feb': 'Feb',
        'Mar': 'Mar',
        'Apr': 'Abr',
        'May': 'May',
        'Jun': 'Jun',
        'Jul': 'Jul',
        'Nov': 'Nov',
        'Aug': 'Agos',
        'Sep': 'Sep'

    }
    const Days = {
        'Mon': 'Lunes',
        'Tue': 'Martes',
        'Wed': 'Miercoles',
        'Thu': 'Jueves',
        'Fri': 'Viernes',
        'Sat': 'Sabado',
        'Sun': 'Domingo',
    }

    return (
        <>

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Calendario</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sticky-top mb-3">
                                {/* <div className="card"> */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">{months[selectedDate[1]] + ',' + Days[selectedDate[0]] + ',' + selectedDate[2]}</h3>
                                    </div>


                                    <form className="form-horizontal">
                                        <div className="card-body">
                                            <div id="external-events">
                                                {/* <div className="external-event bg-success">Lunch</div>
                                                <div className="external-event bg-warning">Go home</div>
                                                <div className="external-event bg-info">Do homework</div> */}
                                                {transition((style, item) =>
                                                    item ? <animated.div style={style} className="card card-primary card-outline" ><div className="card-header">
                                                        <h3 className="card-title letter_small">{item.text}</h3>
                                                        <div className="card-tools button-agend">
                                                            <a href="#" className="btn btn-tool btn-link button-agend">Agendar Cita</a>
                                                        </div>
                                                    </div> </animated.div> : '')}
                                                {/* <div className="external-event bg-primary">Work on UI design</div> */}
                                                {/* <div className="external-event bg-danger">Sleep tight</div> */}


                                            </div>
                                            {/* <div className="form-group row">
                                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                                    <div className="col-sm-10">
                                                        <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                                    <div className="col-sm-10">
                                                        <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                                    </div>
                                                </div> */}
                                            {/* <div className="form-group row">
                                                    <div className="offset-sm-2 col-sm-10">
                                                        <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                                                            <label className="form-check-label" for="exampleCheck2">Remember me</label>
                                                        </div>
                                                    </div>
                                                </div> */}
                                        </div>
                                        {/* 
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Crear Cita</button>
                                           
                                        </div> */}

                                    </form>
                                </div>


                                {/* </div> */}
                            </div>
                        </div>
                        <div className="col-md-9 fondo_tran">
                            <div className="card card-primary fondo_tran">
                                <div className="card-body p-0 fondo_tran">

                                    <Calendar onChange={onChangeCalendar} className="custom_calendar_css" />
                                </div>


                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
