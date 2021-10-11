<script>
    import { createEventDispatcher } from "svelte";


    export let pages;
    export let currentIndex;

    let count;
    $: {
        count = pages.length;
    }

    const dispatch = createEventDispatcher();
</script>

<div class="nav">
    <div class="nav__btn">
        <slot name="left"></slot>
        {#if +currentIndex > 0}
            <button class="nav__btn btn" on:click={() => dispatch('pageChanged', +currentIndex - 1)}>Previous</button>
        {/if}
    </div>
    <div class="nav__btn">
        <slot name="right"></slot>
        {#if +currentIndex < count - 1}
            <button class="nav__btn btn" on:click={() => dispatch('pageChanged', +currentIndex + 1)}>Next</button>
        {/if}
    </div>
</div>

<style>
    .nav {
        display: flex;
    }

    .nav__btn:last-child {
        margin-left: auto;
    }
</style>