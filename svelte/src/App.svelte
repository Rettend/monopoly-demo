<script lang='ts'>
  import EndAudio from '../../common/end.mp3'
  import Auction from './lib/Auction.svelte'
  import Build from './lib/Build.svelte'
  import Timer from './lib/Timer.svelte'
  import { canEnd, status } from './lib/store'

  let hours = 0
  let start = false
  let ending = false

  const gameTimes = [1, 2, 4]

  function startGame(time: number) {
    start = true
    hours = time
  }

  function endGame(canEnd: boolean, ending: boolean) {
    if (canEnd && ending) {
      const endAudio = new Audio(EndAudio)
      endAudio.play()
    }
  }

  $: endGame($canEnd, ending)

  function startBuild() {
    if ($canEnd)
      $status.build = true
  }

</script>

<main font-base text-center text-light w-full h-full>
  {#if !start}
    <div flex='~ col' items-center>
      <div>
        <h2>Monopoly City</h2>
        <h1 uppercase>Trading Unit</h1>
      </div>
      <h3>Start a game by choosing your game time:</h3>
      {#each gameTimes as time}
        <button btn-outer on:click={() => startGame(time)}>
          <span btn>{time} hour{time > 1 ? 's' : ''}</span>
        </button>
      {/each}
    </div>
  {:else}
    <div flex='~ col' justify-center items-center>
      <span text-4xl my-5 mb-10>
        <Timer start={{ hours }} on:end={() => ending = true} />
      </span>
      <Auction />
      <Build on:click={startBuild} />
    </div>
  {/if}
</main>
