// file: src/handlers/customers/list.js

require('dotenv/config');

const { CustomerRepository } = require('../../repositories/customer.repository');
const { withStatusCode } = require('../../utils/response.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const repository = new CustomerRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);

exports.handler = async (event) => {
  const customers = await repository.list();

  return ok(customers);
};