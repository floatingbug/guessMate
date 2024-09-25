function sendApiRequest(url, options) {
	return fetch(url, options).then((response) => {
		return response;
	});
}

export default sendApiRequest;
