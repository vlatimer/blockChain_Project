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


export const isOrderOpen = function (order){
  return order.orderStatus === 0;
}

export const isOrderProcessing = function (order){
  return order.orderStatus === 1;
}

export const isOrderDone = function (order){
  return order.orderStatus === 2;
}

export const isPaymentUnPaid = function (order){
  return order.paymentStatus === 0;
}

export const isPaymentPaid = function (order){
  return order.paymentStatus === 1;
}

export const isPaymentReceived = function (order){
  return order.paymentStatus === 2;
}