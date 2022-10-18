import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div >
				<div id="carrusel">

					<div id="enunciado">
						<h1>Bienvenidos a RedesConscientes</h1>
						{/* <h2>VIVE LA NATURALEZA TRANSFORMADORA DEL PODER HUMANO</h2> */}
						<h2>Vive la naturaleza transformadora del poder humano</h2>
						<p>Crece, desarróllate y muévete hacia delante junto a los mejores psicologos de Venezuela, en línea.</p>
						<a id="boton" className="btn btn-primary" href="/signup" role="button" >Empieza Ahora</a>
					</div>

					<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">

						<div className="carousel-inner">
							<div className="carousel-item active">
								{/* <img src="https://img.freepik.com/vector-gratis/salud-mental-entendiendo-vector-cerebral_53876-79084.jpg?size=338&ext=jpg&ga=GA1.2.1846917735.1655248269" className="d-block w-50px h-70px" alt="..." /> */}
								<img src="https://img.freepik.com/foto-gratis/psicologo-sexo-femenino-amistoso-que-coloca-su-oficina-tablero-lapiz_23-2148026256.jpg?size=626&ext=jpg&ga=GA1.2.1846917735.1655248269" className="d-block w-50px h-70px" alt="..." />
								<div className="carousel-caption d-none d-md-block">
									<h5></h5>
									<p></p>
								</div>
							</div>
							<div className="carousel-item">
								<img src="https://img.freepik.com/foto-gratis/terapeuta-mujer-tiro-medio-portapapeles-invitando-al-paciente-gabinete_23-2148759114.jpg?size=626&ext=jpg&ga=GA1.2.1846917735.1655248269" className="d-block w-50px h-70px" alt="..." />
								<div className="carousel-caption d-none d-md-block">
									<h5></h5>
									<p></p>
								</div>
							</div>
							<div className="carousel-item">
								<img src="https://img.freepik.com/vector-gratis/salud-mental-entendiendo-vector-cerebral_53876-79084.jpg?size=338&ext=jpg&ga=GA1.2.1846917735.1655248269" className="d-block w-50px h-70px" alt="..." />
								<div className="carousel-caption d-none d-md-block">
									<h5></h5>
									<p></p>
								</div>
							</div>
						</div>
						<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>
					</div>
				</div>
			</div>
			<div id="caja_abajo">

			</div>



		</div >
	);
};
