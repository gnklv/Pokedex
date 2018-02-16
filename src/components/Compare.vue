<template>
	<div class="l-container">

		<pokedex>
			<template slot="content">

				<div class="c-pokemon-compare__control">
					<router-link 
						class="c-pokemon-compare__btn c-pokemon-compare__btn-back"
						:to="{ name: 'Index', params: { comparing: comparing } }"
					>
						Назад
					</router-link>
					<button 
						class="c-pokemon-compare__btn c-pokemon-compare__btn-rm-all"
						v-if="comparing.length > 0"
						@click="removeAllComparing"
					>
						Удалить список
					</button>
				</div>
				
				<div class="c-pokemon__compare-wrapper">
					<div class="c-pokemon__compare-item" v-for="pokemon in comparing">
						<article class="c-pokemon__item">
							<div class="c-pokemon__compare-content">
								
								<div class="c-pokemon__img-wrapper">
			            <img 
			            	class="c-pokemon__img" 
			            	:src="pokemon.sprites.front_default" 
			            	:alt="pokemon.name + '-front'"
			            	v-if="frontImg"
		            	>
			            <img 
			            	class="c-pokemon__img" 
			            	:src="pokemon.sprites.back_default" 
			            	:alt="pokemon.name + '-back'"
			            	v-if="!frontImg"
		            	>
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
			            <p class="c-pokemon__characters">
			            	Abilities:
			            	<span v-for="(abilities, index) in pokemon.abilities">
			            		{{ abilities.ability.name }}<template v-if="index < pokemon.abilities.length - 1">,</template>
			            	</span>
			            </p>
			            <p 
			            	class="c-pokemon__characters"
			            	v-for="stat in pokemon.stats"
		            	>
		            		{{ stat.stat.name }}:
		            		<span>{{ stat.base_stat }}</span>
		            	</p>
			          </div>

			          <button 
			          	class="c-pokemon__btn-remove"
			          	@click="removeComparing(pokemon.id)"
		          	></button>

							</div>
						</article>
					</div>
				</div>

			</template>

		</pokedex>

	</div>
</template>

<script>
import pokedex from "@/components/pokedex"

export default {
	name: "Compare",
	data() {
		return {
			comparing: [],
			frontImg: true
		}
	},
	methods: {
		getComparing() {
			this.comparing = this.$route.params.comparing;
			this.toggleImgs();
		},
		removeComparing(id) {
    	let removeIndex = _.findIndex(this.comparing, (o) => { return o.id === id });

			this.comparing.splice(removeIndex, 1);
    },
    removeAllComparing() {
    	this.comparing = [];
    },
    toggleImgs() {
    	setInterval(() => {
    		this.frontImg = !this.frontImg;
    	}, 2000)
    }
	},
	created() {
		this.getComparing();
	},
	components: {
		pokedex
	}
}
	
</script>