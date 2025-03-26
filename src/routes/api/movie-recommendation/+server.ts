import { streamObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { env } from '$env/dynamic/private'
import { movieSchema } from '../../../schemas/movieSchema'

const openai = createOpenAI({
	apiKey: env?.OPENAI_API_KEY,
})

export async function POST({ request }) {
	const context = await request.json()

	const result = streamObject({
		model: openai('gpt-4o-mini'),
		schema: movieSchema,
		prompt: `Generate 4 movie recommendations based on this context:` + context,
		onError: (error) => {
			console.error(error)
		},
	})

	return result.toTextStreamResponse()
}
