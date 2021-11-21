import { useState, useEffect } from 'react';

export const useForm = (open, values, callback) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) callback();
    }, [errors, isSubmitting])

    useEffect(() => {
        !open && setErrors({})
    }, [open])

    const validate = (values) => {
        let errors = {};
        if (!values.first_name) {
            errors.first_name = 'First name is required';
        } else if (values.first_name.length < 2) {
            errors.first_name = 'First name should contain at least 2 symbols';
        }
        if (!values.last_name) {
            errors.last_name = 'Last name is required';
        } else if (values.last_name.length < 2) {
            errors.last_name = 'Last name should contain at least 2 symbols';
        }
        if (!values.email) {
        errors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
        }
        if (!values.password) {
        errors.password = 'Password is required';
        } else if (
            values.password.length < 6 ||
            values.password.length > 10 ||
            !/\d/.test(values.password) ||
            !/[A-Z]/.test(values.password)
        ) {
        errors.password = 'Password is invalid';
        }
        if (!values.confirm_password) {
            errors.confirm_password = 'Confirm password is required';
        } else if (values.confirm_password !== values.password) {
            errors.confirm_password = 'Confirm password is invalid';
        }

        return errors;
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    return {
        errors,
        handleSubmit,
    }
};
