<template>
  <div class="listings">
    <Listing v-for="priceInformation in listings"
             :key="priceInformation.id"
             :priceInformation="priceInformation"
             :property="properties[priceInformation.id]"
             @buyProperty="buyProperty"
    ></Listing>
  </div>
</template>

<script>
import Listing from "./Listing.vue";

export default {
  name: "Listings",
  components: {Listing},
  props: {
    listings: Array,
  },
  data: function () {
    return  {
      properties: {
        "0x1b0450c9113984838b0f192846698e45b0e85d1039eefe0274586b7200100f11": {
          street: "Korte Jansstraat",
          houseNumber: "5",
          image: "house_1.jpg",
          city: "Utrecht",
          postalCode: "3512 GM",
          builtIn: 1628,
          bedrooms: 5,
          bathrooms: 3,
        } ,
        "0xdcf8edea6da4b6d5368e760b3fb1acae9678f2dfac797c068890d459780358d1": {
          street: "Stadhuisbrug",
          houseNumber: "3",
          image: "house_2.jpg",
          city: "Utrecht",
          postalCode: "3511 KP",
          builtIn: 1999,
          bedrooms: 3,
          bathrooms: 1,
        },
        "0xf3130d0e39412304dcdbec9c71f9c0f2a1cd9838120dbf74b78d66078e9dd7d0": {
          street: "Korte Nieuwstraat",
          houseNumber: "14",
          image: "house_3.jpg",
          city: "Utrecht",
          postalCode: "3512 NM",
          builtIn: 1992,
          bedrooms: 6,
          bathrooms: 2
        },
        "0x1b0c6a7632f3f13a78cddcb36499d5215aaf3b9629eba5565e4b74465e1d685d":  {
          street: "Edisonstraat",
          houseNumber: "11",
          image: "house_4.jpg",
          city: "Utrecht",
          postalCode: "3553 BK",
          builtIn: 1968,
          bedrooms: 4,
          bathrooms: 2
        },
        "0x83ecd5995e0e944e5d67e85b40de9569b6afe4b5ffd5c15b8147e0c148719de9": {
          street: "Stationsplein",
          houseNumber: "20",
          image: "house_5.jpg",
          city: "Utrecht",
          postalCode: "3511 ED",
          builtIn: 2017,
          bedrooms: 2,
          bathrooms: 1
        },
        "0xac6c3daadcbdc6a0b5784e8fc370ff726e97b6da91a1787c0fc4cb429e8c6c86": {
          street: "Marnixlaan",
          houseNumber: "21",
          image: "house_6.jpg",
          city: "Utrecht",
          postalCode: "3552 HB",
          builtIn: 2001,
          bedrooms: 2,
          bathrooms: 1
        }
      }
    }
  },
  methods: {
    buyProperty (value) {
      this.$emit('buyProperty', value)
    }
  }
}

</script>

<style scoped>
.listings{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin: auto;
}
</style>
