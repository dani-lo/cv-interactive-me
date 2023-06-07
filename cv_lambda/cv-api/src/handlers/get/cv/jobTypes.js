const jobTypes = require('../../../data/jobTypes');


exports.getJobTypesHandler = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`getJobTypesHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('getJobTypesHandler -- received:', event);

    let response = {};

    try {

        response = {
            statusCode: 200,
            body: JSON.stringify(jobTypes),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "content-type"
            }
        };
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Unable to load job types"
        };
    }

    console.info(`getJobTypesHandler -- response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}