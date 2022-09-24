const getState = ({ getStore, getActions, setStore }) => {
	const API_URL = process.env.BACKEND_URL;
	return {

		store: {
			userData: {},
			userPsicologos: JSON.parse(sessionStorage.getItem("psicos")) || []
		},

		actions: {
			// Registrar al usuario en base de datos
			registerUser: async (data) => {
				let response = await fetch(`${API_URL}/api/sign-up`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});
				if (response.ok) {
					let data = await response.json();
					localStorage.setItem("token", data.token);
					return true;
				} else return false;
			},
			// Hacer el login para el usuario registrado
			loginUser: async (data) => {
				let response = await fetch(`${API_URL}/api/sign-in`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});
				if (response.status == 200) {
					let data = await response.json();
					localStorage.setItem("token", data.token);
					// setTimeout(function () {
					// 	localStorage.remove("token");
					// }, 1000 * 60 * 60); //Ejecutar despues de una hora
					// console.log(setTimeout())
					return true;
				} else return false;
			},

			privateData: async () => {
				let response = await fetch(`${API_URL}/api/private`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				let data = await response.json();

			},

			handle_user_data: async () => {
				let response = await fetch(`${API_URL}/api/user-data`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					},
					// body: JSON.stringify([])
				});

				if (response.ok) {
					let body = await response.json()
					console.log(body)
					setStore({ userData: body })

				}
			},

			handle_user_psicologo: async () => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/user-psicologo-data`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					setStore({
						...store,
						userPsicologos: body
					})
					sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
				}
			},

			handle_edit: (data, prop) => {
				let store = getStore()
				let userProp = (store.userData[`${prop}`] = data)
				setStore(prev => ({
					...prev, userProp
				}))
			},

			picture_profile: async (data) => {
				let response = await fetch(`${API_URL}/api/user-profile-picture`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					},
					body: JSON.stringify(data)
				});
				if (response.ok) {
					getActions().handle_user_data()
				}

			},

			handle_user_upgrade: async () => {
				let response = await fetch(`${API_URL}/api/user-data`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					},
					body: JSON.stringify([])
				});

				if (response.ok) {
					console.log(data)
					if (response.status == 200) {
						let body = await response.json()
						return true;
					} else return false;
				}
			},

			// 	handleList: async (e) => {
			// 	if (e.key === "Enter" && addTodolist != "") {
			// 		let newTask = [...todoList, { label: e.target.value, done: false }];
			// 		const response = await fetch(apiUrl, {
			// 			method: "PUT",
			// 			body: JSON.stringify(newTask),
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 			},
			// 		});
			// 		setAddTodolist("");
			// 		if (response.ok) {
			// 			getTodoList();
			// 		}
			// 	}
			// };


			// userData: async () => {
			// 	getUserData: async () => {
			// 		const store = getStore()
			// 		let response = await fetch(`${store.API_URL}`);
			// 		if (response.ok) {
			// 			let body = await response.json()
			// 			setStore({ UserData: body.results })
			// 		}
			// 	},
			// },
		}
	};
};

export default getState;
