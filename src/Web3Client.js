import Web3 from 'web3';
import QFundingBuild from 'contracts/qfunding.json'
let selectedAccount;


export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
        //Metamask is installed

        //trying connecting to the wallet
        provider.request({method: 'eth_requestAccounts'}).then((accounts) => {
          console.log(accounts);
        })
        .catch((err) => {
          console.log(err);
        });
    //if the wallet account has been changed then console it
    window.ethereum.on('accountsChanged', function(accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
    }
    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();
    const qFundingContract = new web3.eth.Contract(QFundingBuild.abi);
    console.log(qFundingContract)
}