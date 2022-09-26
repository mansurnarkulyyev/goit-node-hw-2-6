const handleMongooseSchemaError = (error, data, next)=> {
    const {name, code} = error;
    const isDuplicate = name === "MongoServerError" && code === 11000;
    error.status = isDuplicate ? 409 : 400;
    next();
};

module.exports = handleMongooseSchemaError;