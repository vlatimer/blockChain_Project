import { getRevertError } from "./helpers/revert-handler.js";
import { IAcceptOrder, IBuyToken, ICompleteOrder, ICreateOrder, IDeleteOrder, ISubmitOrder } from "./interfaces/contract-methods.interfaces.js";
import { ContractParams, Payable, Transaction } from "./interfaces/contract.utils.js";
import { OrderTransformer } from "./transformers/order.transformer.js";
import { TransferTransformer } from "./transformers/transfer-event.transformer.js";

export async function buyTokens(contractData: ContractParams, data: Payable<IBuyToken>): Promise<any> {
  const contract = contractData.contract;
  const provider = contractData.provider;

  try {
    const transaction = await contract.methods.buyTokens()
    .send({
      from: data.from,
      value: provider.utils.toWei(data.amount.value, data.amount.type),
    });

    const balance = await balanceOf(contractData, data.from);

    return {
      status: 'success',
      response: balance.response,
    }
  }catch (error) {
    return getRevertError(error);
  }

}

export async function createOrder(contractData: ContractParams, data: Transaction<ICreateOrder>): Promise<any> {
  const contract = contractData.contract;
  try {
    const transaction = await contract.methods.createOrder(data.arguments.name, data.arguments.payment)
    .send({
      from: data.from,
      gas: 300000,
    });

    return {
      status: 'success',
      response: {
        order: OrderTransformer.from(transaction.events.CreateOrderEvent.returnValues),
        transfer: TransferTransformer.from(transaction.events.SaveTokenTransaction.returnValues),
      },
    }
  } catch(error) {
    return getRevertError(error);
  }
}

export async function acceptOrder(contractData: ContractParams, data: Transaction<IAcceptOrder>): Promise<any> {
  const contract = contractData.contract;
  try {
    const transaction = await contract.methods.acceptOrder(data.arguments.orderId)
    .send({
      from: data.from,
      gas: 300000,
    });
  
    return {
      status: 'success',
      response: OrderTransformer.from(transaction.events.UpdateOrderEvent.returnValues),
    }
  } catch(error){
    return getRevertError(error);
  }
}

export async function completeOrder(contractData: ContractParams, data: Transaction<ICompleteOrder>): Promise<any> {
  const contract = contractData.contract;
  try { 
    const transaction = await contract.methods.completeOrder(data.arguments.orderId)
    .send({
      from: data.from,
      gas: 300000,
    });
  
    return {
      status: 'success',
      response: OrderTransformer.from(transaction.events.UpdateOrderEvent.returnValues),
    }
  } catch(error) {
    return getRevertError(error);
  }
}

export async function submitOrder(contractData: ContractParams, data: Transaction<ISubmitOrder>): Promise<any> {
  const contract = contractData.contract;
  try {
    const transaction = await contract.methods.submitOrder(data.arguments.orderId)
    .send({
      from: data.from,
      gas: 300000,
    });
  
    return {
      status: 'success',
      response: OrderTransformer.from(transaction.events.UpdateOrderEvent.returnValues),
    }
  } catch(error) {
    return getRevertError(error);
  }
}

export async function deleteOrder(contractData: ContractParams, data: Transaction<IDeleteOrder>): Promise<any> {
  const contract = contractData.contract;
  try {
    const transaction = await contract.methods.deleteOrder(data.arguments.orderId)
    .send({
      from: data.from,
      gas: 300000,
    });
  
    return {
      status: 'success',
      response: transaction,
    }
  } catch(error) {
    return getRevertError(error);
  }
}

export async function balanceOf(contractData: ContractParams, account: string): Promise<any> {
  const contract = contractData.contract;
  try {
    const response = await contract.methods.balanceOf(account).call();

    return {
      status: 'success',
      response: response,
    }
  } catch(error) {
    return getRevertError(error);
  }
}

export async function getOrderById(contractData: ContractParams, id: number): Promise<any> {
  const contract = contractData.contract;
  try {
    const response = await contract.methods.store(id).call();
  
    return {
      status: 'success',
      response: response,
    }
  } catch(error) {
    return getRevertError(error);
  }
}

export async function getOrders(contractData: ContractParams): Promise<any> {
  const contract = contractData.contract;
  try {
    const id = await contract.methods.currentId().call();
    const orders = [];

    for(let i = 1; i < id;i++){
      const response = await contract.methods.store(i).call();
      orders.push(OrderTransformer.from(response));
    }

    return {
      status: 'success',
      response: orders,
    }
  } catch(error) {
    console.log(error)
  }
}

export async function getTransfers(contractData: ContractParams): Promise<any> {
  const contract = contractData.contract;
  try {
    const id = await contract.methods.ticketsId().call();
    const tickets = [];

    for(let i = 1; i < id; i++){
      const response = await contract.methods.tickets(i).call();
      tickets.push(TransferTransformer.from(response));
    }

    return {
      status: 'success',
      response: tickets,
    }
  } catch(error) {
    console.log(error)
  }
}