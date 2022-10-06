import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar.css"
import { Context } from "../store/appContext.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Calendar_custom = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        // actions.privateData()
        // actions.handle_user_psicologo();
    }, [])

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
                <Calendar className="custom_calendar_css" />
            </div>
        </>
    )
}
