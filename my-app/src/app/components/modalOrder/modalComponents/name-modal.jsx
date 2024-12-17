export function Creator({ order }){
  return (
    <p>Создатель: <span>{order.creator.name}</span></p>
  )
}