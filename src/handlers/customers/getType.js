// file: src/handlers/customers/get.js

require('dotenv/config');


const { withStatusCode } = require('../../utils/response.util');
const { createRepository } = require('../../utils/repository.util');

const repository = createRepository(process.env)();


const ok = withStatusCode(200, JSON.stringify);
const notFound = withStatusCode(404);

exports.handler = async (event) => {
    let { typeDoc } = event.pathParameters;


    const customer = await repository.type(typeDoc);

    if (!customer) {
        return notFound();
    }

    return ok(customer);
};