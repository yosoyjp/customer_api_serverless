
require('dotenv/config');


const { withStatusCode } = require('../../utils/response.util');
const { createRepository } = require('../../utils/repository.util');

const repository = createRepository(process.env)();
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