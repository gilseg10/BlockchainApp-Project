import React, { useEffect, useState} from "react"
import { ethers } from "ethers"
import { contractABI, contractAddress } from '../utils/constants'

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    // console.log({
    //     provider,
    //     signer,
    //     transactionsContract
    // }); 
    return transactionsContract  
}

export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(sessionStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);


    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask");

            const transactionsContract = getEthereumContract();
            const availableTransactions = await transactionsContract.getAllTransactions()
            const structuredTransactions = availableTransactions.map(transaction => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            console.log(structuredTransactions)
            setTransactions(structuredTransactions)
        } catch (error) {
            console.log(error)
        }
    }
    
    // check if metamask wallet is already connected and if so
    // we can't see the 'Connect Wallet' button in Welcome 
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask")
            
            const accounts = await ethereum.request({ method: 'eth_accounts'})
            if (accounts.length) {
                setCurrentAccount(accounts[0])

                getAllTransactions()
            } else {
                console.log("No Accounts Found")
            }

            console.log(accounts);    
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
        
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionsContract = getEthereumContract();
            const transactionCount = await transactionsContract.getTransactionsCount()

            sessionStorage.setItem("transactionsCount", transactionCount)
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    // function to connect the wallet at the start of the app
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask")
            
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
            window.location.reload()
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    const sendTransactions = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask");
            
            const { addressTo, amount, keyword, message } = formData;
            const transactionsContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount) // convert decimal value to hex for Gwei

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 Gwei in hex
                    value: parsedAmount._hex,  
                }]
            })

            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword)

            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionsContract.getTransactionsCount()
            setTransactionCount(transactionCount.toNumber())

            window.location.reload()
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionsExist()
    }, []);

    return (
        <TransactionsContext.Provider value={{ connectWallet, currentAccount, formData, sendTransactions, handleChange, transactions, isLoading }}>
            { children }
        </TransactionsContext.Provider>
    )
}
