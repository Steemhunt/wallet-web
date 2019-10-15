import React, { Component } from "react";
import api from "utils/api";

const HomeContext = React.createContext();
const { Provider, Consumer } = HomeContext;

class HomeProvider extends Component {
  state = {};

  componentDidMount() {}

  updateState = obj => {
    this.setState(obj);
  };

  addSwap = async (amount, luniverse_address, eth_address) => {
    const result = await api.post("/swaps", {
      global_user_id: 1,
      amount,
      luniverse_address,
      eth_address,
    });
    console.log(result);
  };

  burnHUNT = () => {

  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          addSwap: this.addSwap
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { HomeProvider, Consumer as AppConsumer };

export default HomeContext;
