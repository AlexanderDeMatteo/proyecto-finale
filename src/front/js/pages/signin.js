import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";


export const SignIn = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const history = useHistory();

    const handlelogin = async () => {
        let data = {
            email: email,
            password: password,
        };
        if (await actions.loginUser(data)) {
            history.push("/paginaPrincipal");
        } else {
            alert("Credenciales Invalidas");
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            Sign In
                                        </p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example3c"
                                                    >
                                                        Your Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="form3Example3c"
                                                        className="form-control"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        onBlur={(e) => {
                                                            let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

                                                            if (regex.test(email)) {
                                                                setErrors({ ...errors, email: false });
                                                            } else {
                                                                setErrors({ ...errors, email: true });
                                                            }
                                                        }}
                                                    />
                                                    {errors.email && (
                                                        <div className="text-warning">
                                                            Correo invalido
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example4c"
                                                    >
                                                        Password
                                                    </label>
                                                    <div className="d-flex">
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            onBlur={(e) => {
                                                                let regex =
                                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                                                                if (regex.test(password)) {
                                                                    setErrors({ ...errors, password: false });
                                                                } else {
                                                                    setErrors({ ...errors, password: true });
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            className={
                                                                showPassword
                                                                    ? "fa fa-eye-slash"
                                                                    : "fa fa-eye password-icon"
                                                            }
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setShowPassword(!showPassword);
                                                            }}
                                                        ></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onClick={handlelogin}
                                                    disabled={
                                                        errors.email ||
                                                        errors.password ||
                                                        !email.length > 0 ||
                                                        !password.length > 0
                                                    }
                                                >
                                                    Login
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img id="imagen"
                                            src="https://img.freepik.com/vector-gratis/ilustracion-concepto-psicologo_114360-2179.jpg?size=338&ext=jpg&ga=GA1.2.1846917735.1655248269"
                                            className="img-fluid"
                                            alt="Sample image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {localStorage.getItem("token") != undefined && (
                <Redirect to={"/paginaPrincipal"}></Redirect>
            )}
        </section>
    );
};
