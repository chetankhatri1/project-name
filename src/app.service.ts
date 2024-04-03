import { Injectable } from '@nestjs/common';
import { createPublicClient, http, formatEther } from 'viem'
import * as chains from 'viem/chains'
import * as tokenJson from './assets/MyToken.json';


@Injectable()
export class AppService {
  publicClient;

  constructor(private configService: ConfigService) {
    this.publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
    });
  }

  getTokenBalance(address: string) {
    throw new Error('Method not implemented.');
  }
  getTransactionReceipt(hash: string) {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }

getContractAddress(): string {
  return "0x2282A77eC5577365333fc71adE0b4154e25Bb2fa";
  } 

  async getTokenName(): Promise<any> {
    const publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: http(process.env.RPC_ENDPOINT_URL),
    });
    const name = await publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: "name"
    });
    return name;
  }

  async getTotalSupply(){
    const publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: http(process.env.RPC_ENDPOINT_URL),
    });
    const totalSupply = await publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: "totalSupply"
    });
    return formatEther(totalSupply as bigint);
  }

}
