'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { FLOPPY_ABI, FLOPPY_CONTRACT_ADDRESS } from '@/lib/web3';

const PARTNERS = [
  { name: 'Blockport', icon: '◎' },
  { name: 'DigiFinex', icon: 'Ð' },
  { name: 'CoinEx', icon: '©' },
  { name: 'BINANCE', icon: '❖' },
];

export default function HomePage() {
  const { isConnected } = useAccount();
  const [tokenUri, setTokenUri] = useState('ipfs://QmExampleFloppyMetadataHash');

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;
    writeContract({
      address: FLOPPY_CONTRACT_ADDRESS,
      abi: FLOPPY_ABI,
      functionName: 'mintArt',
      args: [tokenUri],
      value: parseEther('0.001'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative z-10">
      <Navbar />

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-20 text-center">
        <h1 className="font-[family-name:var(--font-pixel)] uppercase text-[#0A0A0A] leading-[0.88] tracking-tight select-none">
          <span className="block text-[clamp(3.8rem,11vw,9.5rem)]">
            COLLECT
          </span>
          <span className="block text-[clamp(3.8rem,11vw,9.5rem)]">
            UNI
            <span className="relative inline-block">
              {/* Lingkaran gradien di dalam huruf Q */}
              <span
                aria-hidden="true"
                className="q-aura-orb absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[52%] h-[46%] rounded-full -z-10 animate-pulse"
              />
              Q
            </span>
            UE
          </span>
        </h1>

        <p className="mt-8 font-[family-name:var(--font-mono)] text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#0A0A0A]">
          CREATE, EXPLORE, &amp; COLLECT DIGITAL ART NFTS
        </p>

        {/* TRUST / PARTNER STRIP */}
        <div className="mt-20 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center text-[#0A0A0A] opacity-90">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2 font-bold text-lg tracking-tight"
            >
              <span className="text-xl">{partner.icon}</span>
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </main>

      {/* BELOW THE FOLD: QUICK MINT STUDIO */}
      <section
        id="mint"
        className="w-full max-w-3xl mx-auto px-6 pb-24 pt-12 border-t border-black/15"
      >
        <div className="bg-white/75 backdrop-blur-sm border border-[#0A0A0A] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[family-name:var(--font-pixel)] text-2xl md:text-3xl uppercase">
              Quick Mint Studio
            </h2>
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase bg-black text-white px-2.5 py-1">
              0.001 ETH · Base Sepolia
            </span>
          </div>

          <form onSubmit={handleMint} className="space-y-4">
            <div>
              <label className="block font-[family-name:var(--font-mono)] text-xs uppercase font-bold mb-2">
                IPFS Metadata URI
              </label>
              <input
                type="text"
                value={tokenUri}
                onChange={(e) => setTokenUri(e.target.value)}
                className="w-full border border-[#0A0A0A] bg-transparent px-4 py-3 font-[family-name:var(--font-mono)] text-xs focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="ipfs://..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isConnected || isPending || isConfirming}
              className="w-full bg-[#0A0A0A] text-white font-[family-name:var(--font-mono)] text-xs font-bold tracking-[0.15em] uppercase py-3.5 hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer"
            >
              {!isConnected
                ? 'CONNECT WALLET FIRST'
                : isPending
                ? 'CONFIRM IN WALLET...'
                : isConfirming
                ? 'MINTING ON-CHAIN...'
                : 'MINT DIGITAL ART NFT'}
            </button>

            {isSuccess && hash && (
              <p className="font-[family-name:var(--font-mono)] text-xs text-emerald-700 pt-2 break-all">
                Minted! Tx Hash: {hash}
              </p>
            )}
            {error && (
              <p className="font-[family-name:var(--font-mono)] text-xs text-red-600 pt-2">
                {error.message.slice(0, 120)}...
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
