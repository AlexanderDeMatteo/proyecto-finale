import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar_today.css"
import { Context } from "../store/appContext.js";
import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";
import Calendar from 'react-calendar';
export const CalendarToday_custom = () => {
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


    return (
        <>

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Citas de Hoy</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="row">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-7">

                                {transition((style, item) =>
                                    item ? <animated.div style={style} className="row row_custom" >
                                        <div className="col-md-3 col-sm-6 col-12">

                                            <div className="info-box bg-primary box_info">
                                                <span className="info-box-icon"><i className="far fa-bookmark"></i></span>
                                                <div className="info-box-content">

                                                    <div className="card-tools button-agend">
                                                        {/* <span className="info-box-text">Cita</span>
                                            <a href="#" className="btn btn-tool btn-link button-agend  button-info">Agendar Cita</a> */}

                                                        <div className="card-header header_custom">
                                                            <h3 className="card-title title_custom">Cita</h3>
                                                            <div className="card-tools">
                                                                <a className="btn btn-tool btn-link button-agend" data-card-widget="collapse">Mas Informacion
                                                                </a>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <span className="info-box-number">{item.text}</span>
                                                    {/* <div className="progress">
                                            <div className="progress-bar" ></div>
                                        </div> */}
                                                    <span className="progress-description">
                                                        70% Increase in 30 Days
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </animated.div> : '')}

                            </div>

                            <div class="col-md-5 custom_card">
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">Cita</h3>
                                        <div class="card-tools">
                                            <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                                            </button>
                                        </div>

                                    </div>

                                    <div class="card-body">
                                        Texto
                                    </div>

                                </div>

                            </div>
                        </div></div>
                </div>


            </div>
        </>
    )
}
