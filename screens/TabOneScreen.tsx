import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Linking } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import { createAlchemyWeb3 } from '@alch/alchemy-web3';

const API_URL = "https://eth-ropsten.alchemyapi.io/v2/uWkv8nfaqAR8R27a8igUtgeZudpC72nn";

const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyMemories.sol/MyMemories.json");
const contractAddress = "0x587Fe49b1C74513830f386360dE243A57a8962Ec";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const mintNFT = async (tokenURI: string) => {
    console.log("Private key (?): ", connector.key);
    console.log("Public key (?): ", connector.accounts[0]);

    

    console.log(connector)

    if (connector.connected) {
      const nonce = await web3.eth.getTransactionCount(connector.accounts[0], "latest");

      console.log(nonce);

      const tx = {
        from: connector.accounts[0],
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        maxPriorityFeePerGas: 1999999987,
        data: nftContract.methods.mintNFT(connector.accounts[0], tokenURI).encodeABI()
      };

      console.log(tx);

      const signedTx = await web3.eth.accounts.signTransaction(tx, "5411d7e7ba6557ce27ccb2da8949a94d496ca1d4b34d0cd16445900335930ad0");

      console.log(signedTx);

      const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction ?? "");

      console.log(`NFT Hash: ${transactionReceipt.to}`);
      Linking.openURL(`https://ropsten.etherscan.io/tx/${transactionReceipt.transactionHash}`);
    }
  }

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Log out</Text>
          </TouchableOpacity>

          <Button onPress={() => {
            connector.sendTransaction({
              from: connector.accounts[0],
              to: "0x3a339C136F4482f348e3921EDBa8b8Ebd6931f08",
              value: "10000000000000000"
            })
          }} title="SEND" />

          <TouchableOpacity onPress={() => {mintNFT(`https://gateway.pinata.cloud/ipfs/QmS9rLwajofQuSXvqAtwy5HtjMGSemA7ijaj5NRFRs9gxk`)}}>
            <Text>Mint an NFT</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
