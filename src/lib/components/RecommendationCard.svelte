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

<div class="border rounded p-4 flex gap-6">
	{#if details}
		<img
			class="rounded w-40 aspect-[600/900] flex-shrink-0 block border border-gray-100"
			src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + details?.poster_path}
			alt="poster"
		/>
	{:else}
		<Skeleton
			class="rounded w-40 aspect-[600/900] flex-shrink-0 block border border-gray-100"
		/>
	{/if}
	<div class="flex flex-col gap-4 justify-between">
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
