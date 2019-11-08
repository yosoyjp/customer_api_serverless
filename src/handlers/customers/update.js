// file: src/handlers/customers/update.js

require('dotenv/config');

const { CustomerRepository } = require('../../repositories/customer.repository');
const { withStatusCode } = require('../../utils/response.util');
const { parseWith } = require('../../utils/request.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const repository = new CustomerRepository(docClient);
const ok = withStatusCode(200);
const badRequest = withStatusCode(400);
const notFound = withStatusCode(404);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event) => {
  const { body, pathParameters } = event;
  const { id } = pathParameters;

  const existingCustomer = await repository.get(id);
  const customer = parseJson(body);

  if (!existingCustomer) {
    return notFound();
  }

  if (existingCustomer.id !== customer.id) {
    return badRequest();
  }

  await repository.put(customer);

  return ok(customer);
};