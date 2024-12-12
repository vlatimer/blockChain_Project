import { Header } from "../header/header"
import { Main } from "../main/main"
import { CreateOrder } from "../createOrder/createOrder"
import { todoReducer, UPLOAD_ORDERS } from "../../reducer"
import { useEffect, useReducer, useState } from "react"

export function Home({ auth }){
  const [store, dispatch] = useReducer(todoReducer, {
    orders: [],
    transfers: [],
  })
  const [isCreating, setCreating] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/api/orders`, {
        method: 'GET',
      })
      const data = await response.json();
      console.log(data);
      if(data.status === "success"){
        dispatch({type: UPLOAD_ORDERS, payload: data.response});
      }
    })();
  }, [dispatch])

  return (
    <>
      <Header store={store} dispatch={dispatch} auth={auth} setCreating={setCreating}/>
      <Main store={store} dispatch={dispatch} />
      {isCreating ? (<CreateOrder store={store} dispatch={dispatch} auth={auth} setCreating={setCreating}/>) : ''}
    </>
  )
}