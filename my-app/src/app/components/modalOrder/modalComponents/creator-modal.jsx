import { UPDATE_ORDER } from "../../../reducer";
import { useCallback } from "react";
import { submitOrder } from "../../../fetch/order";
import { isOrderOpen, isOrderDone, isPaymentReceived } from "../../../helper";

export function CreatorView({ order, dispatch, auth }) {
  const handleSubmitOrder = useCallback(async () => {
    const data = await submitOrder(order.id, auth);

    if(data.status === 'success') {
      dispatch({type: UPDATE_ORDER, payload: data.response})
    }
  }, [dispatch, auth, order]);

  return (
    <div className="modal-order__creator-box">
      {order.creator.publicKey === auth.publicKey && !isOrderOpen(order) ? 
        <>
          <h3>О работнике</h3>
          <p className="model-order__employee">Работник: <span>{order.employee.name}</span></p>
          {isOrderDone(order) && !isPaymentReceived(order) ? 
          (<button
            className='order__submit'
            onClick={handleSubmitOrder}>
            Подтвердить выполнение
          </button>) : ''}
        </> : ''
      }
    </div>
  )
}