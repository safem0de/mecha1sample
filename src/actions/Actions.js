export function formatDate(ts){
    var date_not_formatted = new Date(ts);
    var formatted_string = date_not_formatted.getFullYear() + "-";

    if (date_not_formatted.getMonth() < 9) {
      formatted_string += "0";
    }
    formatted_string += (date_not_formatted.getMonth() + 1);
    formatted_string += "-";

    if(date_not_formatted.getDate() < 10) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getDate();
    formatted_string += " ";

    if(date_not_formatted.getHours() < 10){
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getHours();
    formatted_string += ":";

    if(date_not_formatted.getMinutes() < 10){
      formatted_string += "0";
    }
    formatted_string += (date_not_formatted.getMinutes());
    formatted_string += ":";

    if(date_not_formatted.getSeconds() < 10){
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getSeconds();

    return(formatted_string);
}