const isValidDate = date => {
    if (!date) return false;
    
    const now = new Date()
    const currentYear = now.getFullYear()
    const year = +date.split('-')[0]
 
    return year == currentYear || year == currentYear + 1
}

export default isValidDate
