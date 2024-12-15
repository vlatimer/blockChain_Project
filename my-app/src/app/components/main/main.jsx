import { NoOrders } from "../noOrders/noOrders"
import { Order } from "../order/order"

export function Main({ store, dispatch, auth }) {
  return (
    <div className="content">
      {
        store.orders.length > 0 ?
        <>
          {store.orders.map((item, index) => {
            return (<Order
                      order={item}
                      key={index}
                      isMy={item.creator.publicKey === auth.publicKey}
                    />)
          })}
        </> : <NoOrders/>
      }
    </div>
  )
}