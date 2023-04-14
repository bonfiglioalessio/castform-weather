const getDate = (date) => {
  let splittedDate = date.split(" ")[0].split("-");
  let month = splittedDate[1];
  switch (month) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
    default:
      break;
  }
  const dayNumber = splittedDate[2];

  let day = new Date().toString();
  day = day.split(" ");
  day = day[0];
  // const month = date[1];
  // const dayNumber = date[2];
  return `${day}, ${dayNumber} ${month.substring(0, 3)}`;
};

export default getDate;
