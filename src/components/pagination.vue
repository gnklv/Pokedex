<template>
	<div class="c-pokemon__pagination">
    <button 
      class="c-pokemon__arrow c-pokemon__arrow--prev" 
      :class="{ 'c-pokemon__arrow--disabled': !prev }"
      @click="changePage(prevPage, perPage)"
    ></button>
    <label class="c-pokemon__goto">
      Перейти на
      <input 
        class="c-pokemon__input" 
        type="number" 
        v-model="current"
        @keyup.enter="changePage(current, perPage)"
      >
      из {{ totalPages }}
    </label>
    <label class="c-pokemon__goto">
      Показывать по
      <select 
        class="c-pokemon__input" 
        v-model="perPage"
        @change="changePage(current, perPage)"
      >
        <option 
          v-for="item in showBy"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
    </label>
		<button 
      class="c-pokemon__arrow c-pokemon__arrow--next" 
      :class="{ 'c-pokemon__arrow--disabled': !next }"
      @click="changePage(nextPage, perPage)"
    ></button>
  </div>
</template>

<script>
export default {
	name: "pagination",
	props: {
		current: {
			type: Number,
			default: 1
		},
		perPage: {
			type: Number,
			default: 10
		},
		totalPokemons: {
			type: Number,
			default: 0
		},
		next: {
			type: String,
			default: ""
		},
		prev: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			showBy: [10, 20, 30, 40, 50]
		}
	},
	methods: {
		changePage(page, perPage) {
			page = parseInt(page, 10);
      if (page > 0 && page <= this.totalPages ) {

        this.$emit('page-changed', page, perPage)

      }
		}
	},
	computed: {
		prevPage() {
      return parseInt(this.current, 10) - 1
    },
    nextPage() {
      return parseInt(this.current, 10) + 1
    },
    totalPages() {
      return Math.ceil(this.totalPokemons / this.perPage)
    }
	}
}
</script>