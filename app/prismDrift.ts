// app/prismDrift.ts
import React, { useMemo, useState } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { Connected } from "@coinbase/onchainkit/connected";
import { createPublicClient, http, formatEther, type Address } from "viem";
import { base, baseSepolia } from "viem/chains";

type Network = "base" | "baseSepolia";

const CHAIN_ID = {
  base: 8453,
  baseSepolia: 84532,
};

const RPC = {
  base: "https://mainnet.base.org",
  baseSepolia: "https://sepolia.base.org",
};

const EXPLORER = {
  base: "https://basescan.org",
  baseSepolia: "https://sepolia.basescan.org",
};

function isAddress(v: string): v is Address {
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim());
}

export default function PrismDrift() {
  const [network, setNetwork] = useState<Network>("baseSepolia");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Idle");
  const [rpcChainId, setRpcChainId] = useState<number | null>(null);
  const [latestBlock, setLatestBlock] = useState<bigint | null>(null);
  const [nativeBalance, setNativeBalance] = useState<bigint | null>(null);

  const chain = network === "base" ? base : baseSepolia;

  const client = useMemo(
    () =>
      createPublicClient({
        chain,
        transport: http(RPC[network]),
      }),
    [chain, network]
  );

  async function pulse() {
    setStatus("Polling Base RPC…");

    const [cid, bn] = await Promise.all([client.getChainId(), client.getBlockNumber()]);
    setRpcChainId(cid);
    setLatestBlock(bn);

    if (isAddress(address)) {
      const bal = await client.getBalance({ address });
      setNativeBalance(bal);
    } else {
      setNativeBalance(null);
    }

    setStatus("Done");
  }

  return (
    <OnchainKitProvider chain={chain}>
      <div style={{ maxWidth: 900, margin: "44px auto", fontFamily: "system-ui", lineHeight: 1.45 }}>
        <h1 style={{ marginBottom: 6 }}>PrismDrift — Built for Base</h1>
        <div style={{ opacity: 0.8, marginBottom: 14 }}>
          A minimal Base probe: OnchainKit wallet UX + Viem reads (chainId, block height, ETH balance).
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <label>
            Network:&nbsp;
            <select value={network} onChange={(e) => setNetwork(e.target.value as Network)}>
              <option value="baseSepolia">Base Sepolia (84532)</option>
              <option value="base">Base Mainnet (8453)</option>
            </select>
          </label>

          <button onClick={pulse} style={{ padding: "6px 12px" }}>
            Run Probe
          </button>

          <div>
            Status:&nbsp;<strong>{status}</strong>
          </div>
        </div>

        <div style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <Wallet />
          <Connected>
            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 8 }}>Address to read balance from:</div>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x…"
                style={{ width: "100%", padding: 8 }}
              />
            </div>
          </Connected>
        </div>

        <div style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <h2 style={{ marginTop: 0 }}>Results</h2>
          <div>Expected chainId: {CHAIN_ID[network]}</div>
          <div>RPC chainId: {rpcChainId ?? "—"}</div>
          <div>Latest block: {latestBlock ? latestBlock.toString() : "—"}</div>
          <div>Native balance: {nativeBalance ? `${formatEther(nativeBalance)} ETH` : "—"}</div>
          <div style={{ marginTop: 10 }}>Explorer: {EXPLORER[network]}</div>
        </div>
      </div>
    </OnchainKitProvider>
  );
}
