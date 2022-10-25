import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar_config.css"
import { Context } from "../store/appContext.js";

import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";

export const CalendarCogif_custom = () => {
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
                                <h1>Configuracion de Calendario</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="row">

                    <div class="col-md-6">





                        <form>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputFile">File input</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="exampleInputFile" />
                                            <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                </div>
                            </div>

                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>



            </div>
        </>
    )
}
