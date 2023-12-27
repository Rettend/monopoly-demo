<script lang='ts'>
  import Auction from './lib/Auction.svelte'

  let start = false
</script>

<main font-base text-center text-light>
  {#if !start}
    <div flex='~ col' items-center>
      <h2>Monopoly City</h2>
      <h1 uppercase>Trading Unit</h1>
      <button cursor-pointer on:click={() => (start = true)}>Start</button>
    </div>
  {:else}
    <div flex justify-center>
      <Auction />
    </div>
  {/if}
</main>
