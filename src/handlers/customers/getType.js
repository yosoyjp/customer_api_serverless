// file: src/handlers/customers/get.js

require('dotenv/config');

const { CustomerRepository } = require('../../repositories/customer.repository');
const { withStatusCode } = require('../../utils/response.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const repository = new CustomerRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);
const notFound = withStatusCode(404);

exports.handler = async (event) => {
  let { typeDoc } = event.pathParameters; 
  

  const customer = await repository.type(typeDoc);

  if (!customer){
    return notFound();
  }

  return ok(customer);
};