import Web3 from "web3";
const contractAddress = "0x91609aD30EBa869C1F412E5656DeaD7bCaACaA5f";
const contractABI = [
  {
    constant: true,
    inputs: [{ name: "x", type: "uint256" }],
    name: "log_2",
    outputs: [{ name: "y", type: "uint256" }],
    payable: false,
    stateMutability: "pure",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "daoAddress",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "DAO_CAP",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "INITIAL_REP",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "signal",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_vouchee", type: "address" }],
    name: "vouche",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getAllMembers",
    outputs: [{ name: "", type: "address[]" }, { name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_reputation", type: "uint256" }
    ],
    name: "issueReputation",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_of", type: "address" }],
    name: "getReputation",
    outputs: [{ name: "reputation", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_rep", type: "uint256" }
    ],
    name: "daoDistribution",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "distributedByLockdrop",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "distributedByDao",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "LOCKDROP_CAP",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "PER_DAY_VOUCHE_COUNT",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_daoAddress", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_vouchee", type: "address" },
      { indexed: true, name: "_voucher", type: "address" },
      { indexed: false, name: "_vouchedAmount", type: "uint256" }
    ],
    name: "Vouched",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_to", type: "address" },
      { indexed: false, name: "_reputation", type: "uint256" }
    ],
    name: "DaoDistribution",
    type: "event"
  },
  { anonymous: false, inputs: [], name: "Signaled", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_to", type: "address" },
      { indexed: false, name: "_reputation", type: "uint256" }
    ],
    name: "IssueReputation",
    type: "event"
  }
];
const web3Obj = {
  web3: new Web3(),
  vouch: function(address, senderAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(web3Obj);
        let res = await web3Obj.contract.methods
          .vouche(address)
          .estimateGas({ from: senderAddress });
        let vouched = web3Obj.contract.methods
          .vouche(address)
          .send({ from: senderAddress })
          .on("transactionHash", function(hash) {})
          .on("confirmation", function(confirmationNumber, receipt) {})
          .on("receipt", function(receipt) {
            // receipt example
            console.log(receipt);
          })
          .on("error", console.error);
        resolve(vouched);
      } catch (e) {
        reject(e);
      }
    });
    return;
  },
  setweb3: async function() {
    //   console.log(Web3)
    return new Promise((resolve, reject) => {
      const web3Inst = new Web3(
        window.web3.currentProvider || "ws://localhost:8546",
        null,
        {}
      );
      web3Obj.web3 = web3Inst;
      sessionStorage.setItem("pageUsingTorus", "true");
      resolve(true);
    });
  },
  setContractInstance: () => {
    web3Obj.contract = new web3Obj.web3.eth.Contract(
      contractABI,
      contractAddress,
      {
        gasPrice: "5000000000" // default gas price in wei, 5 gwei in this case
      }
    );
  },
  getReputation: address => {
    return web3Obj.contract.methods.getReputation(address);
  },
  getReputationHistory: async function(address) {
    let data = [];
    let promises = [];
    let voucheeEvents = await web3Obj.contract.getPastEvents("Vouched", {
      filter: {
        _vouchee: address
      },
      fromBlock: 0,
      toBlock: "latest"
    });
    console.log(voucheeEvents);

    let voucherEvents = await web3Obj.contract.getPastEvents("Vouched", {
      filter: {
        _voucher: address
      },
      fromBlock: 0,
      toBlock: "latest"
    });

    console.log("Voucher Events", voucherEvents);
    voucheeEvents.forEach(event => {
      let vouched = {};
      vouched["value"] = event.returnValues._vouchedAmount;
      vouched["from"] = event.returnValues._vouchee;
      vouched["to"] = event.returnValues._voucher;
      vouched["time"] = 0;
      data.push(vouched);
      promises.push(web3Obj.web3.eth.getBlock(event.blockNumber));
    });
    voucherEvents.forEach(event => {
      let vouched = {};
      vouched["value"] = event.returnValues._vouchedAmount;
      vouched["from"] = event.returnValues._vouchee;
      vouched["to"] = event.returnValues._voucher;
      vouched["time"] = 0;
      data.push(vouched);
      promises.push(web3Obj.web3.eth.getBlock(event.blockNumber));
    });
    let result = await Promise.all(promises);
    for (let i = 0; i < result.length; i++) {
      data[i]["time"] = result[i].timestamp;
    }
    data.sort(function(a, b) {
      return a.time > b.time ? -1 : 1;
    });
    return data;
  },
  getLeaderboard: function() {
    web3Obj.contract.methods
      .getAllMembers()
      .call()
      .then(function(data) {
        let list = [];
        for (let j = 0; j < data[0].length; j++)
          list.push({ address: data[0][j], reputation: data[1][j] });

        list.sort(function(a, b) {
          return a.reputation < b.reputation ? -1 : 1;
        });
        return list;
      });
  }
};

export default web3Obj;
