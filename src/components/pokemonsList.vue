<template>
	<div>
		<div class="l-row" v-for="row in rowInOrderedPokemons">
	    <div class="l-col--sm-6" v-for="pokemon in row">
	      <article class="c-pokemon__item">
	        <div class="c-pokemon__content">
	          <div class="c-pokemon__comparing">
							
	            <button 
	              class="c-pokemon__btn-add"
	              v-if="!pokemon.comparing"
	              @click="setComparing(pokemon.id)"
	            ></button>
							
	            <button 
	              class="c-pokemon__btn-remove"
	              v-if="pokemon.comparing"
	              @click="setComparing(pokemon.id)"
	            ></button>

	          </div>

	          <div class="c-pokemon__img-wrapper">
	            <img class="c-pokemon__img" :src="pokemon.sprites.front_default" :alt="pokemon.name">
	          </div>

	          <div class="c-pokemon__text-wrapper">
	            <p class="c-pokemon__id">
	              #{{ pokemon.id }}
	            </p>
	            <p class="c-pokemon__name">
	              Name: <span>{{ pokemon.name }}</span>
	            </p>
	            <p class="c-pokemon__characters">
	              Weight: <span>{{ pokemon.weight }}</span>
	            </p>
	            <p class="c-pokemon__characters">
	              Height: <span>{{ pokemon.height }}</span>
	            </p>
	            <p class="c-pokemon__characters">
	            	Types:
		            <span v-for="(types, index) in pokemon.types">
		            	{{ types.type.name }}<template v-if="index < pokemon.types.length - 1">,</template>
		            </span>
	            </p>
	          </div>
	        </div>
	      </article>
	    </div>
	  </div>
		
		<pagination 
			:current="currentPage"
			:perPage="perPage"
			:totalPokemons="totalPokemons"
			:next="next"
			:prev="prev"
			@page-changed="loadPokemons"
		></pagination>
	</div>
</template>

<script>
import pagination from "@/components/pagination"

const Pokedex = require('pokeapi-js-wrapper');
const pokedexOptions = {
  protocol: 'https',
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cache: true
}
const P = new Pokedex.Pokedex(pokedexOptions);

export default {
	name: 'pokemonsList',
	data() {
		return {
			pokemons: [],
			currentPage: 1,
			totalPokemons: 0,
			prev: null,
			next: null,
			perPage: 10,
			comparingPokemons: [],
			addedToCompare: null,
			removedFromCompare: null
		}
	},
	methods: {
    loadPokemons(page, perPage) {

      let interval = {
        limit: perPage,
        offset: (page - 1) * perPage
      }

      this.pokemons = [];
      if (this.$route.params.comparing) {
      	this.comparingPokemons = this.$route.params.comparing;
      }

      P.getPokemonsList(interval).then(response => {
        this.currentPage = page;
        this.perPage = perPage;
      	this.totalPokemons = response.count;
        this.prev = response.previous;
        this.next = response.next;

        _.forEach(response.results, (value) => {

          P.getPokemonByName(value.name).then(response => {
          	response.comparing = false;

          	if (this.comparingPokemons.length > 0) {

          		_.forEach(this.comparingPokemons, (i) => {
          			if (i.id === response.id) {
          				response.comparing = true;
          			}
          		})
        		}

            this.pokemons.push(response);
          });

        });
      })
    },
    setComparing(id) {
    	let index = _.findIndex(this.pokemons, (o) => { return o.id === id }),
					removeIndex = _.findIndex(this.comparingPokemons, (o) => { return o.id === id });

			this.pokemons[index].comparing = !this.pokemons[index].comparing;

			if (removeIndex < 0) {
				this.comparingPokemons.push(this.pokemons[index]);
				this.removedFromCompare = null;
				this.addedToCompare = this.pokemons[index];
			} else {
				this.addedToCompare = null;
				this.removedFromCompare = this.pokemons[index];
				this.comparingPokemons.splice(removeIndex, 1);
			}

			this.giveComparings();
    },
    giveComparings() {
    	this.$emit('give-comparings', this.comparingPokemons, this.addedToCompare, this.removedFromCompare);
    }
  },
  computed: {
    orderedPokemons() {
      return _.orderBy(this.pokemons, 'id')
    },
    rowInOrderedPokemons() {
      return _.chunk(this.orderedPokemons, 2);
    }
  },
  created() {
    this.loadPokemons(this.currentPage, this.perPage);
  },
  components: {
  	pagination
  }
}
</script>