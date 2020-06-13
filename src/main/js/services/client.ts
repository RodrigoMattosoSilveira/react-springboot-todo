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

export const client_update_configx = (path: string,  method: string, updateTodo: any, etag: string) => {
	return axios.create({
		method: method,
		url: path,
		data: updateTodo,
		validateStatus: null,
		headers: {
			'Content-Type': 'application/json',
			'If-Match': etag
		},
		timeout: 10000
	})
}

export const client_update_config = (etag: string) => {
	return axios.create({
		validateStatus: null,
		headers: {
			'Content-Type': 'application/json',
			'If-Match': etag
		},
		timeout: 10000
	})
}
