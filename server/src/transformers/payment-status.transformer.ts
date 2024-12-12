import { PaymentStatus } from "../interfaces/contract.interfaces.js";

export class PaymentStatusTransformer {
  static from(index: BigInt): PaymentStatus {
    switch(index){
      case 0n:
        return PaymentStatus.Unpaid;
      case 1n:
        return PaymentStatus.Paid;
      case 2n:
        return PaymentStatus.Received;
      default:
        throw Error("Unknown payment status");
    }
  }
}