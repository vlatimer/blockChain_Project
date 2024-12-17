import { NoOrders } from "../noOrders/noOrders"
import { Order } from "../order/order"

export function Main({ store, dispatch, auth, setOrderId }) {
  return (
    <div className="content">
      {
        store.orders.length > 0 ?
        <>
          {store.orders.map((item, index) => {
            return (<Order
                      order={item}
                      key={index}
                      dispatch={dispatch}
                      auth={auth}
                      setOrderId={setOrderId}
                    />)
          })}
        </> : <NoOrders/>
      }
    </div>
  )
}