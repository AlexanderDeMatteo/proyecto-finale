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
			userData: []
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
				console.log(data)
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
					return true;
				} else return false;
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
