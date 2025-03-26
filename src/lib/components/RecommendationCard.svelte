<script>
	import { Button } from '$lib/components/ui/button/index.js'
	import { Skeleton } from '$lib/components/ui/skeleton/index.js'

	let { movie } = $props()

	let details = $state()

	let hasLoadedEssentials = $derived(Boolean(movie?.description))
	let hasFetchedDetails = $state(false)

	const fetchDetails = async () => {
		const response = await fetch(
			`api/movie-details?name=${encodeURI(movie?.title)}&year=${movie?.releaseYear}`
		)
		details = await response.json()
	}

	$effect(() => {
		hasLoadedEssentials
		if (hasLoadedEssentials && !hasFetchedDetails) {
			fetchDetails()
			hasFetchedDetails = true
		}
	})
</script>

<div class="border rounded flex gap-6 bg-white overflow-hidden">
	{#if details}
		<img
			class=" w-40 aspect-[600/900] flex-shrink-0 block"
			src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + details?.poster_path}
			alt="poster"
		/>
	{:else}
		<Skeleton class=" w-40 aspect-[600/900] flex-shrink-0 block" />
	{/if}
	<div class="flex flex-col gap-4 justify-between p-4">
		<div class="space-y-1">
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
			<div class="italic text-slate-700">
				{movie?.recommendationReason}
			</div>
		</div>

		<div class="flex gap-4 items-center">
			{#if hasLoadedEssentials}
				<Button
					target="_blank"
					href="https://www.youtube.com/results?search_query={movie?.title} trailer"
					>Trailer
				</Button>
			{/if}
		</div>
	</div>
</div>
