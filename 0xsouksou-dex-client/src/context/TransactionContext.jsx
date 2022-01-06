import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const  TransactionContext =  React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer  = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionContract;
}

export const TransactionProvider = ({children}) => {

  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''});
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))

  const handleChange = (e, name) => {
    setFormData((prevState) => ({...prevState, [name]: e.target.value}));
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_accounts'});

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log('No account');
      }

      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error('No ETH account')
    }
  }

  const sendTransaction = async() => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const parsedAmount = ethers.utils.parseEther(amount);
        const transactionsContract = getEthereumContract();

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // GWEI = 21000
            value: parsedAmount._hex, // 0.00001
          }]
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash}`);
        await transactionHash.wait();
        setIsLoading(false);
        console.log(`Success - ${transactionHash}`);

        const contractTransactionCount = await transactionsContract.getTransactionCount();
        setTransactionCount(contractTransactionCount.toNumber());
      }  else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error sendTransation');
    }
  }

  const connectWallet =  async () => {
    try {
      if (!ethereum) return alert('Please install metamask');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
    } catch (error) {
       console.log(error);
       throw new Error('No ETH account')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{connectWallet, handleChange, formData, currentAccount, sendTransaction, isLoading}}>
      {children}
    </TransactionContext.Provider>
  )
}