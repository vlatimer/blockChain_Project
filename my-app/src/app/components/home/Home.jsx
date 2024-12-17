import { Header } from "../header/header"
import { Main } from "../main/main"
import { CreateOrder } from "../createOrder/createOrder"
import { Loading } from "../loading/loading"
import { todoReducer } from "../../reducer"
import { useReducer, useState } from "react"
import { ModalOrder } from "../modalOrder/modalOrder"

export function Home({ auth }){
  const [store, dispatch] = useReducer(todoReducer, {
    orders: [],
    transfers: [],
  })
  const [isCreating, setCreating] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(0);

  return (
    <>
      <Header store={store} dispatch={dispatch} auth={auth} setCreating={setCreating} setLoading={setLoading}/>
      <Main store={store} dispatch={dispatch} auth={auth} setOrderId={setOrderId} />
      {isCreating ? 
        (<CreateOrder store={store} dispatch={dispatch} auth={auth} setCreating={setCreating}/>)
        : ''}

      {isLoading ? (<Loading/>) : ''}

      {orderId ? 
        (<ModalOrder 
          dispatch={dispatch}
          auth={auth} 
          order={
            store.orders.filter((o) => o.id === orderId)[0]
          } 
          setOrderId={setOrderId}/>) : ''}
    </>
  )
}