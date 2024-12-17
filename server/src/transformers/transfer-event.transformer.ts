import { ITransferEvent } from "../interfaces/transfer-event.interface.js";
import { AddressTransformer } from "./address.transformer.js";

export class TransferTransformer {
  static from(event: any): ITransferEvent {
    return {
      from: AddressTransformer.from(event.from),
      to: AddressTransformer.from(event.to),
      amount: event.amount,
    }
  }
}