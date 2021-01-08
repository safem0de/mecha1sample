// https://www.codegrepper.com/code-examples/delphi/js+convert+month+number+to+month+name
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

function convert(str) {
  var date = new Date(str),
    mnth = date.toLocaleString('en-us', { month: 'short' }),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

export function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(convert(new Date(date)));
    date.setDate(date.getDate() + 1);
  }
  return days;
}