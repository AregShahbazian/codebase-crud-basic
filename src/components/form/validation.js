export const authorCreate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = "Name is required"
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required"
    }

    return errors
}

export const authorUpdate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = "Name is required"
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required"
    }

    return errors
}
