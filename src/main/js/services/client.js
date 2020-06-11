'use strict';

// External Dependencies
const axios = require('axios').default;

export const client_setup_get = () => {
    const axios_get = axios.create({
        method: 'GET',
        headers: { 'Accept': 'application/hal+json' },
        timeout: 10000
    })
    axios_get.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.url = config.url.indexOf('{') !== -1 ? config.url.split('{')[0] : config.url;
        return config;
        }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
    return axios_get;
}
export const client_setup_other = (method) => {
    const axios_new = axios.create({
        method: method
    })
    return axios_new;
}
