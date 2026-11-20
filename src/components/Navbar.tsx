'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { Disc3 } from 'lucide-react';

export function Navbar() {
  const { address, isConnected, chain } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  const handleWalletClick = () => {
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }
    if (chain?.id !== baseSepolia.id) {
      switchChain({ chainId: baseSepolia.id });
      return;
    }
    disconnect();
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-7 flex items-center justify-between relative z-20">
      {/* Brand Logo: floppy */}
      <a href="#" className="flex items-center gap-2.5 group">
        <span className="w-6 h-6 bg-[#0A0A0A] text-white flex items-center justify-center rounded-[2px]">
          <Disc3 className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        </span>
        <span className="text-xl font-bold tracking-tight text-[#0A0A0A]">
          floppy
        </span>
      </a>

      {/* Center Nav */}
      <nav className="hidden md:flex items-center gap-8 font-[family-name:var(--font-mono)] text-xs font-bold tracking-[0.14em] uppercase text-[#0A0A0A]">
        <a href="#explore" className="hover:opacity-60 transition-opacity">
          Explore
        </a>
        <a href="#community" className="hover:opacity-60 transition-opacity">
          Community
        </a>
        <a href="#mint" className="hover:opacity-60 transition-opacity">
          Pages
        </a>
      </nav>

      {/* Sharp CTA Button: CONNECT WALLET */}
      <button
        onClick={handleWalletClick}
        disabled={isPending}
        className="bg-[#0A0A0A] text-white font-[family-name:var(--font-mono)] text-xs font-bold tracking-[0.12em] uppercase px-5 py-3 rounded-none hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer"
      >
        {isPending
          ? 'CONNECTING...'
          : !isConnected
          ? 'CONNECT WALLET'
          : chain?.id !== baseSepolia.id
          ? 'SWITCH TO BASE'
          : shortAddress}
      </button>
    </header>
  );
}
