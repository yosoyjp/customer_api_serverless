// file: ./seed/runner.js

require('dotenv/config');

const { CustomerSeeder } = require('./customer.seeder');
const { DynamoDB } = require('aws-sdk');
const { DocumentClient } = DynamoDB;
const customersData = require('./customers-test-data.json');

const dynamo = new DynamoDB({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const doclient = new DocumentClient({ service: dynamo });
const customerSeeder = new CustomerSeeder(dynamo, doclient);

const log = (...mgs) => console.log('>>', ...mgs);

const seedCustomers = async () => {
  log(`Checking if 'customers' table exists`);

  const exists = await customerSeeder.hasTable();

  if (exists) {
    log(`Table 'customers' exists, deleting`);
    await customerSeeder.deleteTable();
  }

  log(`Creating 'customers' table`);
  await customerSeeder.createTable();

  log('Seeding data');
  await customerSeeder.seed(customersData);
};

seedCustomers()
  .then(() => log('Done!'))
  .catch(err => console.log(err));