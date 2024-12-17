export const getTickets = async function(auth) {
  const response = await fetch(`http://localhost:8080/api/tickets?account=${auth.publicKey}`, {
    method: 'GET',
  })
  const data = await response.json();
  console.log(data);
  return data;
}
