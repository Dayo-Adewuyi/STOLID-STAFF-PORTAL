import UAuthSPA from "@uauth/js";
import * as UAuthWeb3Modal from "@uauth/web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const uauthOptions = {
  clientID: "68ee4d6b-dabe-48e1-a6ed-9f7b907eca13",
  redirectUri: "http://localhost:3000/",

  scope: "openid wallet",
};

const providerOptions = {
  "custom-uauth": {
    display: UAuthWeb3Modal.display,
    connector: UAuthWeb3Modal.connector,
    package: UAuthSPA,
    options: uauthOptions,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "9979da9ce2b54a21bd0551a89fe53c35",
    },
  },
};

export default providerOptions;
