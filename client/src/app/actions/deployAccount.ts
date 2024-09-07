"use server";

import { ethers, toBigInt } from "ethers";
import { Account, cairo, Call, CallData, constants, Contract, EthSigner, hash, RpcProvider, stark, Uint256 } from "starknet";
import { ethAccountAbi, ethTokenAbi, resourceAbi } from "./abis";

const systemAccountPrivateKey = process.env.SYSTEM_ACCOUNT_PRIVATE_KEY as string;
const accountEthClassHash = '0x23e416842ca96b1f7067693892ed00881d97a4b0d9a4c793b75cb887944d98d';
const salt = '0x12345'; // or lower felt of public key X part

const amountToFund = 1 * 10 ** 16; // 0.01 ETH 


function getEthSigner(nHash: string) {
  const privateKeyETH = ethers.keccak256(nHash);
  return new EthSigner(privateKeyETH);
}

export async function precalculateETHAccountAddress(
  ethSigner: EthSigner
): Promise<string> {

  const ethFullPublicKey = await ethSigner.getPubKey();
  const myCallData = new CallData(ethAccountAbi);
  const accountETHconstructorCalldata = myCallData.compile('constructor', {
    public_key: ethFullPublicKey,
  });
  const contractETHaddress = hash.calculateContractAddressFromHash(
    salt,
    accountEthClassHash,
    accountETHconstructorCalldata,
    0
  );
  return contractETHaddress;
}

async function fundAccount(accountAddress: string) {
  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
  const systemSigner = new EthSigner(systemAccountPrivateKey);
  const systemAccountAddress = await precalculateETHAccountAddress(systemSigner);
  const txHash = await transferFunds(systemSigner, systemAccountAddress, accountAddress, amountToFund.toString());
  console.log("fundAccount txHash:", txHash);
  await provider.waitForTransaction(txHash);
}


async function transferFunds(myEthSigner: EthSigner, signerAccountAddress: string, toAddress: string, amount: string) {
  console.log("Transferring funds to:", toAddress, "amount:", amount);
  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
  const ethTokenContractAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
  const ethTokenContract = new Contract(ethTokenAbi, ethTokenContractAddress, provider);

  const transferCall: Call = ethTokenContract.populate('transfer', {
    recipient: toAddress,
    amount: amount,
  });

  const myEthAccount = new Account(provider, signerAccountAddress, myEthSigner);

  const { transaction_hash: transferTxHash } = await myEthAccount.execute(transferCall);
  // Wait for the invoke transaction to be accepted on Starknet
  console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
  await provider.waitForTransaction(transferTxHash);
  return transferTxHash;

}


export async function checkBalance(nHash: string) {

  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
  const ethSigner = getEthSigner(nHash);
  const myEthAccountAddressInStarknet = await precalculateETHAccountAddress(ethSigner);
  const ethTokenContract = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";


  const myEthAccount = new Account(provider, myEthAccountAddressInStarknet, ethSigner);
  console.log("myEthAccount:", myEthAccount.address);
  const accountContract = toBigInt(myEthAccount.address).toString();

  // Call the contract to get the account's balance
  const balanceCall: Call = {
    contractAddress: ethTokenContract,
    entrypoint: 'balanceOf',
    calldata: [ accountContract ],
  }
  const balanceResponse = await provider.callContract(balanceCall);
  console.log("balanceResponse:", balanceResponse);
  const balance = parseInt(balanceResponse[0].toString(), 16);
  console.log("balance:", balance);
  return balance.toString();

}

async function checkIfAccountIsDeployed(ethSigner: EthSigner) {
  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
  const address = await precalculateETHAccountAddress(ethSigner);
  const abstractWallet = new Contract(ethAccountAbi, address, provider);
  try {
    const publicKey = await abstractWallet.getPublicKey();
    return true;
  } catch (e) {
    return false;
  }
}


export async function deploySystemAccount(): Promise<string> {
  const ethSigner = new EthSigner(systemAccountPrivateKey);
  const isDeployed = await checkIfAccountIsDeployed(ethSigner);
  if (!isDeployed) {

    const contractETHaddress = await precalculateETHAccountAddress(ethSigner);
    console.log("contractETHaddress:", contractETHaddress);
    const ethFullPublicKey = await ethSigner.getPubKey();

    const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
    const myCallData = new CallData(ethAccountAbi);
    const accountETHconstructorCalldata = myCallData.compile('constructor', {
      public_key: ethFullPublicKey,
    });

    const ethAccount = new Account(myProvider, contractETHaddress, ethSigner);
    const deployPayload = {
      classHash: accountEthClassHash,
      constructorCalldata: accountETHconstructorCalldata,
      addressSalt: salt,
    };
    const { suggestedMaxFee: feeDeploy } = await ethAccount.estimateAccountDeployFee(deployPayload);
    const { transaction_hash, contract_address } = await ethAccount.deployAccount(
      deployPayload,
      { maxFee: stark.estimatedFeeToMaxFee(feeDeploy, 100) }
      // Extra fee to fund the validation of the transaction
    );
    await myProvider.waitForTransaction(transaction_hash);
      return contract_address;
  }
  return await precalculateETHAccountAddress(ethSigner);
}


export async function deployAccount(
  nHash: string
): Promise<string> {
  const ethSigner = getEthSigner(nHash);
  const isDeployed = await checkIfAccountIsDeployed(ethSigner);
  if (!isDeployed) {

    const contractETHaddress = await precalculateETHAccountAddress(ethSigner);
    await fundAccount(contractETHaddress);
    const ethFullPublicKey = await ethSigner.getPubKey();

    const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
    const myCallData = new CallData(ethAccountAbi);
    const accountETHconstructorCalldata = myCallData.compile('constructor', {
      public_key: ethFullPublicKey,
    });

    const ethAccount = new Account(myProvider, contractETHaddress, ethSigner);
    const deployPayload = {
      classHash: accountEthClassHash,
      constructorCalldata: accountETHconstructorCalldata,
      addressSalt: salt,
    };
    const { suggestedMaxFee: feeDeploy } = await ethAccount.estimateAccountDeployFee(deployPayload);
    const { transaction_hash, contract_address } = await ethAccount.deployAccount(
      deployPayload,
      { maxFee: stark.estimatedFeeToMaxFee(feeDeploy, 100) }
      // Extra fee to fund the validation of the transaction
    );
    await myProvider.waitForTransaction(transaction_hash);
      return contract_address;
  }
  return await precalculateETHAccountAddress(ethSigner);
}

export async function produceResource(resourceAddress: string, nHash: string) {
  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
  const ethSigner = getEthSigner(nHash);
  const signerAccountAddress = await precalculateETHAccountAddress(ethSigner);
  const contract = new Contract(resourceAbi, resourceAddress, provider);

  const transferCall: Call = contract.populate('mint', {
    recipient: signerAccountAddress,
    amount: 1,
  });

  const myEthAccount = new Account(provider, signerAccountAddress, ethSigner);

  const { transaction_hash: transferTxHash } = await myEthAccount.execute(transferCall);
  // Wait for the invoke transaction to be accepted on Starknet
  console.log(`Waiting for Tx: ${transferTxHash} to be Accepted on Starknet - Transfer...`);
  await provider.waitForTransaction(transferTxHash);
  return transferTxHash;
}

export async function getResourceBalance(resourceAddress: string, nHash: string) {
  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
  const ethSigner = getEthSigner(nHash);
  const signerAccountAddress = await precalculateETHAccountAddress(ethSigner);
  const contract = new Contract(resourceAbi, resourceAddress, provider);
  const balance = await contract.balanceOf(signerAccountAddress);
  return balance;
}

