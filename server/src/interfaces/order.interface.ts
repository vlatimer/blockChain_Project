import { OrderStatus, PaymentStatus } from "./contract.interfaces.js";
import { IUser } from "./user.interface.js";

export interface IOrder {
  id: number;
  name: string;
  creator: IUser;
  payment: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  employee: IUser
}