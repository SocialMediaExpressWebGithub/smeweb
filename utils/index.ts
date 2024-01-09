export default function formatDateToString(date : string){
    const dateObject = new Date(date);
    const options : Intl.DateTimeFormatOptions = {
        month : "short",
        day : "numeric",
        year : "numeric"
    };

    const formatedDate = dateObject.toLocaleDateString("en-US", options);
    return formatedDate;
}