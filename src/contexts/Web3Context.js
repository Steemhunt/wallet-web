import React, { Component } from "react";
import { Modal, notification } from "antd";
import Web3 from "utils/web3";
import api from "utils/api";
import metaMaskImage from "assets/images/no-metamask.png";
import huntToken from "contracts/HuntToken";

const Web3Context = React.createContext();
const { Provider, Consumer } = Web3Context;

class Web3Provider extends Component {
  web3 = null;

  state = {
    balance: 0,
    ethAddress: null
  };

  async componentDidMount() {}

  updateState = object => {
    this.setState(object);
  };

  getHuntBalance = async () => {
    this.web3 = await Web3();
    this.validEthereumNetwork();
    const contract = new this.web3.eth.Contract(
      huntToken.abi,
      huntToken.networks["3"]["address"]
    );

    const accounts = await this.web3.eth.getAccounts();
    console.log(accounts);
    const ethAddress = accounts && accounts[0];
    if (ethAddress) {
      const huntBalance = await contract.methods.balanceOf(ethAddress).call();
      let balance = parseFloat(huntBalance.valueOf()) / 10 ** 18;
      this.setState({ balance, ethAddress });
    }
  };

  burnERC20HUNT = (eth_address, amount) => {
    const contract = new this.web3.eth.Contract(
      huntToken.abi,
      huntToken.networks["3"]["address"]
    );

    const huntAmount = this.web3.utils.toWei(10 + "", "ether");
    console.log("request to burn", eth_address, amount, huntAmount);

    contract.methods
      .burn(huntAmount)
      .send({ from: eth_address })
      .on("confirmation", async function(confNumber, receipt) {
        console.log("conf", confNumber);
      })
      .then(console.log)
      .catch(console.error);
  };

  async validEthereumNetwork() {
    if (this.web3 === null) {
      Modal.error({
        title: "Please install Metamask",
        className: "metamask-install-modal",
        autoFocusButton: null,
        maskClosable: true,
        content: (
          <div className={"metamask-install-body"}>
            <p>
              You need to use Metamask to connect your own Ether wallet address.
            </p>
            <img src={metaMaskImage} alt="Metamask" className="fox" />
          </div>
        ),
        okText: "Get Metamask",
        onOk: () => window.open("https://metamask.io/", "_blank")
      });
      return false;
    }

    let ethAccounts = await this.web3.eth.getAccounts();
    if (ethAccounts.length === 0) {
      if (window.ethereum) {
        ethAccounts = await window.ethereum.enable();
      }

      if (ethAccounts.length === 0) {
        notification["error"]({ message: "You need to login on Metamask." });
        return false;
      }
    }

    const ethNetwork = await this.web3.eth.net.getNetworkType();
    if (ethNetwork !== "main") {
      Modal.error({
        title: "Incorrect Network",
        content: `You are currently in ${ethNetwork} network. Please change your network to Main Ethereum Network.`
      });

      return false;
    }

    return true;
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          getHuntBalance: this.getHuntBalance,
          burnERC20HUNT: this.burnERC20HUNT
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Web3Provider, Consumer as AppConsumer };

export default Web3Context;
