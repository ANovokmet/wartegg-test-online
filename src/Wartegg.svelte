<script>
	import Item from './Item.svelte';
	import { navigate } from "svelte-routing";
	import { getContext, tick } from 'svelte';
	
    export let items;
	let edit = true;

	let order = 1;
	function onStartDrawing(data) {
		data.order = order++;
		items = items;
	}

	const { emitEvent } = getContext('events');

	async function onSubmit() {
		emitEvent({type: 'save'});
		await tick();
		navigate('/results/c/0');
	}

</script>

<h1>Wartegg test</h1>
<p>
	Subjects are instructed to complete the eight drawings, incorporating the given sign into the drawing. Like other projective drawing tests, Wartegg's test is based on the assumption that the content and the qualitative aspects of the drawings reflect the personality of the person drawing.
</p>
<div class="centered">

	<p>
		Below are 8 squares with different lines or points that are to be integrated into any idea you may have. This is not a drawing 
		test; therefore artistic talent does not count at all. You do not have to start in square ‘’A’’ and finish in square ‘’H’’. You may 
		start in the square of your choice and identify the square as #1; in the second square, indicate #2 and so on until you have 
		completed all 8 squares. <b>It is important to draw spontaneously and not artistically.</b>
	</p>

	<div class="wartegg">
		<div class="titles row">
			{#each items.slice(0, 4) as item}
				<div class="title">{item.id}</div>
			{/each}
		</div>
		<div class="elements row elements--first" style="">
			{#each items.slice(0, 4) as data (data.id)}
				<Item dataInit={data.init} 
					bind:dataUrl={data.dataUrl} 
					{edit} 
					on:startDrawing={() => onStartDrawing(data)}>
				</Item>
			{/each}
		</div>
		<div class="elements row">
			{#each items.slice(4, 8) as data (data.id)}
				<Item dataInit={data.init} 
					bind:dataUrl={data.dataUrl} 
					{edit}
					on:startDrawing={() => onStartDrawing(data)}>
				</Item>
			{/each}
		</div>
		<div class="row titles">
			{#each items.slice(4, 8) as item}
				<div class="title">{item.id}</div>
			{/each}
		</div>
	</div>

	<p>
		Next to each letter below, briefly describe your drawing in that square.  In the right-hand column, write the sequence number 
		that you drew in (eg. if your first drawing was done in ‘’F’’, briefly describe your drawing next to ‘’F’’, in the right-hand column 
		of ‘’F’’, write #1 since that is the first square you drew something in.  If your second drawing was done in ‘’H’’, briefly 
		describe your drawing next to ‘’H’’ and in the right-hand column of ‘H’, write #2, and so on).  
	</p>


	<div class="form">
		{#each items as item}
			<div class="form_group">
				<label class="form_group__label">{item.id}.</label>
				<input class="form_group__input" type="text" bind:value={item.title}>
				{#if item.order}
				<div class="form_group__suffix">#{item.order}</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
<div class="next centered">
	<button class="btn" on:click={onSubmit}>
		Submit
	</button>
</div>

<style>

	.wartegg {
		display: flex;
		flex-wrap: wrap;
	}

	.form {
		width: 100%;
		max-width: 600px;
		color: var(--c-crimson);
	}

	.form_group {
		display: flex;
		margin-bottom: 0.5rem;
	}

	.form_group__label {
		flex: 0 0 1rem;
    	margin-right: 0.2rem;
	}

	.form_group__input {
		flex: 1 1 0;
		height: 1rem;
		font-size: 1rem;
		padding: 0.25rem 0.5rem;
    	font-style: italic;
	}

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
		color: var(--c-crimson);
		flex: 1 0 200px;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.row {
		padding: 1.5rem;
		display: flex;
		column-gap: 1.5rem;
		row-gap: 1.5rem;
		width: fit-content;
	}

	.elements--first {
		padding-bottom: 0;
	}

	.titles {
		padding: 0 1.5rem;
		display: flex;
	}

	@media only screen and (max-width: 992px) {
		.row {
			flex-direction: column;
		}

		.titles {
			padding: 1.5rem 1rem;
			display: flex;
		}

		.elements--first {
			padding-right: 0;
		}
	}

	
	@media only screen and (min-width: 992px) {
		.wartegg {
			
			flex-direction: column;
		}
	}

	@media only screen and (max-width: 575.98px) {

		.elements {
			padding: 1.5rem;
		}
	}
</style>