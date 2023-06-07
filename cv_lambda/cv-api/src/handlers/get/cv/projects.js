const projects = require('../../../data/projects');


exports.getProjectsHandler = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`getProjectsHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('getProjectsHandler -- received:', event);

    let response = {};

    try {
       
        response = {
            statusCode: 200,
            body: JSON.stringify(projects),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "content-type"
            }
        };
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Unable to load projects"
        };
    }

    console.info(`getProjectsHandler -- response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
