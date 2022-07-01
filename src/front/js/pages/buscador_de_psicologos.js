import React, { useState, useContext, useEffect } from "react";
import "../../styles/buscador_de_psicologos.css"
import { Context } from "../store/appContext";

export const Buscador_de_psicologos = () => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        // actions.privateData()
        actions.handle_user_psicologo();
        console.log("Aaaaaaaaaaaaaaaaaaaa")
    }, [])
    return (

        <>
            <div className="boxPrincipal">
                <p>"hola</p>

                <div className="boxBuscador">
                    <div className="container py-5 h-100">
                        <div className="row d-flex align-items-center h-100">
                            <div className="col col-md-9 col-lg-7 col-xl-5">
                                <div className="card">
                                    {/* style="border-radius: 15px; background-color: #93e2bb;" */}
                                    <div className="card-body p-4 text-black">
                                        <div>
                                            <h6 className="mb-4">Exquisite hand henna tattoo</h6>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <p className="small mb-0"><i className="far fa-clock me-2"></i>3 hrs</p>
                                                <p className="fw-bold mb-0">$90</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="flex-shrink-0">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                                                    alt="Generic placeholder image" className="img-fluid rounded-circle border border-dark border-3"
                                                />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <p className="mb-0 me-2">@sheisme</p>
                                                    <ul className="mb-0 list-unstyled d-flex flex-row">
                                                        <li>
                                                            <i className="fas fa-star fa-xs"></i>
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star fa-xs"></i>
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star fa-xs"></i>
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star fa-xs"></i>
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star fa-xs"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <button type="button" className="btn btn-outline-dark btn-rounded btn-sm"
                                                        data-mdb-ripple-color="dark">+ Follow</button>
                                                    <button type="button" className="btn btn-outline-dark btn-rounded btn-sm"
                                                        data-mdb-ripple-color="dark">See profile</button>
                                                    <button type="button" className="btn btn-outline-dark btn-floating btn-sm"
                                                        data-mdb-ripple-color="dark"><i className="fas fa-comment"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className="my-4 pb-1">52 comments</p>
                                        <button type="button" className="btn btn-success btn-rounded btn-block btn-lg"><i
                                            className="far fa-clock me-2"></i>Book now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- end row --> */}
                    {/* <!-- end row --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="text-right">
                                <ul className="pagination pagination-split mt-0 float-right">
                                    <li className="page-item"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span> <span className="sr-only">Previous</span></a></li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                                    <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span> <span className="sr-only">Next</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </div>
            </div>






        </>








    )
}
