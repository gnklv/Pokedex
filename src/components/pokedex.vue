<template>
	<section class="l-section">

		<div class="c-pokemon__list">
			<div class="c-pokemon__header">
        <div class="c-pokemon__btn-lg"></div>
        <div class="c-pokemon__btn-sm c-pokemon__btn-sm--red"></div>
        <div class="c-pokemon__btn-sm c-pokemon__btn-sm--green"></div>
        <div class="c-pokemon__btn-sm c-pokemon__btn-sm--yellow"></div>
      </div>
			
			<slot name="content"></slot>
		</div>

	</section>
</template>

<script>

export default {
	name: 'pokedex'
}
</script>