export const ADD_ORDER = "ADD_ORDER";
export const ADD_TRANSFER = "ADD_TRANSFER";
export const UPLOAD_ORDERS = "UPLOAD_ORDERS";
export const UPDATE_ORDER = "UPDATE_ORDER";

export const todoReducer = (state, action) => {
  switch(action.type){
    case ADD_ORDER:
      return {
        orders: state.orders.concat(
          {
            id: action.payload.id,
            name: action.payload.name,
            payment: action.payload.payment,
            creator: action.payload.creator,
            orderStatus: action.payload.orderStatus,
            paymentStatus: action.payload.paymentStatus,
            employee: action.payload.employee,
          }
        ),
        transfers: state.transfers,
      }
    case ADD_TRANSFER:
      return {
        orders: state.orders,
        transfers: state.transfers.concat({
          from: action.payload.from,
          to: action.payload.to,
          amount: action.payload.amount,
        }),
      }
    case UPLOAD_ORDERS:
      return {
        orders: action.payload,
        transfers: state.transfers,
      }
    case UPDATE_ORDER:
      return {
        orders: state.orders.map((order) => {
          if(order.id === action.payload.id){
            return action.payload;
          }
          return order;
        }),
        transfers: state.transfers,
      }
  }
}