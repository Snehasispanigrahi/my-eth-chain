const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const deploy = async () => {
  const accounts = await web3.eth.accounts;
  console.log("Attempting to deploy from account", accounts[0]);

  const VotingContract = await web3.eth.contract(JSON.parse(interface));
  const result = await VotingContract.new(
    ["Rama", "Nick", "Jose"],
    {
      data: "0x" + bytecode,
      from: accounts[0],
      gas: 1000000
    },
    function(err, deployedContract) {
      if (!err) {
        if (!deployedContract.address) {
          console.log(deployedContract.transactionHash);
        } else {
          console.log(`Address: ${deployedContract.address}`);
          // use deployedContract here
        }
      } else {
        console.log('error: '+err);
      }
    }
  );
};

deploy();

//   const VotingContract = web3.eth.contract(JSON.parse(interface));
// const deployedContract = VotingContract.new(["Rama", "Nick", "Jose"], {
//   data: "0x"+bytecode,
//   from: web3.eth.accounts[0],
//   gas: 4700000
// });
// const contractInstance = VotingContract.at(deployedContract.address);
// console.log("Contract deployed to", contractInstance.address);
