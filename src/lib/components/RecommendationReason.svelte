<script>
	let { reason } = $props()
</script>

{#if reason}
	<div class="border rounded p-2 bg-green-50 border-green-100">
		<div class="italic text-green-800">
			{reason}
		</div>
	</div>
{/if}
