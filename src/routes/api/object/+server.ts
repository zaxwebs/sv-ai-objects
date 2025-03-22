import { streamObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { z } from 'zod'
import { env } from '$env/dynamic/private'
import { notificationSchema } from '../../../schemas/notificationSchema'

const openai = createOpenAI({
	apiKey: env?.OPENAI_API_KEY,
})

export async function POST({ request }) {
	const context = await request.json()

	const result = streamObject({
		model: openai('gpt-4o-mini'),
		schema: notificationSchema,
		prompt: `Generate 3 notifications for a messages app in this context:` + context,
		onError: (error) => {
			console.error(error)
		},
	})

	return result.toTextStreamResponse()
}
