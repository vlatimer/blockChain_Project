import { useCallback, useRef, useState } from "react";
import { getFormData } from '../../helper';
import { ADD_ORDER, ADD_TRANSFER } from "../../reducer";
import closeLogo from '../../../images/close.png'
import { createOrder } from "../../fetch/order";


export function CreateOrder({ auth, dispatch, setCreating }){
  const form = useRef();
  const [name, setName] = useState('');
  const [payment, setPayment] = useState('');

  const handleCreateOrder = useCallback(async (e) => {
    e.preventDefault();
    try {
      const data = await createOrder(auth, getFormData(e));
      
      if(data.status === "success"){
        dispatch({ type: ADD_ORDER, payload: data.response.order})
        dispatch({ type: ADD_TRANSFER, payload: data.response.transfer})
      }

    } catch(error){
      console.error('Failed to fetch');
    }finally{
      setCreating(false);
    }
  }, [auth, dispatch, setCreating]);

  const checkPayment = useCallback(() => {
    if(/^\d+$/.test(payment)){
      return false;
    }
    return true;
  }, [payment])

  return (
    <div className="create-order__box">
      <form className="create-order__form" ref={form} onSubmit={handleCreateOrder}>
        <button className="xmark" onClick={() => {setCreating(false)}}>
          <img src={closeLogo} alt="X"/>
        </button>
        <h1>Создать заказ</h1>
        <input
          className="form__input create-order__input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          placeholder="Название"
          name="name">
        </input>
        <input
          className="form__input create-order__input"
          type="text"
          onChange={(e) => {
            setPayment(e.target.value)
          }}
          value={payment}
          placeholder="Оплата"
          name="payment">
        </input>
        <input
          className="form__submit create-order__submit"
          type="submit"
          disabled={(!name.trim() || !payment.trim() || checkPayment())}
          value="Создать"/>
      </form>
    </div>
  )
}