
require('dotenv/config');

const { CustomerRepository } = require('../../repositories/customer.repository');
const { withStatusCode } = require('../../utils/response.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const repository = new CustomerRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);
const notFound = withStatusCode(404);

exports.handler = async (event) => {
  let { dni, typeDoc } = event.pathParameters;


  const customers = await repository.getWithType(dni, typeDoc);

  if (!customers) {
    return notFound();
  }

  return ok(customers);
};