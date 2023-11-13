"use client"
import React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { formatBalance, web3 } from '@/utils';
import Stake from '@/components/Stake';
import List from '@/components/List';
import { coinABI, coinAddress } from '@/utils/Coin';
export default function Home() {
  const [WalletAddress, setWalletAddress] = React.useState('')
  const [WalletBalance, setWalletBalance] = React.useState('')
  const [TokenBalance, setTokenBalance] = React.useState('')

  //On Connect Wallet 
  const connectWallet = async () => {
    const provider = await detectEthereumProvider();
    //checking ethereum connection
    if (window.ethereum !== undefined && provider === window.ethereum) {
      //connect wallet
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setWalletAddress(accounts[0])
      //get balance
      const balance = formatBalance(await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      }))
      setWalletBalance(balance)
      //getting coin balance or token balance
      const coinInstance = new web3.eth.Contract(coinABI, coinAddress)
      //@ts-ignore
      coinInstance.methods.balanceOf(accounts[0])
        .call()
        .then((e: any) => {
          const balance = web3.utils.fromWei(e, 'ether')
          console.log(balance)
          setTokenBalance(balance)
        }
        )
        .catch(error => console.log(error))
    }
  }
  return (
    <>
      <section className="landing_page">
        <div className="box">
          <h1>Balance : {WalletBalance === "" ? 'Not Available' : WalletBalance}</h1>
          <h4>Account Id : {WalletAddress === "" ? "please connect to wallet" : `${WalletAddress.slice(0, 4)}...${WalletAddress.slice(-4)}`}</h4>
          <h4>Token Balance : {TokenBalance === "" ? "please connect to wallet" : TokenBalance}</h4>
          {
            WalletAddress === "" ?
              <button onClick={connectWallet} className="main">Connect Wallet</button>
              :
              <button className="main connected">Connected</button>
          }
        </div>
        <Stake WalletAddress={WalletAddress} />
        <List />
      </section>
    </>
  )
}
