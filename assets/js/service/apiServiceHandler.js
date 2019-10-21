const apiServiceHandler = () => {
	function GetJsonData(url, callback) {
		if (!url) {
			return false;
		} else {
			fetch(url)
				.then(resp => resp.json()) // Transform the data into json
				.then(function(data) {
					//storeObj.addDataToStorage(data);
					callback(data);
				})
				.catch(function() {
					console.log('error i Fetch: ' + url);
				});
		}
	}

	return {
		GetjsonDetail: GetJsonData
	};
};

export default apiServiceHandler;
