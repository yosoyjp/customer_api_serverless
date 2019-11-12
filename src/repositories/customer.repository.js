// file: src/repositories/customer.respository.js


class CustomerRepository {
    get _baseParams() {
        return {
            TableName: 'customers'
        };
    }

    _createParamObject(additionalArgs = {}) {
        return Object.assign({}, this._baseParams, additionalArgs);
    }

    constructor(docClient) {
        this._docClient = docClient;
    }

    async list() {
        const params = this._createParamObject();
        const response = await this._docClient.scan(params).promise();

        return response.Items || [];
    }

    async get(dni) {
        const params = this._createParamObject({
            FilterExpression: 'dni = :dni',
            ExpressionAttributeValues: {
                ':dni': dni,
            }
        });
        const response = await this._docClient.scan(params).promise();

        return (response.Items) ? response.Items[0] : null;
    }

    async getWithType(dni, typeDoc) {
        const params = this._createParamObject({
            FilterExpression: '(dni = :dni) and (typeDoc = :typeDoc)',
            ExpressionAttributeValues: {
                ':dni': dni,
                ':typeDoc': typeDoc
            }
        });

        const response = await this._docClient.scan(params).promise();

        return (response.Items) ? response.Items[0] : null;
    }

    async type(type) {
        const params = this._createParamObject({
            FilterExpression: 'typeDoc = :typeDoc',
            ExpressionAttributeValues: {
                ':typeDoc': type
            }
        });

        const response = await this._docClient.scan(params).promise();
        return response.Items || [];
    }

    async filterAge(filter, age) {

        const params = this._createParamObject({
            FilterExpression: (filter === 'up') ? 'age >= :age' : 'age <= :age',
            ExpressionAttributeValues: {
                ':age': age
            }
        });
        const response = await this._docClient.scan(params).promise();
        return response.Items || [];
    }

    async put(customer) {
        customer.age = (typeof customer.age === 'string') ? parseInt(customer.age, 10) : customer.age;
        const params = this._createParamObject({ Item: customer });
        await this._docClient.put(params).promise();

        return customer;
    }

    async delete(dni) {
        const params = this._createParamObject({ Key: { dni } });
        await this._docClient.delete(params).promise();

        return dni;
    }

}

exports.CustomerRepository = CustomerRepository;