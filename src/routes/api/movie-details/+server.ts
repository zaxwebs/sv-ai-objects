import { THEMOVIEDB_API_KEY } from '$env/static/private'

export const GET = async ({ url }) => {
	// Get query parameters from the URL
	const name = url.searchParams.get('name')
	const type = url.searchParams.get('type') // 'movie' or 'tv'
	const year = Number(url.searchParams.get('year')) // Convert to number

	// Build the endpoint URL for The Movie Database API
	const endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${THEMOVIEDB_API_KEY}&language=en-US&page=1&query=${encodeURIComponent(
		name
	)}`

	try {
		// Fetch data from the endpoint and convert to JSON
		const response = await fetch(endpoint)
		const json = await response.json()

		if (!json.results || json.results.length === 0) {
			return new Response(JSON.stringify({ error: 'No results found' }), { status: 404 })
		}

		// Process and sort results based on closest year (lower years take priority in ties)
		const sortedResults = json.results
			.map((result) => {
				const releaseYear =
					result.media_type === 'movie'
						? new Date(result.release_date || '').getFullYear()
						: new Date(result.first_air_date || '').getFullYear()

				return {
					...result,
					releaseYear,
					yearDifference: isNaN(releaseYear) ? Infinity : Math.abs(releaseYear - year),
				}
			})
			.filter((r) => !isNaN(r.releaseYear)) // Remove invalid years
			.sort((a, b) => a.yearDifference - b.yearDifference || a.releaseYear - b.releaseYear)

		// Return the closest result
		return sortedResults.length > 0
			? new Response(JSON.stringify(sortedResults[0]))
			: new Response(JSON.stringify({ error: 'No matching results' }), { status: 404 })
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 })
	}
}
