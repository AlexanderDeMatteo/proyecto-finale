import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Imagenes } from "./component/imagenes";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { PaginaPrincipal } from "./pages/paginaPrincipal";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Navbar2 } from "./component/navbar_2";
import { Navbar3 } from "./component/navbar3";
import { Footer } from "./component/footer";
import "../styles/layout.css"

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					{/* <Navbar /> */}
					<Switch>
						<Route exact path="/">
							<Navbar />
							<Home />
						</Route>
						<Route exact path="/signup">
							<Navbar />
							<SignUp />
						</Route>
						<Route exact path="/signin">
							<Navbar />
							<SignIn />
						</Route>
						<Route exact path="/paginaPrincipal">
							<Navbar3 />
							<div className="box" >
								<div>
									<Navbar2 />
								</div>
								<div>
									<PaginaPrincipal />
								</div>
							</div>
						</Route>
						<Route exact path="/imagen">
							<Imagenes />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div >
	);
};

export default injectContext(Layout);
