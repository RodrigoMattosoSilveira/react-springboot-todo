/**
 *
 * @param client - the library used to make rest calls
 * @param rootPath - the domain root
 * @param relArray - an array of objects or a string
 * @returns {*}
 */
module.exports = function follow(api, rootPath, relArray) {
    return relArray.reduce(function(root, arrayItem) {
        const rel = typeof arrayItem === 'string' ? arrayItem : arrayItem.rel;
        return traverseNext(root, rel, arrayItem);
    }, api);

    function traverseNext (root, rel, arrayItem) {
         const config1 = {url: rootPath};
         return api(config1)
            .then((response) => {
                 // console.log('travelNext top'); console.log(response);
                if (hasEmbeddedRel(response.data, rel)) {
                    return response.data._embedded[rel];
                }

                if(!response.data._links) {
                    return [];
                }

                const config2 = {
                    url: response.data._links[rel].href,
                    params: typeof arrayItem === 'string' ? '' : arrayItem.params
                }
                 // console.log('traverseNext/config2'); console.log(config2);
                return api(config2)
              })
            .catch((error) => {
                 console.error('traverseNext/top: ' + error);
            });
     }

    function hasEmbeddedRel (data, rel) {
        return data._embedded && data._embedded.hasOwnProperty(rel);
    }
};
