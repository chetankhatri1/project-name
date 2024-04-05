import { Injectable } from '@nestjs/common';
import { createPublicClient, http, formatEther } from 'viem'
import * as chains from 'viem/chains'
import * as tokenJson from './assets/MyToken.json';


@Injectable()
export class AppService {

  publicClient;

  constructor() {
    this.publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: http(
        process.env.RPC_ENDPOINT_URL,
        ),
    });
  }


  getServerWalletAddress() {
    throw new Error('Method not implemented.');
  }
  checkMinterRole(address: string) {
    throw new Error('Method not implemented.');
  }
  mintTokens(address: any) {
    throw new Error('Method not implemented.');
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

  async getTokenBalance(): Promise<any> {
    const tokenBalance = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: "tokenBalance"
    });
    return tokenBalance;
  }


  getTransactionReceipt(hash: string) {
    throw new Error('Method not implemented.');
  }

}
