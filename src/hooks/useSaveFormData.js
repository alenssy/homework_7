import { useState, useEffect } from "react";

export const useSaveFormData = (open) => {
    const [values, setValues] = useState({})

    useEffect(() => {
        !open && setValues({})
    }, [open])

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    return {
        values,
        handleChange,
    }
}