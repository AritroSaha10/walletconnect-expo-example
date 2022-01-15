import React from "react";

import { MoralisProvider } from "react-moralis";
import Moralis from "moralis/react-native";
import { enableViaWalletConnect } from "./Moralis/enableViaWalletConnect";

import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";

import { expo } from "./app.json";
const { scheme } = expo;

Moralis.setAsyncStorage(AsyncStorage);

Moralis.enable = enableViaWalletConnect;

const walletConnectOptions = {
    bridge: "https://bridge.walletconnect.org",
    clientMeta: {
        description: "Connect with WalletConnect",
        url: "https://walletconnect.org",
        icons: ['https://walletconnect.org/walletconnect-logo.png'],
        name: "WalletConnect"
    },
    redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
    storageOptions: {
        asyncStorage: AsyncStorage,
    },
}

export const Providers = ({ children }) => (
    <WalletConnectProvider {...walletConnectOptions}>
        <MoralisProvider
            appId="bvNpFwznN2coNQlBwRNkwrfk9HsbvasRi6XpnfPm"
            serverUrl="https://lhnc87bx0kww.usemoralis.com:2053/server"
            environment="native"
            >
                <MoralisDappProvider>
                    {children}
                </MoralisDappProvider>
            </MoralisProvider>
    </WalletConnectProvider>
)

