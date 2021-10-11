<script>
    import { onMount, getContext } from 'svelte';
	import Item from './Item.svelte';

    export let items;
    export let title;
    export let content;
	export let params;

	const { toPage, pages } = getContext('nav');
$:console.log({params})


</script>

<div class="centered">
	<div class="centered">
		<div class="wartegg">
			<div class="titles row">
				{#each items as item}
					<div class="title">{item.id}</div>
				{/each}
			</div>
			<div class="elements row">
				{#each items as data}
					<Item dataUrl={data.dataUrl} render=true></Item>
				{/each}
			</div>
		</div>
		<div>
			{#each items as item}
				<p><i><b>{item.id}.</b> {item.title || '-- no description --'}</i></p>
			{/each}
		</div>
		<div class="explanation">
			<p>
				<b>{title}</b>
				{content}
			</p>
		</div>
	</div>
</div>

<div class="nav">
	<div class="nav__group--left">
		{#if +params.index > 0}
			<button class="nav__btn btn" on:click={() => toPage(+params.index - 1)}>Previous</button>
		{/if}
	</div>
	<div class="nav__group--right">
	{#if +params.index < pages.length - 1}
		<button class="nav__btn btn" on:click={() => toPage(+params.index + 1)}>Next</button>
	{/if}
	</div>
</div>

<style>
	.centered {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.elements {
		user-select: none;
		background-color: black;
	}

	main {
		margin: 0 auto;
		max-width: 1024px;
	}

	.title {
		font-size: 2rem;
		text-align: center;
		color: crimson;
		flex: 1 0 200px;
	}

	.row {
		padding: 1.5rem;
		display: flex;
		column-gap: 1.5rem;
		width: fit-content;
	}

	.titles {
		padding: 0 1.5rem;
		display: flex;
	}
</style>