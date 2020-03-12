import FormData from "form-data";
const getPreviousDate = date => {
  date.setDate(date.getDate() - 1);
  return date;
};

const begginingOfDate = baseDate => {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const date = baseDate.getDate();
  return new Date(year, month, date);
};
export const findBegginEndDateForWeek = date => {
  let begginDate = date;
  let endDate;
  while (begginDate.getDay() !== 1) {
    begginDate = getPreviousDate(begginDate);
  }
  begginDate = begginingOfDate(begginDate);
  endDate = new Date(begginDate);
  endDate.setDate(endDate.getDate() + 4);
  return { begginDate, endDate };
};

export const createFormDataWithImage = (fieldName, image) => {
  const data = new FormData();
  data.append(fieldName, {
    type: image.type,
    name: image.uri.match(/[^\/]*?$/)[0],
    uri:
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
  });
  return data;
};
