import { useCallback, useRef, useState } from "react";
import { getFormData } from '../../helper';
import { ADD_ORDER, ADD_TRANSFER } from "../../reducer";
import closeLogo from '../../../images/close.png'


export function CreateOrder({ store, auth, dispatch, setCreating }){
  const form = useRef();
  const [name, setName] = useState('');
  const [payment, setPayment] = useState('');

  const createOrder = useCallback(async (e) => {
    e.preventDefault();

    const obj = {
      from: auth.publicKey,
      arguments: {
        ...getFormData(e),
      }
    }

    try {

      const response = await fetch(`http://localhost:8080/api/order`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
      const data = await response.json();
      
      if(data.status === "success"){
        dispatch({ type: ADD_ORDER, payload: data.response.order})
        dispatch({ type: ADD_TRANSFER, payload: data.response.transfer})
      }

    } catch(error){
      console.error('Failed to fetch');
    }finally{
      setCreating(false);
    }
  }, [form, auth, dispatch, setCreating]);

  const checkPayment = useCallback(() => {
    if(isNaN(parseInt(payment, 10))){
      return true;
    }
    return false;
  }, [payment])

  return (
    <div className="create-order__box">
      <form className="create-order__form" ref={form} onSubmit={createOrder}>
        <button className="xmark" onClick={() => {setCreating(false)}}>
          <img src={closeLogo}/>
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