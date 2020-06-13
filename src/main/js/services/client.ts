'use strict';

// External Dependencies
const axios = require('axios').default;

export const client_setup_get = () => {
    const axios_get = axios.create({
        method: 'GET',
        headers: { 'Accept': 'application/hal+json' },
        timeout: 10000
    })
    axios_get.interceptors.request.use(function (config: any) {
        // Do something before request is sent
        config.url = config.url.indexOf('{') !== -1 ? config.url.split('{')[0] : config.url;
        return config;
        }, function (error: any) {
        // Do something with request error
        return Promise.reject(error);
    });
    return axios_get;
}

export const client_put_config = (path: string,  updateTodo: any, etag: string) => {
	return axios.create({
		method: 'PUT',
		path: path,
		entity: updateTodo,
		validateStatus: null,
		headers: {
			'Content-Type': 'application/json',
			'If-Match': etag
		}
	})
}
