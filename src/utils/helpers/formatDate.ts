const formatDate = (inputDate: string): string => {
  const parts = inputDate.split("-");

  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  const formattedDate = year + "." + month + "." + day;

  return formattedDate;
};

export default formatDate;
