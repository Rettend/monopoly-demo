<script lang='ts'>
  import EndAudio from '../../common/end.mp3'
  import Auction from './lib/Auction.svelte'
  import Build from './lib/Build.svelte'
  import Timer from './lib/Timer.svelte'
  import { status } from './lib/store.svelte'

  const gameTimes = [1, 2, 4]

  let hours = $state(0)
  let ending = $state(false)

  function startGame(time: number) {
    status.reset()
    hours = time
  }

  $effect(() => {
    if (status.idle && ending) {
      const endAudio = new Audio(EndAudio)
      endAudio.play()
      status.value = 'ended'
    }
  })

  function startBuild() {
    if (status.idle)
      status.value = 'build'
  }

</script>

<main font-base text-center text-light w-full h-full>
  {#if status.value === 'landing'}
    <div flex='~ col' items-center>
      <div>
        <h2>Monopoly City</h2>
        <h1 uppercase>Trading Unit</h1>
      </div>
      <h3>Start a game by choosing your game time:</h3>
      {#each gameTimes as time}
        <button btn-outer onclick={() => startGame(time)}>
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
      <Build onclick={startBuild} />
    </div>
  {/if}
</main>
