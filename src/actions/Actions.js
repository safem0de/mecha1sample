// https://www.codegrepper.com/code-examples/delphi/js+convert+month+number+to+month+name
// https://stackoverflow.com/questions/54857222/find-all-values-by-specific-key-in-a-deep-nested-object/54857283#54857283
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

export function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24);
}

export function convert(str,month_format) {
  if (month_format === 'MMM'){
      var date = new Date(str),
      mnth = date.toLocaleString('en-us', { month: 'short' }),
      day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
  }
  else if(month_format === 'MM'){
      var date2 = new Date(str),
      mnth2 = ("0" + (date2.getMonth() + 1)).slice(-2),
      day2 = ("0" + date2.getDate()).slice(-2);
  return [date2.getFullYear(), mnth2, day2].join("-");
  }
}

export function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(convert(new Date(date),'MMM'));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

