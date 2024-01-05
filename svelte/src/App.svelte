<script lang='ts'>
  import Auction from './lib/Auction.svelte'
  import Timer from './lib/Timer.svelte'

  let start = false
  let hours = 0
  // let start = true
  // let hours = 2
  const gameTimes = [1, 2, 4]

  function startGame(time: number) {
    start = true
    hours = time
  }
</script>

<main font-base text-center text-light w-full h-full>
  {#if !start}
    <div flex='~ col' items-center>
      <h2>Monopoly City</h2>
      <h1 uppercase>Trading Unit</h1>
      <h3>Start a game by choosing your game time:</h3>
      {#each gameTimes as time}
        <button
          btn-outer
          on:click={() => startGame(time)}
        >
          <span btn>{time} hour{time > 1 ? 's' : ''}</span>
        </button>
      {/each}
    </div>
  {:else}
    <div flex='~ col' justify-center items-center>
      <span text-4xl mt-5>
        <Timer start={{ hours }} decreasing={true} />
      </span>
      <Auction />
    </div>
  {/if}
</main>
