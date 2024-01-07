<script lang='ts'>
  import { flip } from 'svelte/animate'
  import { cubicOut } from 'svelte/easing'
  import BopAudioFile from '../../../common/bop.mp3'
  import Timer from './Timer.svelte'
  import { status } from './store'

  const buildings = ['train', '1', '2', '3']
  const icons = ['i-ph-train-simple-bold', 'i-ph-number-one-bold', 'i-ph-number-two-bold', 'i-ph-number-three-bold']
  const margins = [
    'mt-32',
    'mb-30 mr-60',
    'mb-90',
    'mb-30 ml-60',
  ]

  let highlightedBuilding = 0
  let timeoutId: number | null = null

  $: if ($status.build) {
    startBuild()

    setTimeout(() => {
      highlightedBuilding = Math.floor(Math.random() * 4)
      $status.build = false
    }, 10000)
  }

  function startBuild() {
    let speed = 1000

    const animate = () => {
      highlightedBuilding = (highlightedBuilding + 1) % buildings.length
      playSound()
      speed *= 0.9
      timeoutId = setTimeout(animate, speed)
    }

    animate()
  }

  let lastPlayed = 0
  const delay = 60

  function playSound() {
    const now = Date.now()
    if (now - lastPlayed < delay)
      return

    lastPlayed = now

    const bopAudio = new Audio(BopAudioFile)
    bopAudio.play()
  }

  $: if (!$status.build && timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null

    $status.result = true
    setTimeout(() => {
      $status.result = false
    }, 3000)
  }

  let skip = false

  function startAuction() {
    if ($status.build || $status.result)
      return

    if ($status.auction)
      skip = true

    $status.auction = true
  }

  function endAuction() {
    $status.auction = false
    skip = false
  }
</script>

{#each buildings as building, i (building)}
  <span
    animate:flip={{ duration: 500, easing: cubicOut }}
    class:highlighted={i === highlightedBuilding}
    absolute text-3xl font-bold text-white
    class={margins[i]}
  >
    <span m--4 absolute class={icons[i]} />
  </span>
{/each}
<button on:click={startAuction} big-btn w-50 h-50 rounded-full b-none bg-gray p-10 text-light>
  {#if $status.result}
    <div class={icons[highlightedBuilding]} m-a text-9xl />
  {:else}
    {#if $status.auction}
      <Timer start={{ seconds: 59 }} {skip} short={true} on:end={endAuction} />
    {:else}
      <div i-ph-handshake-duotone m-a text-9xl />
    {/if}
  {/if}
</button>

<style>
  .highlighted {
    color: #d90429;
    box-shadow: 0 0 20px 15px #d9042940;
  }
</style>
