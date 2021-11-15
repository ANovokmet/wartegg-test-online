<script>
    import { getContext } from 'svelte';
	import { navigate } from 'svelte-routing';
	import Item from './Item.svelte';
	import { BASE_PATH } from './config';

    export let items;
	export let params;

	const { toPage, pages } = getContext('nav');
</script>

<div class="centered">
	<div class="wartegg">
		<div class="titles row">
			{#each items.slice(0, 4) as item}
				<div class="title">{item.id}</div>
			{/each}
		</div>
		<div class="elements row" style="padding-bottom: 0;">
			{#each items.slice(0, 4) as data}
				<Item dataUrl={data.dataUrl} render=true></Item>
			{/each}
		</div>
		<div class="elements row">
			{#each items.slice(4, 8) as data}
				<Item dataUrl={data.dataUrl} render=true></Item>
			{/each}
		</div>
		<div class="row titles">
			{#each items.slice(4, 8) as item}
				<div class="title">{item.id}</div>
			{/each}
		</div>
	</div>
	<div>
		<p>
			Scribblings: in general it reflects inadequate sensitivity to the appeal and indifference to the task which the person faces; possible problems socializing because he doesn’t try to satisfy reasonable standards.
		</p>
		<ul>
			<li>Heavy pressure + dominance of angles = tension, aggression, hostility, problems with interpersonal relationships</li>
			<li>Soft pressure + dominance of curves = more control over feelings</li>
		</ul>
		<p>
			Abstractions: in general it reflects a tendency to avoid life tasks, interpersonal communication problems, especially as a consequence of strong personal opinions held about matters, and there is no attempt to understand the other’s point of view.
		</p>
		<p>
			Pictures animate nature (person and animals) = identification with the world, adequate actualization of intelligence
		</p>
		<p>
			Predominance of human figures = potential for identifying with others; readiness to participate in interpersonal relationships; strives to be accepted
		</p>
		<p>
			Animal figures predominate = problems with interpersonal relationships
		</p>
		<p>
			Inanimate nature (foliage, landscapes) = disposed to and interested in practical matters and a sense of reality
		</p>
		<p>
			Exclusively objects = unfavorable, unilateral relationship with things at the cost of communicating with others
		</p>
		<p>
			Atmosphere = possible good humor; indulgent; dreaminess Symbolism (reproduction of values, ideas, e.g. emblems, a cross, flags) = an indication of the values, beliefs and goals. 1 or 2 can indicate good abilities, but more refer to orientation problems.
		</p>

	</div>
</div>

<div class="nav">
	{#if +params.index > 0}
		<button class="nav__btn btn" on:click={() => toPage(+params.index - 1)}>Previous</button>
	{/if}
	<button class="nav__btn btn" on:click={() => navigate(BASE_PATH)}>Draw again</button>
	{#if +params.index < pages.length - 1}
		<button class="nav__btn btn" on:click={() => toPage(+params.index + 1)}>Next</button>
	{/if}
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