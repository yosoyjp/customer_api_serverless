// file: src/handlers/customers/get.js

require('dotenv/config');




const { withStatusCode } = require('../../utils/response.util');
const { createRepository } = require('../../utils/repository.util');

const repository = createRepository(process.env)();

const ok = withStatusCode(200, JSON.stringify);
const notFound = withStatusCode(404);

exports.handler = async (event) => {
    let { filter, age } = event.pathParameters;

    let customers;

    if ((filter === 'up' || filter === 'down') && (!isNaN(age) && (age = parseInt(age)))) {
        customers = await repository.filterAge(filter, age);
    }

    if (!customers) {
        return notFound();
    }

    return ok(customers);
};