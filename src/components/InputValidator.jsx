import React from "react";

const validationRules = {
        name: {
            required: "First name is required",
                minLength: {
                    value: 2,
                    message: "Must be at least 2 characters"
            }
        },
        lastName: {
            required: "Last name is required",
                minLength: {
                    value: 2,
                    message: "Must be at least 2 characters"
            }
        },
        username: {
            required: "Username is required",
                minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters"
            }
        },
            password: {
                required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
            }
        }
    };

    const InputValidator = {
    // Validate a single field
    validateField: (fieldName, value) => {
        const rules = validationRules[fieldName];

    if (!rules) {
        return { isValid: true, error: "" };
    }

    // Check required
    if (rules.required && value.trim() === "") {
        return { isValid: false, error: rules.required };
    }

    // Check min length
    if (rules.minLength && value.length < rules.minLength.value) {
        return { isValid: false, error: rules.minLength.message };
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.value.test(value)) {
        return { isValid: false, error: rules.pattern.message };
    }

    return { isValid: true, error: "" };
        },

    // Validate multiple fields at once
    validateForm: (formData) => {
        const errors = {};
        let isFormValid = true;

    Object.keys(formData).forEach(fieldName => {
        const { isValid, error } = InputValidator.validateField(fieldName, formData[fieldName]);
        
        if (!isValid) {
            errors[fieldName] = error;
            isFormValid = false;
        }
    });

        return { isFormValid, errors };
    },

    // Return validation rules
    getValidationRules: () => {
            return validationRules;
        }
    };

export default InputValidator;