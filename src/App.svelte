<script>
	import Wartegg from './Wartegg.svelte';
	import ResultsAll from './ResultsAll.svelte';
	import ResultsSeveral from './ResultsSeveral.svelte';
	import Pages from './Pages.svelte';
	import NavButton from './NavButton.svelte';
	import { line, curve, subject } from './util';
  	import { Router, Link, Route } from "svelte-routing";
  	export let url = "";

    const strokeStyle = "black";
    const lineWidth = 2;
 
	let items = [
		{
			id: 'A',
			init(ctx) {
				ctx.beginPath();
				ctx.fillStyle = strokeStyle;
				ctx.arc(99, 99, 2, 0, 2 * Math.PI, false);
				ctx.fill();
			}
		},
		{
			id: 'B',
			init(ctx) {
				ctx.beginPath();
				curve(ctx, 42, 62, 50, 50, 55, 60, 63, 48);
				ctx.stroke();
			}
		},
		{
			id: 'C',
			init(ctx) {
				line(ctx, 25, 200, 25, 175);
				line(ctx, 50, 200, 50, 150);
				line(ctx, 75, 200, 75, 125);
			}
		},
		{
			id: 'D',
			init(ctx) {
				ctx.beginPath();
				ctx.fillStyle = strokeStyle;
				ctx.fillRect(140, 45, 15, 15);
				ctx.stroke();
			}
		},
		{
			id: 'E',
			init(ctx) {
				line(ctx, 20, 200 - 20, 55, 200 - 55);
				line(ctx, 45, 200 - 85, 85, 200 - 45);
			}
		},
		{
			id: 'F',
			init(ctx) {
				line(ctx, 40, 40, 100, 40);
				line(ctx, 150, 70, 150, 120);
			}
		},
		{
			id: 'G',
			init(ctx) {
				ctx.beginPath();
            	ctx.strokeStyle = strokeStyle;
    			ctx.lineWidth = 4;
				ctx.setLineDash([2, 5]);
				ctx.arc(140, 140, 15, 0.3 * Math.PI, 1.3 * Math.PI, false);
				ctx.stroke();
				ctx.setLineDash([]);
			}
		},
		{
			id: 'H',
			init(ctx) {
				ctx.beginPath();
				curve(ctx, 40, 75, 70, 30, 130, 30, 160, 75)
				ctx.stroke();
			}
		}
	];

	const itemsById = items.reduce((p, c) => (p[c.id] = c, p), {});

	function getItems(...ids) {
		return ids.map(id => itemsById[id]);
	}

	let pages = [
		{ 
			items: getItems('A'),
			title: `Field A:`, 
			content: `Self, ego, concentration, origin, identity, self-image` 
		},
		{ 
			items: getItems('B'),
			title: `Field B:`, 
			content: `Flexibility, movement in society, liveliness, emotional release (outward expression of emotions)` 
		},
		{ 
			items: getItems('C'),
			title: `Field C:`, 
			content: `Systematic achievement, ambition, enthusiasm, goal-directedness, persistence and conversely, a lack of orientation towards goals and achievement` 
		},
		{ 
			items: getItems('D'),
			title: `Field D:`, 
			content: `The “problem” or difficulty, hardship, burden — the problematic sphere and manner of its management` 
		},
		{ 
			items: getItems('E'),
			title: `Field E:`, 
			content: `Tension, aggression, opposition, accomplishment, fulfillment or drives` 
		},
		{ 
			items: getItems('F'),
			title: `Field F:`, 
			content: `Integration; partiality vs completion. Isolation /separateness vs connectedness /closeness` 
		},
		{ 
			items: getItems('G'),
			title: `Field G:`, 
			content: `Tenderness, sensitivity, delicacy, sociability. Shows how expressed, repressed, sublimated or open to influence` 
		},
		{ 
			items: getItems('H'),
			title: `Field H:`, 
			content: `Protection. Shows where and how the subject feels protected and how he defends himself` 
		},
		{
			items: getItems('A', 'H'),
			title: `Fields A and H: Self-Image`,
			content: `Self-esteem and security are connected and frequently dependent on whether or not the symbiotic union with the mother was successful. A disturbance in the early development of the child can be the cause of a disturbed ego and feelings of vulnerability in later life.`
		},
		{
			items: getItems('B', 'G'),
			title: `Fields B and G: Sociability`,
			content: `Field B, emotions and ability to socialize, and Field G, sensitivity, are combined to indicate reaction towards others and sometimes the opposite sex.`
		},
		{
			items: getItems('C', 'E'),
			title: `Fields C and E: Achievement`,
			content: `The interrelationship between ambition and tension/aggression, Fields C and E, can indicate ability and productivity, work and achievement.`
		},
		{
			items: getItems('D', 'F'),
			title: `Fields D and F: Generalized Attitude`,
			content: `The greater the “problem” or “difficulty in life”, the more it calls for an integrated world perspective. These two fields, Field D and F, in combination, give hints as to the generalized attitude towards the world.`
		},
		{
			component: ResultsAll
		}
	];

	import { navigate } from "svelte-routing";
	import { setContext, tick } from 'svelte';

	const [events, emitEvent] = subject();

	setContext('events', {
		events,
		emitEvent
	});

	
	setContext('nav', {
		nextPage() {

			// export let pages;
			// export let currentIndex;

			// let count;
			// $: {
			// 	count = pages.length;
			// }
		},
		prevPage() {

		},
		pages,
		toPage(index) {
			navigate(`/results/c/${index}`);
		}
	});

	navigate('/');
	let params;
	$: console.log({params})

</script>

<Router url="{url}">
	<!-- <nav>
	  <Link to="/">Home</Link>
	  <Link to="results/c/0">Submit</Link>
	  <Link to="results/all">All</Link>
	  <Link to="results/c/0">Two</Link>
	</nav> -->
	<main>
		<Route path="/">
			<Wartegg {items}></Wartegg>
		</Route>
		<Route path="results/c/:index" let:params>
			{#if pages[params.index].component} 
				<ResultsAll items={items} {params}></ResultsAll>
			{:else}
				<ResultsSeveral {...pages[params.index]} {params}></ResultsSeveral>
			{/if}
		</Route>
		<Route path="results/all">
			<ResultsAll items={items}></ResultsAll>
		</Route>
	</main>
	<div class="footer">
		 Made by <a href="https://github.com/ANovokmet" target="_blank">ANovokmet</a>
	</div>
</Router>

<style>
	.footer {
    	text-align: center;
		padding-top: 4rem;
		padding-bottom: 1rem;
    	color: var(--highlight);
	}

	main {
		margin: 2rem auto;
		max-width: 1024px;

		border: 1px solid var(--secondary);
		box-shadow: 0 2px 20px 0px #0000005e;
		padding: 2rem;
		background: var(--background);
	}
</style>