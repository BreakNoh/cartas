<script lang="ts">
	let { lobby = '' } = $props();
</script>

<form action="/sala?/criar" method="POST">
	<label for="">nome</label>
	<input type="text" name="nome" />
	<button>criar lobby</button>
</form>

<form action={'/sala?/entrar'} method="POST">
	<label for="">nome</label>
	<input type="text" name="nome" />
	<label for="">lobby</label>
	<input type="text" name="lobby" />
	<button>entrar em lobby</button>
</form>
