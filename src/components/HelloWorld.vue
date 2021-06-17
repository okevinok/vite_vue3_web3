<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
// import * as Web3 from 'web3';

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      provider: {},
      web3: "",
    };
  },
  // async mounted() {
  //   this.provider = await detectEthereumProvider();
  //   console.log(this.provider);
  //   if (this.provider) {
  //     this.web3 = new Web3(Web3.givenProvider);
  //     await this.provider
  //       .request({ method: "eth_accounts" })
  //       .then(this.handleAccountsChanged)
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //     if (this.provider.chainId === "0x1") {
  //       alert("This is a test app. Please do not use the main network.");
  //     }
  //   } else {
  //     console.log("Please install MetaMask!");
  //   }
  // },
  methods: {
    handleAccountsChanged: function (accounts) {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== this.currentAccount) {
        this.currentAccount = this.web3.utils.toChecksumAddress(accounts[0]);
        console.log(this.currentAccount);
        // this.setAbi();
        // this.getListings();
      }
    },
  }
};
</script>
