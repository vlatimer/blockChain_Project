import { IOrder } from "../interfaces/order.interface.js";
import { AddressTransformer } from "./address.transformer.js";
import { OrderStatusTransformer } from "./order-status.transformer.js"; 
import { PaymentStatusTransformer } from "./payment-status.transformer.js";

export class OrderTransformer {
  static from(order: any): IOrder {

    return {
      id: order.id,
      name: order.name,
      creator: AddressTransformer.from(order.creator),
      payment: order.payment,
      orderStatus: OrderStatusTransformer.from(order.orderStatus),
      paymentStatus: PaymentStatusTransformer.from(order.orderStatus),
      employee: AddressTransformer.from(order.employee.addr)
    }
  }
}