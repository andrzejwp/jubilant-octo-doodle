const fetch = require("node-fetch");
const crypto = require('crypto');

let headers = {
    "accept": "application/json"
};
let apiUrl;

exports.sourceNodes = async ({actions}, {baseUrl, authToken}) => {
    const { createNode } = actions;
    apiUrl = baseUrl;
    headers['X-AUTH-TOKEN'] = authToken;

    const response = await fetch(apiUrl + '/api/v1/content/blogpost', {
        headers: headers
    });
    if(response.ok) {
        let json = await response.json();
        let nodes = await Promise.all(json.data.map(async datum => {
		if(datum.thumbnail && datum.thumbnail.length){
            const response  = await fetch(apiUrl + datum.thumbnail[0].dataUrl, {headers: headers});
            if(response.ok) {
                datum.thumbnail[0] = await response.json();
		    console.log('response ok!');
            }
		} else {
			datum.thumbnail = [{"id":"", "extension":""}];
		}
	    if(datum.headerImage && datum.headerImage.length){
            const response2  = await fetch(apiUrl + datum.headerImage[0].dataUrl, {headers: headers});

            if(response2.ok) {
                datum.headerImage[0] = await response2.json();

            }
	    } else {
		    datum.headerImage = [{"id":"", "extension":""}];
	    }
            return createNode({
                // custom
                slug: datum.slug,
                title: datum.title,
                content: datum.content,
                thumbnail: datum.thumbnail,
                headerImage: datum.headerImage,
                flotiqInternal: datum.internal,
                //required
                id: datum.id,
                parent: null,
                children: [],
                internal: {
                    type: `FlotiqBlogPost`,
                    contentDigest: crypto
                        .createHash(`md5`)
                        .update(JSON.stringify(datum))
                        .digest(`hex`),
                }
            })
        }));
        return await nodes;
    }

    return
};
