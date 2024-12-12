import { OrderStatus } from "../interfaces/contract.interfaces.js";

export class OrderStatusTransformer {
  static from(index: BigInt): OrderStatus {
    switch(index){
      case 0n:
        return OrderStatus.Open;
      case 1n:
        return OrderStatus.Processing;
      case 2n:
        return OrderStatus.Done;
      default:
        throw Error("Unknown order status");
    }
  }
}