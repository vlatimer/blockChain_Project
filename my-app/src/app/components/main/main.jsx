import { NoOrders } from "../noOrders/noOrders"
import { Order } from "../order/order"

export function Main({ store, dispatch }) {
  return (
    <div className="content">
      {(console.log(store))}
      {
        store.orders.length > 0 ?
        <>
          {store.orders.map((item, index) => {
            return (<Order order={item} key={index}/>)
          })}
        </> : <NoOrders/>
      }
    </div>
  )
}