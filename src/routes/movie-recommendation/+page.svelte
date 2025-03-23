<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { Experimental_StructuredObject } from '@ai-sdk/svelte'
	import { movieSchema } from '../../schemas/movieSchema'
	import RecommendationCard from '$lib/components/RecommendationCard.svelte'

	const structuredObject = new Experimental_StructuredObject({
		api: '/api/movie-recommendation',
		schema: movieSchema,
	})
	let input = $state('')
	let userMessage = $state('')

	function handleSubmit(e: Event) {
		userMessage = input
		e.preventDefault()
		structuredObject.submit(input)
		input = ''
	}
</script>

<main class="max-w-[1400px] mx-auto">
	<section class="p-4">
		<form
			class="flex gap-4 max-w-3xl mx-auto"
			onsubmit={(e) => {
				e.preventDefault()
				handleSubmit(e)
			}}
		>
			<Input
				type="text"
				placeholder="What kind of movie would you like to watch?"
				bind:value={input}
			/>
			<Button type="submit" disabled={structuredObject.loading}>Get Recommendations</Button>
		</form>
	</section>
	<section class="p-4">
		<div class="grid grid-cols-2 gap-4">
			{#each structuredObject.object?.movies ?? [] as movie, i (i)}
				<RecommendationCard {movie} />
			{/each}
		</div>
	</section>
</main>
