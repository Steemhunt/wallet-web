import React, { useContext, useEffect } from "react";
import AppContext from "contexts/AppContext";
import HomeContext from "contexts/HomeContext";
import Web3Context from "contexts/Web3Context";
import { Button, Input } from "antd";
import { scrollTop } from "utils/scroller";
import numeral from 'numeral'

const Home = props => {
  const { addSwap } = useContext(HomeContext);
  const { luniverseAddress, updateState } = useContext(AppContext);
  const { balance, ethAddress, getHuntBalance, burnERC20HUNT } = useContext(Web3Context);
  useEffect(() => {
    scrollTop();
  }, []);
  return (
    <div className="home">
      <div>Step 1</div>
      <Button onClick={getHuntBalance}>Connect Metamask</Button>
      <div>You have {numeral(balance).format("0,0.00")} HUNT</div>
      <div>ETH Address: {ethAddress}</div>
      <hr />
      <div>Step 2</div>
      <div>Set Luniverse Address</div>
      <Input
        value={luniverseAddress}
        onChange={e => updateState({ luniverseAddress: e.target.value })}
      />
      <hr />
      <div>Step 3</div>
      <div>Submit Swap Request</div>
      <Button onClick={() => addSwap(balance, luniverseAddress, ethAddress)}>
        Submit
      </Button>
      <hr />
      <div>Step 4</div>
      <div>Burn ERC 20 HUNT Tokens to receive Luniverse based HUNT Tokens</div>
      <Button onClick={() => burnERC20HUNT(ethAddress, balance)}>Burn Proof</Button>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
