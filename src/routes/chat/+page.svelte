<script>
	import { Chat } from '@ai-sdk/svelte'

	const chat = new Chat()
</script>

<main class="flex flex-col items-center p-8 min-h-screen">
	<h1 class="text-2xl font-bold text-gray-800 mb-6">Simple Chat</h1>
	<ul class="w-full max-w-lg space-y-4">
		{#each chat.messages as message}
			<li class="p-4 rounded-lg border bg-white flex flex-col">
				<span class="font-semibold text-blue-600 mb-1">{message.role}:</span>
				<span class="text-gray-800">{message.content}</span>
			</li>
		{/each}
	</ul>
	<form onsubmit={chat.handleSubmit} class="w-full max-w-lg mt-8 flex space-x-4">
		<input
			bind:value={chat.input}
			class="flex-grow p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
			placeholder="Type your message..."
		/>
		<button
			type="submit"
			class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
		>
			Send
		</button>
	</form>
</main>
