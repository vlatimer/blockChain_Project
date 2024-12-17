import { useCallback } from "react";
import { acceptOrder, completeOrder } from "../../../fetch/order";
import { UPDATE_ORDER } from "../../../reducer";
import { isOrderDone, isOrderProcessing, isPaymentReceived } from "../../../helper";

export function EmployeeView({order, auth, dispatch}){

  const handleAcceptOrder = useCallback(async () => {
    const data = await acceptOrder(order.id, auth);

    if(data.status === 'success') {
      dispatch({type: UPDATE_ORDER, payload: data.response})
    }
  }, [dispatch, auth, order]);
  
  const handleCompleteOrder = useCallback(async () => {
    const data = await completeOrder(order.id, auth);

    if(data.status === 'success') {
      dispatch({type: UPDATE_ORDER, payload: data.response})
    }
  }, [dispatch, auth, order]);

  return (
    <div className="modal-order__employee-box">
      {order.creator.publicKey !== auth.publicKey && !isOrderProcessing(order) && !isOrderDone(order) ?
        <button
          onClick={handleAcceptOrder}
          className='order__submit'
          disabled={(order.creator.publicKey === auth.publicKey) ||
          (order.employee.publicKey === auth.publicKey)}>
          Принять заказ
        </button> : ''
      }

      {(order.employee.publicKey === auth.publicKey && isOrderProcessing(order)) ?
        (<button
          className='order__submit'
          onClick={handleCompleteOrder}>
          Завершить
        </button>) : ''}

      {(order.employee.publicKey === auth.publicKey && isOrderDone(order) && !isPaymentReceived(order)) ?
        (<p>
          Заказ направлен на рассмотрение
        </p>) : ''}

      {(order.employee.publicKey === auth.publicKey && isPaymentReceived(order)) ?
        (<p>
          Заказ выполнен и подтвержден
        </p>) : ''}
    </div>
  )
}