exports.validateCustomerData = (customer) => {
    const { dni, typeDoc, name, surname, age, city} = customer;
    if(!dni || !name || !surname || !typeDoc || !age || !city){
        return false;
    }

    if(isNaN(age)){
        return false;
    }
    
    return true;
}