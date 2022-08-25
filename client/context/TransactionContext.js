import React, {useState,useEffect} from 'react'
import { contractABI, contractAddress} from '../lib/constants'
import {ethers} from 'ethers'

export const  TransactionContext = React.createContext()

let eth

if(typeof window !== 'undefined'){
    eth = window.ethereum
 }

 const getEthereumContract = ()=>{
        const provider= new ethers.providers.Web3Provider(eth)
        const signer = provider.getSigner()
        const transactionContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
        )
        return transactionContract 
 } 

 export const TransactionProvider = ({children})=>{
    const[currentAccount,setCurrentAccount]=useState()
    const[isLoading,setIsLoading] = useState(false)
    const[formData,setFormData] = useState({
        addressTo:'',
        amounrt:'',
    }
    )

      useEffect(() =>{
        checkIfWalletIsConnected()
      },[])

      const connectWallet = async(metamask=eth)=>{
       try{
           if (!metamask) return alert('Please install Metamask')
           const accounts = await metamask.request({method: 'eth_requestAccounts'})
           setCurrentAccount(accounts[0])
         }  catch (error){
            console.error(error)
            throw new Error('No Ethereum Object')
         }
    }

    const checkIfWalletIsConnected = async (metamask=eth) =>{
        try{
            if(!metamask) return alert ('Please install Metamask')
            const accounts =await metamask.request({ method:'eth_accounts'})
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                console.log('Wallet is already Connected')
            }
        }catch (error){
        console.error(error)
        throw new Error('No Ethereum Object')
    }
}

    const sendTransaction = async (
        metamask = eth,
        connectedAccount = currentAccount
    ) => {

        try{
            if(!metamask)return alert('Please install Metamadsk')
            const {addressTo, amount }= formData
            const transactionContract=getEthereumContract()

            const parsedAmount = ethers.utils.parseEther(amount)

            await metamask.request({
                method:'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: addressTo,
                        gas:'0x7E40', //520000 Gwei
                        value: parsedAmount._hex,
                    },
                ],
            })

                const transactionHash = await transactionContract.publishTransaction(
                    addressTo,
                    parsedAmount,
                    `Transferring ETH ${parsedAmount} to ${addressTo}`,
                    'TRANSFER',
                )

                setIsLoading(true)

                await transactionHash.wait()

                // await saveTransaction(
                //     transactionHash.hash,
                //     amount,
                //     connectedAccount,
                //     addressTo
                // )
    
                setIsLoading(false)

                }catch(erroe){
                console.log(error)

        }
    }

    
        const handleChange = (e, name) => {
            setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
          }
    


    return(
        <TransactionContext.Provider
            value={{
                currentAccount,
                connectWallet,
                sendTransaction,
                handleChange,
                formData,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
 }