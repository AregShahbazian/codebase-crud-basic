export const author = values => {
    const errors = {}

    if (!values.name) {
        errors.name = "Name is required"
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required"
    }

    return errors
}
