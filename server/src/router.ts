import fs from 'fs';
import express, {Request, Response} from 'express'
import { Web3 } from 'web3'
import { ContractParams } from './interfaces/contract.utils.js';
import { acceptOrder, balanceOf, buyTokens, completeOrder, createOrder, deleteOrder, getOrderById, getOrders, submitOrder } from './controller.js';
import path from 'path';

const contractAddress = JSON.parse(fs.readFileSync("./MyContractAddress.json", 'utf8')).contractAdddress;
const data = fs.readFileSync("./contract/build/contract_myContract_sol_Freelance.abi", 'utf8')
const abi = JSON.parse(data);

const provider = new Web3("ws://127.0.0.1:7545/");

const contractData: ContractParams = {
  provider: provider,
  contract: new provider.eth.Contract(abi, contractAddress),
}

const router = express.Router();

router.post('/buy', async (req: Request, res: Response) => {
  const obj = {
    from: req.body.from,
    amount: {
      value: req.body.amount.value,
      type: req.body.amount.type
    }
  }

  const response = await buyTokens(contractData, obj)
  console.log(`LOG ${response.status}: Buy tokens from ${req.body.from}`);

  res.status(200).json(response);
})

router.post('/order', async (req: Request, res: Response) => {
  const obj = {
    from: req.body.from,
    arguments: {
      name: req.body.arguments.name,
      payment: req.body.arguments.payment,
    }
  };

  const response = await createOrder(contractData, obj)
  console.log(`LOG ${response.status}: Create order from ${req.body.from}`);

  res.status(200).json(response);
})

router.post('/accept/:id', async (req: Request, res: Response) => {
  const obj = {
    from: req.body.from,
    arguments: {
      orderId: req.params.id
    }
  };

  const response = await acceptOrder(contractData, obj)
  console.log(`LOG ${response.status}: Accept order from ${req.body.from}`);

  res.status(200).json(response);
})

router.post('/complete/:id', async (req: Request, res: Response) => {
  const obj = {
    from: req.body.from,
    arguments: {
      orderId: req.params.id
    }
  };

  const response = await completeOrder(contractData, obj)
  console.log(`LOG ${response.status}: Complete order from ${req.body.from}`);

  res.status(200).json(response);
})

router.post('/submit/:id', async (req: Request, res: Response) => {
  const obj = {
    from: req.body.from,
    arguments: {
      orderId: req.params.id
    }
  };

  const response = await submitOrder(contractData, obj)
  console.log(`LOG ${response.status}: Submit order from ${req.body.from}`);

  res.status(200).json(response);
})

router.delete('/order/:id', async (req: Request, res: Response) => {
  const obj = {
    from: req.body.from,
    arguments: {
      orderId: req.params.id
    }
  };

  const response = await deleteOrder(contractData, obj)
  console.log(`LOG ${response.status}: Delete order from ${req.body.from}`);

  res.status(200).json(response);
})

router.get('/balance', async (req: Request, res: Response) => {
  const account = req.body.account;

  const response = await balanceOf(contractData, account)
  console.log(`LOG ${response.status}: Balanceof from ${account}`);

  res.status(200).json(response);
})

router.get('/order/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  const response = await getOrderById(contractData, id)
  console.log(`LOG ${response.status}: Get order by id`);

  res.status(200).json(response);
})

router.get('/orders', async (req: Request, res: Response) => {
  const response = await getOrders(contractData)
  console.log(`LOG ${response.status}: Get orders`);
  
  if(req.query.filter === "creator"){
    response.response = response.response.filter((o) => o.creator.publicKey === req.query.account)
  } else if(req.query.filter === "employee"){
    response.response = response.response.filter((o) => o.employee.publicKey === req.query.account)
  }

  res.status(200).json(response);
})

router.get('/auth/:name', async (req: Request, res: Response) => {
  try {
    console.log(`LOG: Trying to find user: ${req.params.name}`);
    const ACCOUNTS = JSON.parse(fs.readFileSync('./auth.json', 'utf8'));
    for(let i = 0;i < ACCOUNTS.length; i++){
      if(ACCOUNTS[i].username === req.params.name){
        res.status(200).json({
          status: 'found',
          data: {
            publicKey: ACCOUNTS[i].account,
            name: ACCOUNTS[i].username,
          },
        })
        console.log(`LOG: Found`);
        return;
      }
    }
    res.status(200).json({
      status: 'not found',
      data: {},
    })
    console.log(`LOG: Not found`);

  } catch(error) {
    console.log(error);
    res.status(500);
  }
})

router.post('/auth', async (req: Request, res: Response) => {
  try {
    const ACCOUNTS = JSON.parse(fs.readFileSync('./auth.json', 'utf8'));
    const username = req.body.login;

    console.log(`LOG: Trying to create user: ${username}`);

    for(let i = 0;i < ACCOUNTS.length; i++){
      if(!ACCOUNTS[i].username){
        ACCOUNTS[i].username = username;
        res.status(200).json({
          status: 'written',
          data: {
            publicKey: ACCOUNTS[i].account,
            name: ACCOUNTS[i].username,
          },
        })
        fs.writeFileSync(path.join('auth.json'), JSON.stringify(ACCOUNTS, null, 2));
        console.log(`LOG: Successful`);
        return;
      }
    }
    res.status(500).json({
      status: 'storage is full',
      data: {},
    })
    console.log(`LOG: Unseccessful`);

  } catch(error) {
    console.log(error);
    res.status(500);
  }
})

router.all('*', async (req: Request, res: Response) => {
  res.status(404).json({
    message: `No url like this ${req.originalUrl}`
  })
})

export default router;