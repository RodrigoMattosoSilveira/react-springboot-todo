export const axios_config = (): any => {
	let config = {
		headers: { 'Accept': 'application/hal+json' }
	};
	
	return config;
}

export const axios_uriTemplateInterceptor = (path: string): string => {
	let newPath = path;
	
	if (path.indexOf('{') === -1) {
		return newPath;
	} else {
		newPath = path.split('{')[0];
		return newPath;
	}
}
