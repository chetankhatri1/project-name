import { Injectable } from '@nestjs/common';
import { createPublicClient, createWalletClient, http, formatEther } from 'viem'
import * as chains from 'viem/chains'
import * as tokenJson from './assets/MyToken.json';


@Injectable()
export class AppService {
  publicClient;
  walletClient;

  constructor() {
    this.publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: http(
        process.env.RPC_ENDPOINT_URL,
        ),
    });

    this.walletClient = createWalletClient({
      chain: chains.sepolia,
      transport: http(
        process.env.RPC_ENDPOINT_URL,
        ),
        key: process.env.PRIVATE_KEY,
    });
    
  }

  getHello(): string {
    return 'Hello World!';
  }

  getContractAddress(): string {
  return process.env.TOKEN_ADDRESS;
  } 


  async getTokenName(): Promise<any> {
    const name = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: "name"
    });
    return name;
  }

  async getTotalSupply(){
    const totalSupply = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: "totalSupply"
    });
    return formatEther(totalSupply as bigint);
  }

  async getTokenBalance(address: string) {
    const tokenBalance = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: `balanceOf`,
      args: [address],
    });
    return formatEther(tokenBalance as bigint);
  }


  async getTransactionReceipt(hash: string) {
    const transactionReceipt = await this.publicClient.getTransactionReceipt({hash});
    console.log({transactionReceipt});
    transactionReceipt.blockNumber = transactionReceipt.blockNumber.toString();
    transactionReceipt.gasUsed = transactionReceipt.gasUsed.toString();
    transactionReceipt.cumulativeGasUsed = transactionReceipt.cumulativeGasUsed.toString();
    transactionReceipt.effectiveGasPrice = transactionReceipt.effectiveGasPrice.toString();
    return transactionReceipt;
  }


  async getServerWalletAddress() {
    const addresses = await this.walletClient.getAddresses();
    return addresses;
  }



  checkMinterRole(address: string) {
    throw new Error('Method not implemented.');
  }



  mintTokens(address: any) {
    
    return `minting tokens to ${address}`
  }



}
