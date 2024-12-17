const { Web3 } = require('web3');
// import { Web3 } from 'web3'
// import path from 'path'
// import fs from 'fs'
const path = require('path');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:7545/');

const bytecodePath = path.join('contract', 'build', 'contract_myContract_sol_Freelance.bin');
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

const abi = JSON.parse(fs.readFileSync("./contract/build/contract_myContract_sol_Freelance.abi"));
const myContract = new web3.eth.Contract(abi);
myContract.handleRevert = true;

async function deploy() {
	const providersAccounts = await web3.eth.getAccounts();

	const defaultAccount = providersAccounts[0];
	console.log('Deployer account:', defaultAccount);

	const adressesPath = path.join('auth.json');
	const accounts = (providersAccounts.map((account) => {
		return {
			account: account,
			username: '',
			password: '',
		}
	}).filter((a) => a.account !== defaultAccount));
	
	fs.writeFileSync(adressesPath, JSON.stringify(accounts, null, 2));

	const contractDeployer = myContract.deploy({
		data: '0x' + bytecode,
	});

	const gas = await contractDeployer.estimateGas({
		from: defaultAccount,
	});
	console.log('Estimated gas:', gas);

	try {
		const tx = await contractDeployer.send({
			from: defaultAccount,
			gas,
			gasPrice: 10000000000,
		});
		console.log('Contract deployed at address: ' + tx.options.address);

		const deployedAddressPath = path.join('MyContractAddress.json');
		fs.writeFileSync(deployedAddressPath, JSON.stringify({
			contractAdddress: tx.options.address,
			deployer: defaultAccount,
		}, null, 2));
    return tx.options.address;

    
	} catch (error) {
		console.error(error);
	}
}

deploy();