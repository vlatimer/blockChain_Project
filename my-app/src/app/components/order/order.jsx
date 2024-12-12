export function Order({ order, dispatch }) {
  const { name, payment } = order;

  return (
    <div className="order__box">
      <div className="order__ui">
        <h2>{name}</h2>
        <p>Оплата за услугу: <span>{payment}</span>TKN</p>
      </div>
      <button className='order__submit'>Принять заказ</button>
    </div>
  )
}