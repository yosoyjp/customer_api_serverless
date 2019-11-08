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

    async get(id) {
        const params = this._createParamObject({ Key: { id } });
        const response = await this._docClient.get(params).promise();

        return response.Item || [];
    }

    async put(customer) {
        const params = this._createParamObject({ Item: { customer } });
        await this._docClient.put(params).promise();

        return customer;
    }

    async delete(id) {
        const params = this._createParamObject({ Key: { id } });
        await this._docClient.delete(params).promise();

        return id;
    }

}

exports.CustomerRepository = CustomerRepository;