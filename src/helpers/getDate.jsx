const getDate = () => {
  let date = new Date().toString();
  date = date.split(" ");
  const day = date[0];
  const dayNumber = date[2];
  const month = date[1];
  return `${day}, ${dayNumber} ${month}`;
};

export default getDate;
