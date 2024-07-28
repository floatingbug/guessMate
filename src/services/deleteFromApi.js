async function deleteFromApi(data, resource, errMsg, getUserData){
	const token = localStorage.getItem("token");
	const options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify(data)
	};

	try{
		const response = await fetch(`${resource}`, options);
		const result = await response.json();

		if(!result.success) return errMsg.value = result.msg;
	}
	catch(err){
		return console.log(err);
	}

	getUserData();
}


export {deleteFromApi};
