<script lang='ts'>
  import { createEventDispatcher, onMount } from 'svelte'
  import TimeAudioFile from '../../../common/time.mp3'

  type Clock = {
    hours: number
    minutes: number
    seconds: number
  }

  const dispatch = createEventDispatcher()

  export let start: Partial<Clock> = {}
  export let increasing: boolean = false
  export let short: boolean = false
  export let skip: boolean = false

  let clock: Clock = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ...start,
  }

  let time = clock.hours * 3600 + clock.minutes * 60 + clock.seconds

  $: if (time <= 0)
    dispatch('end')

  $: if (short && time < 10) {
    const timeAudio = new Audio(TimeAudioFile)
    timeAudio.play()
  }

  let interval: number

  $: if (skip && time > 9) {
    time = 9
    clearInterval(interval)
    startInterval()
  }

  function startInterval() {
    let startTime = Date.now() / 1000

    interval = setInterval(() => {
      const now = Date.now() / 1000
      const elapsed = now - startTime

      if (increasing)
        time += elapsed
      else
        time = Math.max(0, time - elapsed)

      startTime = now
    }, 1000)
  }

  onMount(() => {
    startInterval()

    return () => {
      clearInterval(interval)
    }
  })

  $: clock = {
    hours: Math.floor(time / 3600),
    minutes: Math.floor((time % 3600) / 60),
    seconds: Math.round(time % 60),
  } satisfies Clock

  function pad(clock: Partial<Clock>): string {
    let values = Object.values(clock)

    if (short)
      values = values.filter((value, index, array) => value !== 0 || index === array.length - 1)

    return values
      .map(value => value.toString().padStart(2, '0'))
      .join(':')
  }
</script>

<div class={short ? 'text-8xl' : ''}>
  {pad(clock)}
</div>
