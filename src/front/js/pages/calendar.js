import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar.css"
import { Context } from "../store/appContext.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Calendar_custom = () => {
    const { actions, store } = useContext(Context)
    const [selectedDate, setSelectedDate] = useState(new Date().toString().split(" "));

    useEffect(() => {
        // actions.privateData()
        // actions.handle_user_psicologo();
    }, [])

    function onChangeCalendar(event) {
        console.log(event.toString().split(" "))
        console.log("aaaa")
        setSelectedDate(event.toString().split(" "))

    }
    const months = {
        'Oct': 'Oct'
    }
    const Days = {
        'Mon': 'Lunes',
        'Tue': 'Martes',
        'Wed': 'Miercoles',
        'Thu': 'Lunes',
        'Fri': 'Lunes',
        'Sat': 'Lunes',
        'Sun': 'Lunes',
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
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="sticky-top mb-3">
                                {/* <div class="card"> */}
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">{months[selectedDate[1]] + ',' + Days[selectedDate[0]] + ',' + selectedDate[2]}</h3>
                                    </div>


                                    <form class="form-horizontal">
                                        <div class="card-body">
                                            <div id="external-events">
                                                {/* <div class="external-event bg-success">Lunch</div>
                                                <div class="external-event bg-warning">Go home</div>
                                                <div class="external-event bg-info">Do homework</div> */}
                                                <div class="external-event bg-primary">Work on UI design</div>
                                                {/* <div class="external-event bg-danger">Sleep tight</div> */}


                                            </div>
                                            {/* <div class="form-group row">
                                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                                    <div class="col-sm-10">
                                                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                                                    <div class="col-sm-10">
                                                        <input type="password" class="form-control" id="inputPassword3" placeholder="Password" />
                                                    </div>
                                                </div> */}
                                            {/* <div class="form-group row">
                                                    <div class="offset-sm-2 col-sm-10">
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                                                            <label class="form-check-label" for="exampleCheck2">Remember me</label>
                                                        </div>
                                                    </div>
                                                </div> */}
                                        </div>

                                        <div class="card-footer">
                                            <button type="submit" class="btn btn-primary">Crear Cita</button>
                                            {/* <button type="submit" class="btn btn-default float-right">Cancel</button> */}
                                        </div>

                                    </form>
                                </div>


                                {/* </div> */}
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="card card-primary">
                                <div class="card-body p-0">

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
