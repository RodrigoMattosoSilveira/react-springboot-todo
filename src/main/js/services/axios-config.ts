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
