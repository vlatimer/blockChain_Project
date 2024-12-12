const fs = require("fs");
const { Web3 } = require("web3");

const provider = new Web3("http://127.0.0.1:7545/");
const contractAddress = String(fs.readFileSync("../MyContractAddress.txt"));
const abi = JSON.parse(
fs.readFileSync("contract/build/contract_myContract_sol_Freelance.abi")
);
console.log(contractAddress);

async function getBalanceOf(address) {
	const myContract = new provider.eth.Contract(abi, contractAddress);

	const result = await myContract.methods.balanceOf(address).call();
	console.log(result);
}

async function main() {
	const web3 = new Web3("http://127.0.0.1:7545/");

	// create a new Web3.js account object with the private key of a Hardhat test account
	// const privateKey = "0xcc156d10446acd3271129f94338d75fedca40fe656806b5078853214fcbbe155";
	// const privateKey1 = "0xd7f1aed762e8340ca5f4c423601eab6c421e00ea5cc82d2dcac801f9f863e11a";
	// // the account is created with a wallet, which makes it easier to use
	// web3.eth.accounts.wallet.add(privateKey);
	// const test = web3.eth.accounts.wallet.add(privateKey1);
	// const sender = test[0];
	// const receiver = test[1];

	const myContract = new web3.eth.Contract(abi, contractAddress);

	const transaction = await myContract.methods.buyTokens().send({
		from: "0x31D19139E72C15Ea1FcFB36f476FE6DCcCc39d75",
		value: web3.utils.toWei("1", "ether"),
		// gas: 2000000, // Максимальный лимит газа
		// gasPrice: await web3.eth.getGasPrice(), // Получите текущую цену газа
	});

	// await getBalanceOf(sender.address);

	console.log(transaction);
	// generate a new random Web3.js account object to receive the transaction
	// const receiver = web3.eth.accounts;

	//log initial balances
	// console.log(
	// "Initial sender balance:",
	// // account balance in wei
	// await web3.eth.getBalance(sender.address)
	// );
	// console.log(
	// "Initial receiver balance:",
	// // account balance in wei
	// await web3.eth.getBalance(receiver.address)
	// );

	// // sign and send the transaction
	// const receipt = await web3.eth.sendTransaction({
	// from: sender.address,
	// to: receiver.address,
	// value: web3.utils.toWei("10", "ether"),
	// });

	// // log transaction receipt
	// console.log(receipt);

	// // log final balances
	// console.log(
	// "Final sender balance:",
	// await web3.eth.getBalance(sender.address)
	// );
	// console.log(
	// "Final receiver balance:",
	// await web3.eth.getBalance(receiver.address)
	// );
}

main();

// getBalanceOf("0x687A54400fE009E12fBf134df766C6D196B9A2BF");
