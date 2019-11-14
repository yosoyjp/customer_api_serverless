// file: src/handlers/customers/add.js

require('dotenv/config');

// const { CustomerRepository } = require('../../repositories/customer.repository');
// const { withProcessEnv } = require('../../dynamodb.factory');

// const docClient = withProcessEnv(process.env)();
// const repository = new CustomerRepository(docClient);

const { withStatusCode } = require('../../utils/response.util');
const { parseWith } = require('../../utils/request.util');
const { createRepository } = require('../../utils/repository.util');

const repository = createRepository(process.env)();

const created = withStatusCode(201);
const parseJson = parseWith(JSON.parse);
const badRequest = withStatusCode(400);

const {validateCustomerData } = require('../../utils/validateData');

exports.handler = async (event) => {
    const { body } = event;
    const customer = parseJson(body);

    if(validateCustomerData(customer)){

        await repository.put(customer);
        return created(JSON.stringify(customer));

    }else{

        return badRequest();
    }

};
