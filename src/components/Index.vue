<template>
  <div class="l-container">
    
    <transition name="slide">
      <informer
        v-if="isShowInfo" 
        :listComparing="comparingsPokemons"
        :added="addedToCompare"
        :removed="removedFromCompare"
        @close-info="closeInfo"
      ></informer>
    </transition>

    <pokedex>
      
      <template slot="content">
        <pokemons-list @give-comparings="getComparings"></pokemons-list>
      </template>

    </pokedex>
  </div>
</template>

<script>
import pokedex from "@/components/pokedex"
import pokemonsList from "@/components/pokemonsList"
import informer from "@/components/informer"

export default {
  name: 'Index',
  data () {
    return {
      comparingsPokemons: [],
      addedToCompare: null,
      removedFromCompare: null,
      isShowInfo: false
    }
  },
  methods: {
    getComparings(arr, added, removed) {
      this.comparingsPokemons = arr;
      this.addedToCompare = added;
      this.removedFromCompare = removed;

      this.isShowInfo = true;
    },
    closeInfo(bool) {
      this.isShowInfo = bool;
    }
  },
  components: {
    pokedex,
    pokemonsList,
    informer
  }
}
</script>