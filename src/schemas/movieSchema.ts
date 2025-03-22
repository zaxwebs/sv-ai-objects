import { z } from 'zod'

export const movieSchema = z.object({
	movies: z.array(
		z.object({
			title: z.string().describe('Title of the movie.'),
			releaseYear: z.number().describe('Year the movie was released.'),
			description: z.string().describe('Brief description of the movie.'),
			recommendationReason: z
				.string()
				.describe('Brief reason for why the movie is recommended.'),
		})
	),
})
