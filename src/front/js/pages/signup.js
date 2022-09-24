import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [numero_fpv, setNumero_fpv] = useState("");
	const [repeat, setRepeat] = useState("");
	const [check, setCheck] = useState(false);
	const [check_fpv, setCheckfpv] = useState(false);
	const [errors, setErrors] = useState({
		email: false,
		password: false,
		repeat: false,
	});

	const [showPassword, setShowPassword] = useState(false);

	const history = useHistory();

	const handleSubmit = async () => {
		let data = {};

		if (check_fpv) {

			data.name = name,
				data.email = email,
				data.password = password,
				data.fpv_number = numero_fpv,
				data.is_psicologo = check_fpv
		} else {
			data.name = name,
				data.email = email,
				data.password = password,
				data.fpv_number = null,
				data.is_psicologo = check_fpv
		}

		// let data = {
		// 	name: name,
		// 	email: email,
		// 	password: password,
		// 	numero_fpv: numero_fpv,
		// };
		if (await actions.registerUser(data)) {
			history.push("/Perfil");
		} else {
			alert("EL USUARIO YA ESTA CREADO INTENTE DE NUEVO");
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
											Sign up
										</p>

										<form className="mx-1 mx-md-4">
											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-user fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<label
														className="form-label"
														htmlFor="form3Example1c"
													>
														Your Name
													</label>
													<input
														type="text"
														id="form3Example1c"
														className="form-control"
														onChange={(e) => setName(e.target.value)}
													/>
												</div>
											</div>

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
															Correo invalido perro de awa
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
													<div className="d-flex col-12">
														<input
															type={showPassword ? "text" : "password"}
															id="form3Example4c"
															className="form-control"
															onBlur={(e) => {
																let regex =
																	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
																if (regex.test(password)) {
																	setErrors({ ...errors, password: false });
																} else {
																	setErrors({ ...errors, password: true });
																}
															}}
															onChange={(e) => setPassword(e.target.value)} />
														<i className="fa fa-eye password-icon iconpass2"
															onClick={(e) => {
																e.preventDefault();
																setShowPassword(!showPassword);
															}}
														/>



													</div>
													{/* <i
														className={
															showPassword
																? "fa fa-eye password-icon iconpass2"
																: ""
														}
														onClick={(e) => {
															e.preventDefault();
															setShowPassword(!showPassword);
														}}

													></i> */}

													{errors.password && (
														<div className="text-warning">
															recuerda que debe tener al menos 8 caracteres 1
															letra minuscula 1 letra mayuscula 1 numero y un
															caracter especial perro
														</div>
													)}
												</div>
											</div>

											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-key fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<label
														className="form-label"
														htmlFor="form3Example4cd"
													>
														Repeat your password
													</label>
													<input
														type="password"
														id="form3Example4cd"
														className="form-control"
														onBlur={(e) => {
															if (repeat !== password) {
																setErrors({ ...errors, repeat: true });
															} else {
																setErrors({ ...errors, repeat: false });
															}
														}}
														onChange={(e) => setRepeat(e.target.value)} />
													<i className="fa fa-eye password-icon iconpass2" id="ojitos"
														onClick={(e) => {
															e.preventDefault();
															setShowPassword(!showPassword);
														}}
													/>

													{errors.repeat && (
														<div className="text-warning">
															contraseña diferente perro de awa
														</div>
													)}
												</div>
											</div>

											{
												check_fpv ? <div className="d-flex flex-row align-items-center mb-4">
													<i className="fas fa-key fa-lg me-3 fa-fw"></i>
													<div className="form-outline flex-fill mb-0">
														<label
															className="form-label"
															htmlFor="form3Example4cd"
														>
															Codigo FPV
														</label>
														<input
															type="code"
															id="form5Example5cd"
															className="form-control"
															onChange={(e) => setNumero_fpv(e.target.value)}
														/>

													</div>
												</div> : <i></i>
											}



											<div className="form-check d-flex justify-content-center mb-5">
												<input
													className="form-check-input me-2"
													type="checkbox"
													value={check_fpv}
													id="form2Example3c"
													onChange={(e) => setCheckfpv(!check_fpv)}
												/>
												<label
													className="form-check-label"
													htmlFor="form2Example3"
												>
													Eres Psicologo?
													<a href="#!"></a>
												</label>

											</div>


											<div className="form-check d-flex justify-content-center mb-5">
												<input
													className="form-check-input me-2"
													type="checkbox"
													value={check}
													id="form2Example3c"
													onChange={(e) => setCheck(!check)}
												/>
												<label
													className="form-check-label"
													htmlFor="form2Example3"
												>
													I agree all statements in{" "}
													<a href="#!">Terms of service</a>
												</label>

											</div>



											<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
												<button
													type="button"
													className="btn btn-primary btn-lg"
													onClick={handleSubmit}
													disabled={
														errors.email ||
														errors.password ||
														errors.repeat ||
														!check ||
														!name.length > 0 ||
														!email.length > 0 ||
														!password.length > 0 ||
														!repeat.length > 0
													}
												>
													Register
												</button>
											</div>
											<Link className="m-auto" to={"/login"}>
												Si ya tienes cuenta, inicia sesion
											</Link>
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
			</div >
			{
				localStorage.getItem("token") != undefined && (
					<Redirect to={"/login"}></Redirect>
				)
			}
		</section >
	);
};
