import axios  from 'axios';

const baseUrl = '/api/';
const headers = { 'Accept': 'application/hal+json' };

export const axios_config_setup= (url: string, method: string, pageSize: number): any => {
	return{
		url: url.indexOf('{') !== -1 ? url.split('{')[0] : url,
		method: method,
		baseURL: baseUrl,
		headers: headers,
		params: { size: '' + pageSize }
	};
}

export const axios_config = (url: string): any => {
	const client = axios.create({
		url: url.indexOf('{') !== -1 ? url.split('{')[0] : url,
		baseURL: baseUrl,
		headers: headers
	});
	client.interceptors.request.use(function (config) {
		// Do something before request is sent
		config.url = url.indexOf('{') !== -1 ? url.split('{')[0] : url;
		return config;
	}, function (error) {
		// Do something with request error
		return Promise.reject(error);
	});
	
	return client
}
