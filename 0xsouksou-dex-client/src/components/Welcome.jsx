import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from ".";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    const { currentAccount, connectWallet, handleChange, formData, sendTransaction, isLoading} = useContext(TransactionContext);

    const handleSubmit = (e) => {
        console.log("handleSubmit");
        const { addressTo, amount, keyword, message} = formData;

        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 py-4">
                <div className="flex flex-1 justify-start flex-col">
                    <h1 className="text-3xl sm:text-3xl text-white py-1">
                        Web3 is the future, send your friend a small gift.
                    </h1>
                    <div className="p-3 flex justify-end items-end flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff"/>
                            </div>
                            <div>
                                <p className="text-white font-light truncate text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-bold text-sm">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the new world, send message in decentralized.
                    </p>
                    { ! currentAccount && (
                        <button type="button" className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2545bd]"
                        onClick={connectWallet}>
                            <span className="text-white text-base font-semibold">Connect Wallet</span>
                        </button>
                    )}
                </div>

                <div className="flex flex-col flex-1 items-center justify-center w-full mf:mt-10">
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text"  handleChange={handleChange}/>
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text"  handleChange={handleChange}/>
                        <Input placeholder="Enter Message" name="message" type="text"  handleChange={handleChange}/>

                        {isLoading
                            ? <Loader />
                            : (
                                <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                Send now
                                </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;