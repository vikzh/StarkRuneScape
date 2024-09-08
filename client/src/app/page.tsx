"use client";

import { useState, useEffect, useRef } from 'react';
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "./actions/verify";
import { checkBalance, deployAccount, deploySystemAccount, getResourceBalance, produceResource, produceStick, catchFish, cookFish } from "./actions/actions";
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
  const [stickBalance, setStickBalance] = useState<string | null>(null);
  const [woodBalance, setWoodBalance] = useState<string | null>(null);
  const [fishBalance, setFishBalance] = useState<string | null>(null);
  const [cookedFishBalance, setCookedFishBalance] = useState<string | null>(null);

  const woodAddress = '0x05c911152dbfc068e93892fd795f51b4c0fc437f4ea93d5d913edb892fb2cb01';
  const stickAddress = "0x20d5f0fe4166124218dc5cd4624cbec3adafdd55909ab4fca9ba5374f56b031";
  const fishAddress = "0x34fced2cfc380b72ef04f51253023259fd805cd428edda73866aaef6ab0904c";
  const cookedFishAddress = "0x21d87189985671ca4b9979d782681b90ab69fe29381eec262a0adf9dcf4010b";

  const fetchResources = async () => {
    if (nullifierHash) {
      const woodBalance = await getResourceBalance(woodAddress, nullifierHash);
      setWoodBalance(woodBalance.toString());
      
      const stickBalance = await getResourceBalance(stickAddress, nullifierHash);
      setStickBalance(stickBalance.toString());

      const fishBalance = await getResourceBalance(fishAddress, nullifierHash);
      setFishBalance(fishBalance.toString());

      const cookedFishBalance = await getResourceBalance(cookedFishAddress, nullifierHash);
      setCookedFishBalance(cookedFishBalance.toString());
    }
  };

  useEffect(() => {
    if (nullifierHash) {
      fetchResources();
    }
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
    { name: "Stick", xp: 15, time: 4, level: 1, woodRequired: 2 },
    { name: "Fish", xp: 20, time: 5, level: 1, stickRequired: 1 },
    { name: "Cooked Fish", xp: 25, time: 6, level: 1, woodRequired: 5, fishRequired: 1 },
  ];

  const handleTreeClick = async (index: number) => {
    if (isProducing) return;
    setIsProducing(true);
    setActiveTree(index);
    try {
      switch (index) {
        case 0:
          await handleProduceResource();
          break;
        case 1:
          if (Number(woodBalance) >= 2) await handleProduceStick();
          break;
        case 2:
          if (Number(stickBalance) >= 1) await handleProduceFish();
          break;
        case 3:
          if (Number(woodBalance) >= 5 && Number(fishBalance) >= 1) await handleCookFish();
          break;
      }
    } catch (error) {
      console.error(`Error producing resource: ${error}`);
      setProduceStatus(`Error producing resource: ${error}`);
    } finally {
      setIsProducing(false);
      setActiveTree(null);
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
      await fetchResources();
    } catch (error) {
      setProduceStatus(`Error producing resource: ${error}`);
      throw error;
    }
  };

  const handleProduceStick = async () => {
    if (!nullifierHash) {
      console.error('No nullifier hash found');
      return;
    }
    try {
      const txHash = await produceStick(nullifierHash);
      setProduceStatus(`Stick produced successfully! Transaction hash: ${txHash}`);
      await fetchResources(); // Refresh both wood and stick balances
    } catch (error) {
      setProduceStatus(`Error producing stick: ${error}`);
    }
  };

  const handleProduceFish = async () => {
    if (!nullifierHash) {
      console.error('No nullifier hash found');
      return;
    }
    try {
      const txHash = await catchFish(nullifierHash);
      setProduceStatus(`Fish caught successfully! Transaction hash: ${txHash}`);
      await fetchResources(); // Refresh all resource balances
    } catch (error) {
      setProduceStatus(`Error catching fish: ${error}`);
    }
  };

  const handleCookFish = async () => {
    if (!nullifierHash) {
      console.error('No nullifier hash found');
      return;
    }
    try {
      const txHash = await cookFish(nullifierHash);
      setProduceStatus(`Fish cooked successfully! Transaction hash: ${txHash}`);
      await fetchResources(); // Refresh all resource balances
    } catch (error) {
      setProduceStatus(`Error cooking fish: ${error}`);
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    },
    transformOrigin: "center center" // This ensures the scaling happens from the center
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

      {/* New Resource Balance Panel */}
      {accountAddress && (
        <div className="bg-gray-700 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h2 className="text-lg font-semibold">Resource Balances:</h2>
            <div className="flex space-x-4">
              <span>🪵 Wood: {woodBalance || '0'}</span>
              <span>🥢 Sticks: {stickBalance || '0'}</span>
              <span>🐟 Fish: {fishBalance || '0'}</span>
              <span>🍣 Cooked Fish: {cookedFishBalance || '0'}</span>
            </div>
          </div>
        </div>
      )}

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
                    hover:bg-green-600
                    ${activeTree === index ? 'bg-green-600' : ''}
                    ${isProducing ? 'opacity-50 cursor-not-allowed' : ''}
                    ${index === 1 && Number(woodBalance) < 2 ? 'opacity-50 cursor-not-allowed' : ''}
                    ${index === 2 && Number(stickBalance) < 1 ? 'opacity-50 cursor-not-allowed' : ''}
                    ${index === 3 && (Number(woodBalance) < 5 || Number(fishBalance) < 1) ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onClick={() => handleTreeClick(index)}
                >
                  <h3 className="text-xl font-bold mb-2">
                    {index === 0 ? 'Cut' : index === 1 ? 'Craft' : index === 2 ? 'Catch' : 'Cook'} {tree.name}
                  </h3>
                  <p>{tree.xp} Skill XP / {tree.time} seconds</p>
                  <motion.div 
                    className="text-4xl my-2"
                    animate={isProducing && activeTree === index ? pulseAnimation : {}}
                  >
                    {index === 0 ? '🌳' : index === 1 ? '🌿🥢' : index === 2 ? '🎣' : '🍳🐟'}
                  </motion.div>
                  {index === 1 && (
                    <div className="flex justify-between items-center">
                      <span>{tree.woodRequired} wood required</span>
                      {Number(woodBalance) < 2 && (
                        <span className="text-red-500">Not enough wood</span>
                      )}
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex justify-between items-center">
                      <span>{tree.stickRequired} stick required</span>
                      {Number(stickBalance) < 1 && (
                        <span className="text-red-500">Not enough sticks</span>
                      )}
                    </div>
                  )}
                  {index === 3 && (
                    <div className="flex flex-col">
                      <span>{tree.woodRequired} wood required</span>
                      <span>{tree.fishRequired} fish required</span>
                      {(Number(woodBalance) < 5 || Number(fishBalance) < 1) && (
                        <span className="text-red-500">Not enough resources</span>
                      )}
                    </div>
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
