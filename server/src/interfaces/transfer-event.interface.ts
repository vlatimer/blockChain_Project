import { IUser } from "./user.interface.js";

export interface ITransferEvent {
  from: IUser;
  to: IUser;
  amount: number;
}