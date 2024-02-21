const addLeadingZero = (value: number): string =>
  String(value).padStart(2, "0");

export default addLeadingZero;
