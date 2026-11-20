import { http, createConfig } from 'wagmi';
import { baseSepolia, base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [baseSepolia, base],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
  ssr: false,
});

export const FLOPPY_CONTRACT_ADDRESS = (
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  '0x0000000000000000000000000000000000000000'
) as `0x${string}`;

export const FLOPPY_ABI = [
  {
    name: 'mintArt',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'uri', type: 'string' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'mintPrice',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;
