export function Order({ order, dispatch, isMy }) {
  const { name, payment } = order;

  return (
    <div className="order__box">
      <div className="order__ui">
        <h2>{name}</h2>
        <p>Оплата за услугу: <span>{payment}</span>TKN</p>
      </div>
        <button className={!isMy ? 'order__submit' : 'order__my'}>
          {
            isMy ?
            "Ваш заказ" :
            "Принять заказ"
          }
        </button>
    </div>
  )
}