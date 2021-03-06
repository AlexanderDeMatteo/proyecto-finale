const getState = ({ getStore, getActions, setStore }) => {
	const API_URL = process.env.BACKEND_URL;
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			userData: {},
			userPsicologos: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			registerUser: async (data) => {
				let response = await fetch(`${API_URL}/api/sign-up`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});
				if (response.status == 200) {
					let data = await response.json();
					localStorage.setItem("token", data.token);
					return true;
				} else return false;
			},

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
					setStore({ userData: body })

				}
			},

			handle_user_psicologo: async () => {
				let response = await fetch(`${API_URL}/api/user-psicologo-data`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					},
					// body: JSON.stringify([])
				});

				if (response.ok) {
					let body = await response.json()
					setStore({ userPsicologos: body })

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
					method: 'put',
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

			// handle_user_upgrade: async () => {
			// 	let response = await fetch(`${API_URL}/api/user-data`, {
			// 		method: 'PUT',
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			Authorization: `Bearer ${localStorage.getItem("token")}`
			// 		},
			// 		body: JSON.stringify([])
			// 	});

			// 	if (response.ok) {
			// 		console.log(data)
			// 		if (response.status == 200) {
			// 			let body = await response.json()
			// 			return true;
			// 		} else return false;)
			// 	}
			// },

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

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
