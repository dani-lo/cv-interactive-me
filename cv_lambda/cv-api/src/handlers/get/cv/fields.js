const fields = require('../../../data/fields');


exports.getFieldsHandler = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`getFieldsHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('getFieldsHandler -- received:', event);

    let response = {};

    try {

        response = {
            statusCode: 200,
            body: JSON.stringify(fields),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "content-type"
            }
        };
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Unable to load fields"
        };
    }

    console.info(`getFieldsHandler -- response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
