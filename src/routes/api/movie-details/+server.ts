import { THEMOVIEDB_API_KEY } from '$env/static/private'

export const GET = async ({ url }) => {
	// Get query parameters from the URL
	const name = url.searchParams.get('name')
	const type = url.searchParams.get('type')
	const year = url.searchParams.get('year')

	// Build the endpoint URL for The Movie Database API
	const endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${THEMOVIEDB_API_KEY}&language=en-US&page=1&query=${name}`

	// Fetch data from the endpoint and convert to JSON
	const response = await fetch(endpoint)
	const json = await response.json()

	// Filter the results based on type and year
	const filtered = json.results.filter((result) => {
		const releaseYear =
			result.media_type === 'movie'
				? new Date(result.release_date).getFullYear()
				: new Date(result.first_air_date).getFullYear()

		// Ensure the year is valid and within ±1 year of the query
		return !isNaN(releaseYear) && Math.abs(releaseYear - year) <= 1
	})

	console.log(filtered[0])

	// Return the first filtered result as a response
	return new Response(JSON.stringify(filtered[0]))
}
