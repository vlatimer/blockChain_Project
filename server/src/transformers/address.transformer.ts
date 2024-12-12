import fs from 'fs';
import { IUser } from '../interfaces/user.interface.js';

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000"
const DEPLOYER = JSON.parse(fs.readFileSync("./MyContractAddress.json", 'utf8')).deployer;

export class AddressTransformer {
  static from(address: string): IUser{
    if(address === NULL_ADDRESS){
      return {
        publicKey: null,
        name: null,
      }
    }

    if(address === DEPLOYER){
      return {
        publicKey: address,
        name: "DEPLOYER",
      }
    }

    const ACCOUNTS = JSON.parse(fs.readFileSync('./auth.json', 'utf8'));

    const record = ACCOUNTS.find(u => u.account === address);
    if(!record){
      throw new Error('Unknown user');
    }

    return {
      publicKey: address,
      name: record.username,
    }

  }
}