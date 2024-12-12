import { ITransferEvent } from "../interfaces/transfer-event.interface.js";
import { AddressTransformer } from "./address.transformer.js";

export class TransferEventTransformer {
  static from(event: any): ITransferEvent {
    return {
      from: AddressTransformer.from(event.from),
      to: AddressTransformer.from(event.from),
      amount: event.amount,
    }
  }
}