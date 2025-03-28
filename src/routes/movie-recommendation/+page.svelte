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

	function handleSubmit(event: Event) {
		event.preventDefault()
		userMessage = input
		structuredObject.submit(input)
		input = ''
	}
</script>

<svelte:head>
	<title>Flix AI</title>
</svelte:head>

<header class="bg-white">
	<div class="max-w-[1400px] mx-auto p-3 flex justify-between items-center">
		<img class="w-8" src="/images/popcorn_color.svg" alt="Popcorn logo" />
		<a class="text-slate-600 hover:underline" href="https://www.instagram.com/zaxwebs"
			>@zaxwebs</a
		>
	</div>
</header>

<main class="max-w-[1400px] mx-auto py-16">
	<section class="p-4 flex flex-col items-center max-w-xl mx-auto text-center">
		<h1 class="text-3xl font-[boldonse] text-pink-600 mb-6 leading-[1.4]">
			AI Movie Recommendations
		</h1>
		<p class="text-slate-700">
			Need movie recommendations? Just tell us what you're in the mood for, and we'll take
			care of the rest. Get suggestions based on genres, actors, or even specific movies—just
			like asking a friend!
		</p>
	</section>

	<section class="p-4 mb-6">
		<form class="flex gap-4 max-w-3xl mx-auto" on:submit={handleSubmit}>
			<Input
				type="text"
				placeholder="What kind of movie would you like to watch?"
				bind:value={input}
			/>
			<Button type="submit" disabled={structuredObject.loading}>Get Recommendations</Button>
		</form>
	</section>

	{#if structuredObject.object?.movies}
		<section class="p-4">
			<div class="grid grid-cols-2 gap-4">
				{#each structuredObject.object.movies as movie, i (i)}
					<RecommendationCard {movie} />
				{/each}
			</div>
		</section>
	{/if}
</main>
