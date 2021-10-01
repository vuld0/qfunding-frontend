import Web3 from 'web3';
import QFundingBuild from 'contracts/qfunding.json'

//update adress here after deploy
let selectedAccount;
var qfundingAddress = "0x36855DcFF29d24DC28372BC2bD6342170a7a735a"


export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
        //Metamask is installed

        //trying connecting to the wallet
        provider.request({method: 'eth_requestAccounts'}).then((accounts) => {
        selectedAccount = accounts[0];
          console.log(accounts);
        })
        .catch((err) => {
          console.log(err);
        });
    //if the wallet account has been changed then console it
    window.ethereum.on('accountsChanged', function(accounts) {
      
      console.log(`Selected account changed to ${selectedAccount}`);
    });
    }
    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();
    const qFundingContract = new web3.eth.Contract(QFundingBuild.abi, qfundingAddress);
    console.log(qFundingContract);
    console.log("check");
    var poolAdress = await qFundingContract.methods.sponsorPool().send({from: selectedAccount});
    console.log(poolAdress);

   
}