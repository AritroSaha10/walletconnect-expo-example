import React, { useState } from 'react'
import { ImageBackground, View, StyleSheet, AppRegistry, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import { NativeBaseProvider, Text, Button, Icon, Center, Image, AspectRatio, Heading, HStack, Stack, Box, VStack, Spacer, Modal, FormControl, Input } from 'native-base';

import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { Linking } from 'react-native';
import { mintNFT } from '../util/mintNFT';

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
    )}`;
}


const image = { uri: "https://i.ibb.co/L6sBBJ0/Onboarding-Screen-2.png" }
const onPress = () => { };

const Connection = () => {
    const connector = useWalletConnect();

    const connectWallet = React.useCallback(() => {
        return connector.connect();
    }, [connector]);

    const killSession = React.useCallback(() => {
        return connector.killSession();
    }, [connector]);

    const [showModal, setShowModal] = useState(false)
    const [nftMintData, setNFTMintData] = useState({});
    const [mintingInProgress, setMintingInProgress] = useState(false);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>
                        NFT Info
                    </Modal.Header>

                    <Modal.Body>
                        <Text fontSize="xs">🎉 Congrats, your NFT has been minted! 🎉</Text>
                        <Text fontSize="xs" mt="1">Copy paste these into your desired wallet app to access them.</Text>
                        
                        <FormControl mt="3">
                            <FormControl.Label>Address</FormControl.Label>
                            <Input value={nftMintData.contractHash} />
                        </FormControl>

                        <FormControl mt="3">
                            <FormControl.Label>ID</FormControl.Label>
                            <Input value={nftMintData.tokenID.toString()} />
                        </FormControl>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal(false)
                                }}
                            >
                                Close
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <ImageBackground source={image} resizeMode='cover' style={styles.image}>
                <Button
                    position={'absolute'}
                    bottom={10}
                    p={5}
                    onPress={
                        () => {
                            Linking.openURL("https://metamask.io")
                        }}
                    zIndex={100}
                >
                    ❓ Metamask
                </Button>

                <VStack h="100%" p={2}>
                    <Spacer />
                    {!connector.connected && (
                        <Button onPress={connectWallet} p={5}>
                            Connect a Wallet
                        </Button>
                    )}
                    {!!connector.connected && (
                        <>
                            <HStack w="full">
                                <Spacer />
                                <Text color="white" fontSize="20" fontFamily="Philosopher-Bold">
                                    Welcome, {shortenAddress(connector.accounts[0])}!
                                </Text>
                                <Spacer />
                            </HStack>

                            <Button
                                onPress={async () => {
                                    setMintingInProgress(true);

                                    setNFTMintData(await mintNFT(
                                        "https://gateway.pinata.cloud/ipfs/QmS9rLwajofQuSXvqAtwy5HtjMGSemA7ijaj5NRFRs9gxk",
                                        connector
                                    ));

                                    setShowModal(true);
                                    setMintingInProgress(false);
                                }}
                                mx={5}
                                my={2}
                                disabled={mintingInProgress}
                            >
                                {mintingInProgress ? "Minting..." : "Mint an NFT"}
                            </Button>

                            <Button onPress={killSession} mx={5} my={2}>
                                Logout
                            </Button>
                        </>
                    )}
                    <Spacer />
                </VStack>

                <Box maxW={80} rounded={'lg'} overflow={'hidden'} borderWidth={1} />
            </ImageBackground>
        </View >

    )
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },
});

export default Connection;