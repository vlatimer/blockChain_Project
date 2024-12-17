function OrderTransformer(orderStatus, paymentStatus){
  if(orderStatus === 0) {
    return 'Создан';
  }else if(orderStatus === 1) {
    return 'В работе';
  }else if(orderStatus === 2 && paymentStatus === 2) {
    return 'Завершен';
  }else if(orderStatus === 2) {
    return 'Выполнен';
  }
}

export function Status({ order }) {
  return (
    <p>Статус: <span>{OrderTransformer(order.orderStatus, order.paymentStatus)}</span></p>
  )
}