import { useCallback } from "react";
import { UPDATE_ORDER } from "../../reducer";
import { acceptOrder } from "../../fetch/order";
import { Token } from "../token/token";

export function Order({ order, dispatch, auth, setOrderId }) {
  const { id, name, payment } = order;

  const handleAcceptOrder = useCallback(async () => {
    const data = await acceptOrder(id, auth)

    if(data.status === 'success') {
      dispatch({type: UPDATE_ORDER, payload: data.response})
    }
  }, [dispatch, auth, id])

  const textForButton = useCallback(() => {
    if(order.paymentStatus === 2) {
      return "Закрыт"
    } else if(order.creator.publicKey === auth.publicKey) {
      return "Ваш заказ"
    } else if(order.employee.publicKey === auth.publicKey) {
      return "Вы работаете"
    } else {
      return "Принять заказ"
    }
  }, [order, auth])

  const isDisabled = useCallback(() => {
    if(order.creator.publicKey === auth.publicKey) {
      return true;
    } else if(order.employee.publicKey === auth.publicKey) {
      return true;
    } else if(order.paymentStatus === 2) {
      return true;
    } else {
      return false;
    }
  }, [order, auth])

  return (
    <div className="order__box">
      <div className="order__info">
        <h2>{name}</h2>
        <p>Оплата за услугу: <span>{payment}</span><Token/></p>
      </div>
      <div className="order__ui">
        <button
          onClick={() => setOrderId(order.id)}
          className="order__submit">
          Подробнее
        </button>
        <button 
          onClick={handleAcceptOrder}
          className={
            !(order.creator.publicKey === auth.publicKey) &&
            !(order.employee.publicKey === auth.publicKey) &&
            !(order.paymentStatus === 2)
            ? 'order__submit' : 'order__my'}
          disabled={isDisabled()}>
          {
            textForButton()
          }
        </button>
      </div>
    </div>
  )
}