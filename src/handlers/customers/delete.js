// file: src/handlers/customers/delete.js

require('dotenv/config');

const { CustomerRepository } = require('../../repositories/customer.repository');
const { withStatusCode } = require('../../utils/response.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const repository = new CustomerRepository(docClient);
const noContent = withStatusCode(204);

exports.handler = async (event) => {
    let { dni } = event.pathParameters;

    await repository.delete(dni);

    return noContent();
};