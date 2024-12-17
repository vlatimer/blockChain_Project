export const createOrder = async function(auth, postData) {
  const response = await fetch(`http://localhost:8080/api/order`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: auth.publicKey,
      arguments: {
        ...postData,
      }
    }),
  })
  const data = await response.json();
  console.log(data);
  return data;
}

export const getOrders = async function(auth, filter) {
  const response = await fetch(`http://localhost:8080/api/orders?account=${auth.publicKey}&filter=${filter}`, {
    method: 'GET',
  })
  const data = await response.json();
  console.log(data);
  return data;
}

export const acceptOrder = async function(id, auth) {
  const response = await fetch(`http://localhost:8080/api/accept/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: auth.publicKey,
    }),
  })
  const data = await response.json();
  console.log(data);
  return data;
}

export const completeOrder = async function(id, auth) {
  const response = await fetch(`http://localhost:8080/api/complete/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: auth.publicKey,
    }),
  })
  const data = await response.json();
  console.log(data);
  return data;
}

export const submitOrder = async function(id, auth) {
  const response = await fetch(`http://localhost:8080/api/submit/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: auth.publicKey,
    }),
  })
  const data = await response.json();
  console.log(data);
  return data;
}