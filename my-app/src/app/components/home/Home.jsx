import { Header } from "../header/header"
import { Main } from "../main/main"
import { CreateOrder } from "../createOrder/createOrder"
import { Loading } from "../loading/loading"
import { todoReducer } from "../../reducer"
import { useReducer, useState } from "react"

export function Home({ auth }){
  const [store, dispatch] = useReducer(todoReducer, {
    orders: [],
    transfers: [],
  })
  const [isCreating, setCreating] = useState(false);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Header store={store} dispatch={dispatch} auth={auth} setCreating={setCreating} setLoading={setLoading}/>
      <Main store={store} dispatch={dispatch} auth={auth} />
      {isCreating ? (<CreateOrder store={store} dispatch={dispatch} auth={auth} setCreating={setCreating}/>) : ''}
      {isLoading ? (<Loading/>) : ''}
    </>
  )
}