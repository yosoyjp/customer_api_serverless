// file: src/handlers/customers/update.js

require('dotenv/config');


const { withStatusCode } = require('../../utils/response.util');
const { parseWith } = require('../../utils/request.util');
const { validateCustomerData } = require('../../utils/validateData');
const { createRepository } = require('../../utils/repository.util');

const repository = createRepository(process.env)();

const accepted = withStatusCode(202);
const badRequest = withStatusCode(400);
const notFound = withStatusCode(404);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event) => {
  const { body, pathParameters } = event;
  const { dni } = pathParameters;

  const existingCustomer = await repository.get(dni);
  const customer = parseJson(body);

  if (!existingCustomer) {
    return notFound();
  }

  if (existingCustomer.dni !== customer.dni) {
    return badRequest();
  }

  if (validateCustomerData(customer)) {

    await repository.put(customer);
    return accepted(JSON.stringify(customer));

  } else {

    return badRequest();
  }

};