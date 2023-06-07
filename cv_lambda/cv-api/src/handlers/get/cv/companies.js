const companies = require('../../../data/companies');


exports.getCompaniesHandler = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`getCompaniesHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('getCompaniesHandler -- received:', event);

    let response = {};

    try {
       
        response = {
            statusCode: 200,
            body: JSON.stringify(companies),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "content-type"
            }
        };
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Unable to load companies"
        };
    }

    console.info(`getCompaniesHandler -- response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
