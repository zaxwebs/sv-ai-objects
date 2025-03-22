<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js'
	import { Textarea } from '$lib/components/ui/textarea/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { Experimental_StructuredObject } from '@ai-sdk/svelte'
	import { movieSchema } from '../../schemas/movieSchema'

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

<main class="max-w-6xl mx-auto">
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
				<div class="border rounded p-4">
					<div class="space-y-2">
						<div>
							<span class="text-lg font-semibold">
								{movie?.title}
							</span>
							<span class="text-sm text-gray-500">
								{movie?.releaseYear}
							</span>
						</div>

						<div>
							{movie?.description}
						</div>
						<div>
							{movie?.recommendationReason}
						</div>
						{#if movie?.recommendationReason}
							<Button
								target="_blank"
								href="https://www.youtube.com/results?search_query={movie?.title} trailer"
								>Trailer
							</Button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>
