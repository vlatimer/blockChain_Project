import { Token } from "../../token/token";

export function Cost({ order }){
  return (
    <p className="modal-order__cost">Оплата за услугу: <strong>{order.payment}</strong> <Token/></p>
  )
}