export function dateFormat(date) {
    const parts = date.split("/"); 
    const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); 
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
} 