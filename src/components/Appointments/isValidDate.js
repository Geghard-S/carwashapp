const isValidDate = date => {
    // Check if the date is falsy (undefined, null, empty string, etc.)
    if (!date) return false;

    // Create a new Date object representing the current date and time
    const now = new Date()
    // Extract the year from the provided date
    const currentYear = now.getFullYear()
    const year = +date.split('-')[0]

    // Check if the year is either the current year or the next year
    return year == currentYear || year == currentYear + 1
}

// Export the isValidDate function to be used in other files
export default isValidDate
