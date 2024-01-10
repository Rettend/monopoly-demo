<script lang='ts'>
  import { createEventDispatcher } from 'svelte'
  import TimeAudioFile from '../../../common/time.mp3'

  type Clock = {
    hours: number
    minutes: number
    seconds: number
  }

  const dispatch = createEventDispatcher()

  const {
    start = {} as Partial<Clock>,
    increasing = false,
    short = false,
    skip = false,
  } = $props()

  let time = $state((start.hours ?? 0) * 3600 + (start.minutes ?? 0) * 60 + (start.seconds ?? 0))

  const clock = $derived<Clock>({
    hours: Math.floor(time / 3600),
    minutes: Math.floor((time % 3600) / 60),
    seconds: Math.round(time % 60),
  })

  let interval: number

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

  $effect(() => {
    startInterval()

    if (time <= 0)
      dispatch('end')

    if (short && time < 10) {
      const timeAudio = new Audio(TimeAudioFile)
      timeAudio.play()
    }

    if (skip && time > 9) {
      time = 9
      clearInterval(interval)
      startInterval()
    }

    return () => {
      clearInterval(interval)
    }
  })

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
