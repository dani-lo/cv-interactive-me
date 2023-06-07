const tech = require('../../../data/tech');

exports.getTechHandler = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`getTechHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('getTechHandler -- received:', event);

    let response = {};

    try {

        response = {
            statusCode: 200,
            body: JSON.stringify(tech),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "content-type"
            }
        };
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Unable to load tech"
        };
    }

    console.info(`getTechHandler -- response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
