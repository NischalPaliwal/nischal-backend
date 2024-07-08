export const createUserValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "name cannot be empty"
        },
        isLength: {
            options: {min: 2, max: 8},
            errorMessage: "name must include 2-8 characters"
        },
        isString: {
            errorMessage: "name must be a string!"
        }
    }
};