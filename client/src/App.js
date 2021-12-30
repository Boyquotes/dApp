import React, { Component } from "react";
import LeafContract from "./contracts/Leaf.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { leafValue: 0, web3: null, accounts: null, leafContractInstance: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LeafContract.networks[networkId];
      console.log(deployedNetwork);
      const leafContractInstance = await new web3.eth.Contract(
        LeafContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, leafContractInstance: leafContractInstance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  mintLeaf = async () => {
    const { accounts, leafContractInstance, web3 } = this.state;
    console.log('Contract LEAF');
    console.log(leafContractInstance.options.address);
    const amount = web3.utils.toWei('0.1', 'ether');
      await leafContractInstance.methods.mint(accounts[0], amount).send({ from: accounts[0] });
  }

  runExample = async () => {
    const { accounts, leafContractInstance, web3 } = this.state;
//    await leafContractInstance.methods.mint("0xb35093c32411d58efFf2B7b5b62d6c06bfc60Ee1", amount).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await leafContractInstance.methods.balanceOf(accounts[0]).call();
    //console.log(response);
//    web3.eth.getAccounts(console.log);
    const send_address = accounts[0];
    const balance = await leafContractInstance.methods.balanceOf(send_address).call();

    // Update state with the result.
    this.setState({ leafValue: web3.utils.fromWei(balance, 'ether') });
    this.setState({ accountUser: accounts[0] });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">

        <h1>Play 2 Plant</h1>
        <h2>Leaf Bank</h2>
        <p>Votre solde actuel en Leaf est de:</p>
        <div>{this.state.leafValue} <span className="leafMonney">LEAF</span></div>

        <div className="imageTreeNFT">
          <img src={require('./tree333-1.png')} />
        </div>

        <div className="addressUser">{this.state.accountUser}</div>
        <div className="addressUser">Contract : {this.state.leafContractInstance.options.address}</div>
        <h2>ADMIN</h2>
        <button onClick={this.mintLeaf}>Minter</button>

      </div>
    );
  }
}

export default App;
