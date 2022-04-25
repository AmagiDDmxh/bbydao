import {ChainId}           from '@uniswap/sdk'
import axios               from 'axios'
import {toChecksumAddress} from 'ethereumjs-util'

import {utils} from "ethers"

const EIP712_SAFE_TX_TYPE = {
    // "SafeTx(address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,uint256 nonce)"
    SafeTx: [
        {type: "address", name: "to"},
        {type: "uint256", name: "value"},
        {type: "bytes", name: "data"},
        {type: "uint8", name: "operation"},
        {type: "uint256", name: "safeTxGas"},
        {type: "uint256", name: "baseGas"},
        {type: "uint256", name: "gasPrice"},
        {type: "address", name: "gasToken"},
        {type: "address", name: "refundReceiver"},
        {type: "uint256", name: "nonce"},
    ]
}
const chainId = ChainId.MAINNET
export const generateSafeTxHash = (safeAddress, txArgs) =>
    utils._TypedDataEncoder.hash({verifyingContract: safeAddress, chainId}, EIP712_SAFE_TX_TYPE, txArgs)

const generateTypedDataFrom = async ({
                                         baseGas,
                                         data,
                                         gasPrice,
                                         gasToken,
                                         nonce,
                                         operation,
                                         refundReceiver,
                                         safeTxGas,
                                         to,
                                         valueInWei,
                                     }) => {
    return {
        message: {
            to,
            value: valueInWei,
            data,
            operation,
            safeTxGas,
            baseGas,
            gasPrice,
            gasToken,
            refundReceiver,
            nonce: Number(nonce),
        },
    }
}


export const getEIP712Signature = async (safeTxHash, txArgs, signer) => {
    let signature
    const chainId = ChainId.MAINNET
    const typedData = await generateTypedDataFrom(txArgs)
    const domain = {
        name: 'bbyDao',
        version: '0.0.1',
        chainId,
        verifyingContract: txArgs.safeAddress,
    };
    const message = typedData.message

    signature = await signer._signTypedData(domain, EIP712_SAFE_TX_TYPE, message)

    return signature
}

const calculateBodyFrom = async (
    safeInstance,
    to,
    valueInWei,
    data,
    operation,
    nonce,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
    transactionHash,
    sender,
    origin,
    signature,
) => {


    const contractTransactionHash = await safeInstance
        .getTransactionHash(to, valueInWei, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, nonce)


    console.log('v', valueInWei)
    console.log('parse', parseInt(valueInWei))

    return {
        safe: toChecksumAddress(safeInstance.address),
        to: toChecksumAddress(to),
        value: parseInt(valueInWei),
        data,
        operation,
        nonce,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        contractTransactionHash,
        transactionHash,
        sender: toChecksumAddress(sender),
        origin,
        signature,
    }
}

const getTxServiceUrl = () => 'safe-transaction.gnosis.io/api/v1'

export const getSafeServiceBaseUrl = (safeAddress) => `https://${getTxServiceUrl()}/safes/${safeAddress}`

export const buildTxServiceUrl = (safeAddress) => {
    const address = toChecksumAddress(safeAddress)
    return `${getSafeServiceBaseUrl(address)}/multisig-transactions/`
}

export const saveTxToHistory = async ({
                                          baseGas,
                                          data,
                                          gasPrice,
                                          gasToken,
                                          nonce,
                                          operation,
                                          origin,
                                          refundReceiver,
                                          safeInstance,
                                          safeTxGas,
                                          sender,
                                          signature,
                                          to,
                                          txHash,
                                          valueInWei,
                                      }) => {
    const url = buildTxServiceUrl(safeInstance.address)
    const body = await calculateBodyFrom(
        safeInstance,
        to,
        valueInWei,
        data,
        operation,
        nonce,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        txHash || null,
        sender,
        origin || null,
        signature,
    )

    console.log('body', body)
    console.log('isOwner', await safeInstance.isOwner(sender))

    /*  failing with error 422
    * https://safe-transaction.gnosis.io/
    * Invalid ethereum address/User is not an owner/Invalid safeTxHash/Invalid signature/Nonce already executed/Sender is not an owner
    *  */

   const response = await axios.post(url, body)
    console.log('response', response)


    // if (response.status !== 201) {
    //     return Promise.reject(new Error('Error submitting the transaction'))
    // }
    //
    // return Promise.resolve()
}
