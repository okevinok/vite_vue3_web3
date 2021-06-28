<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <div id="app">
    <img alt="Vue logo" src="../assets/header-rabobank-innovation.png" />
    <button v-if="!currentAccount" v-on:click="connect()">
      Connect with MetaMask
    </button>
    <div v-if="provider" class="welcome">Welcome {{ currentAccount }}</div>
    <div v-else class="welcome">
      Please connect your Metamask to use the full website
    </div>
    <Listings :listings="listings" @buyProperty="buyProperty"></Listings>
  </div>
</template>

<script>
import Listings from "../components/Listings.vue";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Listings,
  },
  data() {
    return {
      count: 0,
      provider: {},
      web3: "",
      currentAccount: "",
      listings: [],
      contractAddress: "0x8AD0596aA5b930cEe20C6561a1bEd76979273ed8",
      abi: "",
    };
  },
  async mounted() {
    this.provider = await detectEthereumProvider();
    console.log(this.provider);
    if (this.provider) {
      this.web3 = new Web3(Web3.givenProvider);
      await this.provider
        .request({ method: "eth_accounts" })
        .then(this.handleAccountsChanged)
        .catch((err) => {
          console.error(err);
        });
      if (this.provider.chainId === "0x1") {
        alert("This is a test app. Please do not use the main network.");
      }
    } else {
      console.log("Please install MetaMask!");
    }
  },
  methods: {
    handleAccountsChanged: function (accounts) {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.", accounts);
      } else if (accounts[0] !== this.currentAccount) {
        this.currentAccount = this.web3.utils.toChecksumAddress(accounts[0]);
        console.log(this.currentAccount);
        this.setAbi();
        this.getListings();
      }
    },
    setAbi: function () {
      this.abi = new this.web3.eth.Contract(
        JSON.parse(
          '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_by","type":"address"},{"indexed":true,"internalType":"bytes32","name":"_property","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Buy","type":"event"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"properties","outputs":[{"internalType":"uint256","name":"minted","type":"uint256"},{"internalType":"uint256","name":"available","type":"uint256"},{"internalType":"uint256","name":"pricePerUnit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"propertyIds","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"propertyId","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyProperty","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"propertyId","type":"bytes32"},{"internalType":"address","name":"owner","type":"address"}],"name":"getPropertyForOwner","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPropertyIds","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"}]'
        ),
        this.web3.utils.toChecksumAddress(this.contractAddress),
        {
          from: this.currentAccount,
        }
      );
    },
    getListings: function () {
      this.abi.methods
        .getPropertyIds()
        .call()
        .then((results) => {
          this.listings = [];
          results.forEach((propertyId) => {
            this.abi.methods
              .getPropertyForOwner(propertyId, this.currentAccount)
              .call()
              .then((propertyInformation) => {
                this.listings.push({
                  id: propertyId,
                  owned: propertyInformation[0],
                  totalMinted: propertyInformation[1],
                  available: propertyInformation[2],
                  unitPrice: propertyInformation[3],
                });
              });
          });
        });
    },
    buyProperty(propertyInformation) {
      console.log(
        "buying property " +
          propertyInformation.id +
          " for " +
          propertyInformation.unitPrice
      );

      this.abi.methods
        .buyProperty(propertyInformation.id, 1)
        .send({ value: propertyInformation.unitPrice })
        .on("error", function (error) {
          console.error(error);
        })
        .on("transactionHash", function (transactionHash) {
          console.log("transaction hash " + transactionHash);
        })
        .on("receipt", function (receipt) {
          console.log("receipt", receipt); // contains the new contract address
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log("confirmation", confirmationNumber, receipt);
        })
        .then((result) => {
          console.log("result", result);
          this.getListings();
        });
    },
    connect: function () {
      this.provider
        .request({ method: "eth_requestAccounts" })
        .then(this.handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
      console.log("connected with account " + this.currentAccount);
    },
  },
};
</script>
