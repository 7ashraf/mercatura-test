'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { act, useEffect, useState } from "react";
//import { Provider, WalletConnectRPC } from '@psychedelic/plug-inpage-provider';
//import PlugConnect from '@psychedelic/plug-connect';
import { Provider, WalletConnectRPC } from '@psychedelic/plug-inpage-provider';
import { LedgerCanister } from "@dfinity/ledger-icp";
import { idlFactory } from "@/icp_ledger_canister.did";
import { createAgent } from "@dfinity/utils";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { AuthClient } from "@dfinity/auth-client";

export default function Home() {

  const [principalId, setPricnipalId] = useState(null);
  const [accountId, setAccountId] = useState('');
  const [connected, setConnected] = useState(null);
  const [balance, setBalance] = useState(null)
  


  const onConnectCallback = async (connected) => {
    setConnected(connected);
    console.log('Connected', connected);
    const agent = window.ic.plug.agent;
    const principal = await agent.getPrincipal();
    setPricnipalId(window.ic.plug.principalId);
    setAccountId(window.ic.plug.accountId);

    await fetchBalance();
  }


  const handleConnect = async () => {
    const whitelist= ['ryjl3-tyaaa-aaaaa-aaaba-cai'];
    const host = 'icp-api.io'; 
    const timeout = 30000;

    const connected = await window?.ic?.plug?.requestConnect({
      whitelist,
      host,
      timeout,
    });
    if (!connected) return;
    console.log( await (window.ic.plug.createAgent({ whitelist, host })))

    onConnectCallback(connected);


  };


  const fetchBalance = async () => {

    const actor = await window.ic.plug.createActor({
      canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
      interfaceFactory: idlFactory,
    });




    const agent = await createAgent({
      identity: 'prj2t-xm4eu-dycec-cznwi-s2xqd-e77zb-zsfnt-62phw-2ggph-c32n4-7ae',
      host: 'icp-api.io',
    });

    console.log(agent)
    console.log(window.ic.plug.agent)


    const ledger  = LedgerCanister.create({
      agent:window.ic.plug.agent,
      //canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
    });
    const accountIdentifier = AccountIdentifier.fromHex('c1b6f089de4df9f86ca0151a0911b6be8d059c56b77120c54d2b64476aa25216')
    console.log(ledger)
    const balance = (await ledger.accountBalance({accountIdentifier: window.ic.plug.accountId, certified: false }));
    setBalance(Number(balance) / 100000000)





    //console.log(actor);

    // const pId = (await window.ic.plug.getPrincipal()).toUint8Array();
    // console.log(pId);


    // console.log(await actor.decimals())


    


    // console.log(await (actor.account_balance({account: pId})));
    









    //const balance = requestBalanceResponse[0]?.value;
    //console.log('Balance', balance);
  };


  
  useEffect( () => {


  }, [principalId]);

  if (connected) {
    return (
      <div className={styles.page}>
        <h1>Connected</h1>
        <h1>Principal ID: {principalId}</h1>
        <h1>Account ID: {accountId}</h1>
        <h1>Your Balance: {balance ? balance.toString() : 'Loading...'}</h1>
      </div>
    );
  }

 

  return (
    <div className={styles.page}>
      <button onClick={handleConnect}>Connect Wallet</button>
    </div>
  );
}
