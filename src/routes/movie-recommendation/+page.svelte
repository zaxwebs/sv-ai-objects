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

<svelte:head>
	<title>Flix AI</title>
</svelte:head>

<main class="max-w-[1400px] mx-auto">
	<section class="p-4 py-8 flex flex-col items-center max-w-xl mx-auto text-center">
		<div class="flex items-center gap-2 mb-6">
			<img class="w-14" src="/images/popcorn_color.svg" alt="popcorn" />
			<h1 class="text-4xl font-bold font-[boldonse] text-pink-600">Flix AI</h1>
		</div>
		<p class="text-slate-700">
			Need movie recommendations? Simply tell us what you're in the mood for and we'll take
			care of the rest. You can ask for recommendations based on genres, actors, or even
			specific movies — just like asking a friend.
		</p>
	</section>
	<section class="p-4 mb-6">
		<form
			class="flex gap-4 max-w-3xl mx-auto"
			onsubmit={(e) => {
				e.preventDefault()
				handleSubmit(e)
			}}
		>
			<Input
				type="text"
				placeholder="What kinda movie would you like to watch?"
				bind:value={input}
			/>
			<Button type="submit" disabled={structuredObject.loading}>Get Recommendations</Button>
		</form>
	</section>
	{#if structuredObject.object?.movies}
		<section class="p-4">
			<div class="grid grid-cols-2 gap-4">
				{#each structuredObject.object?.movies ?? [] as movie, i (i)}
					<RecommendationCard {movie} />
				{/each}
			</div>
		</section>
	{/if}
</main>
