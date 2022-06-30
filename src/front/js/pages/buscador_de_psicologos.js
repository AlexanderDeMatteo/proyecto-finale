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
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                    <div class="content">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-4"><a href="#custom-modal" class="btn btn-custom waves-effect waves-light mb-4" data-animation="fadein" data-plugin="custommodal" data-overlayspeed="200" data-overlaycolor="#36404a"><i class="mdi mdi-plus"></i> Add Member</a></div>
                                {/* <!-- end col --> */}
                            </div>
                            {/* <!-- end row --> */}
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="text-center card-box">
                                        <div class="member-card pt-2 pb-2">
                                            <div class="thumb-lg member-thumb mx-auto"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" class="rounded-circle img-thumbnail" alt="profile-image" /></div>
                                            <div class="">
                                                <h4>Freddie J. Plourde</h4>
                                                <p class="text-muted">@Founder <span>| </span><span><a href="#" class="text-pink">websitename.com</a></span></p>
                                            </div>
                                            <ul class="social-links list-inline">
                                                <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook"></i></a></li>
                                                <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>
                                                <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-skype"></i></a></li>
                                            </ul>
                                            <button type="button" class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">Message Now</button>
                                            <div class="mt-4">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="mt-3">
                                                            <h4>2563</h4>
                                                            <p class="mb-0 text-muted">Wallets Balance</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mt-3">
                                                            <h4>6952</h4>
                                                            <p class="mb-0 text-muted">Income amounts</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="mt-3">
                                                            <h4>1125</h4>
                                                            <p class="mb-0 text-muted">Total Transactions</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- end row --> */}
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-right">
                                        <ul class="pagination pagination-split mt-0 float-right">
                                            <li class="page-item"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span> <span class="sr-only">Previous</span></a></li>
                                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                                            <li class="page-item"><a class="page-link" href="#">5</a></li>
                                            <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span> <span class="sr-only">Next</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- end row --> */}
                        </div>
                        {/* <!-- container --> */}
                    </div>


                </div>


            </div>





        </>








    )
}
