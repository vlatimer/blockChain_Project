export const getFormData = function (event) {
  const formData = new FormData(event.target);
  var alldata = (formData) => {
    const obj = {};

    for (let key of formData.keys()) {
      obj[key] = formData.get(key);
    }

    return obj;
  };
  const data = alldata(formData);
  return data;
};
