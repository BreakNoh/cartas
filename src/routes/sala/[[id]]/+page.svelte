<script lang="ts">
	import { id_sala, nome_player } from '$lib/stores.js';
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		nome_player.set(data.player || '');
		id_sala.set(data.id_sala || '');
	});
</script>

lobby {data.id_sala}

{#if data.players}
	{data.players}
{/if}

<form action="?/sair" method="POST">
	<input type="text" name="nome" value={$nome_player} hidden />
	<button>sair</button>
</form>
