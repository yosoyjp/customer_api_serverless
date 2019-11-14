
const { CustomerRepository } = require('../repositories/customer.repository');
const { withProcessEnv } = require('../dynamodb.factory');


const createRepository = (env) => {
  const docClient = withProcessEnv(env)();

  return (tableName) => new CustomerRepository(docClient, tableName || env.CUSTOMERS_TABLE);
};

module.exports = {
  createRepository
};