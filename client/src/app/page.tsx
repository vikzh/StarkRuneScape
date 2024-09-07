"use client";

import { useState, useEffect, useRef } from 'react';
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "./actions/verify";
import { checkBalance, deployAccount, deploySystemAccount, getResourceBalance, produceResource } from "./actions/deployAccount";
import { motion } from 'framer-motion';

export default function Home() {
  const [nullifierHash, setNullifierHash] = useState<string | null>(null);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [accountBalance, setAccountBalance] = useState<string | null>(null);
  const [transferStatus, setTransferStatus] = useState('');
  const [cuttingInfo, setCuttingInfo] = useState('Information about your cutting actions will display here.');
  const [activeTree, setActiveTree] = useState<number | null>(null);
  const [isProducing, setIsProducing] = useState(false);
  const [treesCut, setTreesCut] = useState<string | null>(null);
  const [produceStatus, setProduceStatus] = useState('');
  const woodAddress = '0x05c911152dbfc068e93892fd795f51b4c0fc437f4ea93d5d913edb892fb2cb01';

  const fetchTreesCut = async () => {
    if (nullifierHash && woodAddress) {
      const balance = await getResourceBalance(woodAddress, nullifierHash);
      setTreesCut(balance.toString());
    }
  };

  useEffect(() => {
    const fetchTreesCut = async () => {
      if (nullifierHash) {
        const balance = await getResourceBalance(woodAddress, nullifierHash);
        setTreesCut(balance.toString());
      }
    };

    fetchTreesCut();
  }, [nullifierHash]);
  const lastCompletionTime = useRef(0);

  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION || 'default_action';

  const { setOpen } = useIDKit();

  useEffect(() => {
    setNullifierHash(localStorage.getItem('nullifierHash'));
  }, []);

  useEffect(() => {
    setAccountAddress(localStorage.getItem('accountAddress'));
  }, [nullifierHash]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (nullifierHash) {
        const balance = await checkBalance(nullifierHash);
        setAccountBalance(balance);
      }
    };

    fetchBalance();
  }, [accountAddress]);

  const onSuccess = (result: ISuccessResult) => {
    const hash = result.nullifier_hash;
    localStorage.setItem('nullifierHash', hash);
    setNullifierHash(hash);
    window.alert(
      "Successfully verified with World ID! Your nullifier hash is: " + hash
    );
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log(
      "Proof received from IDKit, sending to backend:\n",
      JSON.stringify(result)
    ); // Log the proof from IDKit to the console for visibility
    const data = await verify(result);
    if (data.success) {
      console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
    } else {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

  const deployUserAccount = async () => {
    console.log("Deploying user account with nullifier hash:", nullifierHash);
    if (!nullifierHash) {
      console.error("No nullifier hash found");
      return;
    }

    setIsCreatingWallet(true);
    const accountAddress = await deployAccount(nullifierHash);
    setIsCreatingWallet(false);
    {isCreatingWallet && <span>Creating wallet...</span>}
    localStorage.setItem('accountAddress', accountAddress);
    setAccountAddress(accountAddress);
  };

  const treeTypes = [
    { name: "Normal Tree", xp: 10, time: 3, level: 1 },
    { name: "Oak Tree", xp: 20, time: 5, level: 10 },
    { name: "Maple Tree", xp: 30, time: 7, level: 25 },
    { name: "Redwood Tree", xp: 50, time: 10, level: 35 },
  ];

  const handleTreeClick = async (index: number) => {
    if (index === 0 && !isProducing) {
      setIsProducing(true);
      setActiveTree(index);
      try {
        await handleProduceResource();
        setTreesCut(prev => (parseInt(prev ?? '0') + 1).toString());
      } catch (error) {
        console.error('Error producing resource:', error);
      } finally {
        setIsProducing(false);
        setActiveTree(null);
      }
    }
  };

  const handleProduceResource = async () => {
    if (!woodAddress || !nullifierHash) {
      console.error('Missing woodAddress or nullifierHash');
      return;
    }

    try {
      const txHash = await produceResource(woodAddress, nullifierHash);
      setProduceStatus(`Resource produced successfully. Transaction hash: ${txHash}`);
      await fetchTreesCut();
    } catch (error) {
      setProduceStatus(`Error producing resource: ${error}`);
      throw error;
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* New Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🌳</span>
          <h1 className="text-xl font-bold">Resource production</h1>
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Game Guide</span>
        </div>
        <div className="flex items-center">
          {accountAddress ? (
            <>
              <span className="mr-4">Address: {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}</span>
              <span>Balance: {(Number(accountBalance) / 1e18).toFixed(5)} ETH</span>
            </>
          ) : (
            <span>Not logged in</span>
          )}
        </div>
      </header>

      {/* Existing content */}
      <main className="flex-grow p-4 bg-gray-900">
        <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-800 rounded-lg p-4 mb-8">
          {/* World ID verification UI */}
          {!nullifierHash && (
            <div className="mb-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setOpen(true)}
              >
                <div className="flex items-center justify-center">
                  <span>Login with World ID</span>
                </div>
              </button>
              <IDKitWidget
                action={action}
                app_id={app_id}
                onSuccess={onSuccess}
                handleVerify={handleProof}
                verification_level={VerificationLevel.Orb}
              />
            </div>
          )}
          {nullifierHash && !accountAddress && (
            <div>
              <button
                className={`border border-black rounded-md px-4 py-2 ${
                  isCreatingWallet ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
                }`}
                onClick={deployUserAccount}
                disabled={isCreatingWallet}
              >
                {isCreatingWallet ? "Creating account..." : "Create Account"}
              </button>
            </div>
          )}
          {nullifierHash && accountAddress && (
            <div className="text-green-500 font-semibold">
              Account created successfully!
            </div>
          )}
        </div>
        {nullifierHash && accountAddress && (
          <div className="hidden">
            {setTimeout(() => {
              const element = document.querySelector('.flex.flex-col.items-center.justify-center.min-h-\\[200px\\].bg-gray-800.rounded-lg.p-4.mb-8');
              if (element) element.remove();
            }, 1000)}
          </div>
        )}

        {/* Updated Tree Cutting UI */}
        {accountAddress && (
          <div className="w-full max-w-4xl mt-8 mx-auto">
            {/* Tree cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {treeTypes.map((tree, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-gray-800 p-4 rounded-lg text-white cursor-pointer
                    transition-colors duration-300 ease-in-out
                    ${index === 0 ? 'hover:bg-green-600' : 'opacity-70'}
                    ${activeTree === index ? 'bg-green-600' : ''}
                    ${isProducing && index === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onClick={() => handleTreeClick(index)}
                >
                  <h3 className="text-xl font-bold mb-2">
                    {index === 0 ? `Cut ${tree.name}` : 'Locked'}
                  </h3>
                  {index === 0 ? (
                    <>
                      <p>{tree.xp} Skill XP / {tree.time} seconds</p>
                      <motion.div 
                        className="text-4xl my-2"
                        animate={isProducing && activeTree === index ? pulseAnimation : {}}
                      >
                        🌳
                      </motion.div>
                      <div className="flex justify-between items-center">
                        <span>🏆 1</span>
                        <span>{treesCut} / 100</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl my-2 opacity-50">🌳</div>
                      <div className="bg-red-500 h-1 rounded-full mt-2"></div>
                      <p className="mt-2">Level {tree.level}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Produce Resource UI */}
        {accountAddress && (
          <div className="w-full max-w-4xl mt-8 mx-auto">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Produce Resource</h2>
              <div className="flex items-center space-x-4">
                <p className="text-white">Resource Address: 0x05c911152dbfc068e93892fd795f51b4c0fc437f4ea93d5d913edb892fb2cb01</p>
              </div>
              {produceStatus && (
                <p className="mt-4 text-white">{produceStatus}</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
