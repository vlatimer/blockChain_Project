export interface IBuyToken {}

export interface ICreateOrder {
  name: string;
  payment: number | BigInt;
}

export interface IAcceptOrder {
  orderId: number;
}

export interface ICompleteOrder {
  orderId: number;
} 

export interface ISubmitOrder {
  orderId: number;
}

export interface IDeleteOrder {
  orderId: number;
}