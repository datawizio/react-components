export const formatRestErrors = (response: any) => {
  const data = response.data;
  return Object.keys(data)
    .map(key => data[key].join("<br />"))
    .join("<br />");
};
