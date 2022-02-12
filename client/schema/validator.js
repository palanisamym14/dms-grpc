validateSchema = async (values, schema) => {
    try {
        const { value, error } = await schema.validate(values);
        if (error == null) {
            return value;
        }

        const { details } = error;
        const message = details.map(err => err.message).join('');
        throw { code: 404, message: message }
    } catch (err) {
        throw err;
    }
}

module.exports = validateSchema;