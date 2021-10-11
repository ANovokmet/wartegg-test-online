<script>
    import { createEventDispatcher } from "svelte";


    export let pages;
    export let currentIndex;
    export let value;


    const dispatch = createEventDispatcher();
</script>

<button class="nav__btn btn" on:click>{value}</button>

<style>
    .nav__btn:last-child {
        margin-left: auto;
    }
</style>