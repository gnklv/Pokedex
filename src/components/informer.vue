<template>
	<div class="c-informer">
		<div class="l-container">
			
			<div class="c-informer__inner">
				
				<div class="c-informer__content">
					<img 
						class="c-informer__img" 
						:src="added.sprites.front_default" 
						:alt="added.name"
						v-if="added"
					>
					<img 
						class="c-informer__img" 
						:src="removed.sprites.front_default" 
						:alt="removed.name"
						v-if="removed"
					>
					<div class="c-informer__text-wrapper">
						<p 
							class="c-informer__heading"
							v-if="added"
						>
							Покемон <span>#{{ added.id }} {{ added.name }}</span> добавлен к сравнению
						</p>
						<p 
							class="c-informer__heading"
							v-if="removed"
						>
							Покемон <span>#{{ removed.id }} {{ removed.name }}</span> удален из сравнения
						</p>
						<p class="c-informer__desc">
							В списке сравнения {{ listComparing.length }} покемонов
						</p>
					</div>
				</div>

				<div class="c-informer__control">
					<router-link
						class="c-informer__goto"
						v-if="listComparing.length > 0" 
						:to="{ name: 'Compare', params: { comparing: listComparing } }"
					>
						Сравнить
					</router-link>
					<button 
						class="c-informer__close"
						@click="closeInfo"
					></button>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: "informer",
	props: {
		listComparing: {
			type: Array,
			default: []
		},
		added: {
			type: Object,
			default: null
		},
		removed: {
			type: Object,
			default: null
		}
	},
	methods: {
		closeInfo() {
			this.$emit('close-info', false);
		}
	}
}
</script>