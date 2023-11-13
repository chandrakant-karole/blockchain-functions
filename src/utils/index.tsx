import Web3 from "web3";

export const web3 = new Web3(window.ethereum);

export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}
