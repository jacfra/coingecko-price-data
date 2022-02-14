export interface IBlockFrostService {
  blocksLatest(): Promise<{ height: number; hash: string }>;
}
