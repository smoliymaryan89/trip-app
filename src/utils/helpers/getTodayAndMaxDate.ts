const getTodayAndMaxDate = (): { todayStr: string; maxDateStr: string } => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);
  const todayStr = today.toISOString().split("T")[0];
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return { todayStr, maxDateStr };
};

export default getTodayAndMaxDate;
