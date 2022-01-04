import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Welcome = () => {
    const { currentAccount, connectWallet } = useContext(TransactionContext);
    console.log(value);
    return (
        <h1> Welcome </h1>
    );
}

export default Welcome;