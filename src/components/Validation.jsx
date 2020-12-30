export default function validateInfo(values) {
    let errors = {};

    if (!values.username.trim()) {
        errors.username = 'Username required';
    } else if (values.username.length <= 2) {
        errors.username = 'Username needs to be more than 2 characters';
    }

    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (!/((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W))/.test(values.password)) {
        errors.password = 'Password should contain special chars, upper case, lower case and number';
    }
    return errors;
}