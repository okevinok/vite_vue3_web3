<template>
  <div  v-on:click="$emit('buyProperty', priceInformation)" class="listingItem" >
    <img class="image" :src="property.image"  :alt="property.street"/>
    <div class="properties">
      <div class="row"><div class="property">Address</div>{{ property.street }} {{ property.houseNumber}}</div>
      <div class="row"><div class="property">City</div>{{ property.city}}</div>
      <div class="row"><div class="property">Postcode</div>{{ property.postalCode}}</div>
      <div class="row"><div class="property">Built in</div>{{ property.builtIn}}</div>
      <div class="row"><div class="property">Bedrooms</div>{{ property.bedrooms}}</div>
      <div class="row"><div class="property">Bathrooms</div>{{ property.bathrooms}}</div>
      <div class="row price"><div class="property">Price</div>{{ getPriceString()}}</div>
      <div class="row price"><div class="property">Available</div>{{ getPercentAvailable()}}</div>
      <div class="row price"><div class="property">Owned</div>{{ getPercentOwned()}}</div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "Listing",
  props: {
    property: Object,
    priceInformation: Object
  },
  methods: {
    getPriceString: function () {
      if(this.priceInformation.available === 0){
        return "SOLD"
      }
      if(this.priceInformation.totalMinted && this.priceInformation.unitPrice) {
        return "Ξ" + this.priceInformation.unitPrice / 1000000000000000000 + " per " + (1 / this.priceInformation.totalMinted * 100) + "%"
      }
      return "Soon"
    },
    getPercentAvailable: function (){
      return (this.priceInformation.available / this.priceInformation.totalMinted * 100) + '%'
    },
    getPercentOwned: function (){
      return (this.priceInformation.owned / this.priceInformation.totalMinted * 100) + '%'
    },
  }
}

</script>

<style scoped>
.listingItem{
  margin: 10px;
  min-width: 390px;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  background-color: #101829;
  color: white;

}

.image{
  height: 181px;
  width: 150px;
  object-fit: cover;
}

.properties {
  padding: 5px 0px;
  flex-grow: 3;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.row {
  display: flex;
  flex-direction: row;
}

.property {
  width: 120px;
}

.price {
  color: #00CEC7;
}

</style>
