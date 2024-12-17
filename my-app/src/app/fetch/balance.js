export const getBalance = async function(auth) {
  const response = await fetch(`http://localhost:8080/api/balance?account=${auth.publicKey}`, {
    method: 'GET',
  })
  const data = await response.json();
  console.log(data);
  return data;
}

export const buyTokens = async function(auth, value) {
  const response = await fetch(`http://localhost:8080/api/buy`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: auth.publicKey,
      amount: {
        value: value,
        type: 'wei',
      }
    })
  })
  const data = await response.json();
  console.log(data);
  return data;
}

