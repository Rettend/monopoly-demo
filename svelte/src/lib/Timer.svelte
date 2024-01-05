<script lang='ts'>
  import { onMount } from 'svelte'

  type Clock = {
    hours: number
    minutes: number
    seconds: number
  }

  export let decreasing: boolean = false
  export let start: Partial<Clock> = {}

  let clock: Clock = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ...start,
  }

  let time = clock.hours * 3600 + clock.minutes * 60 + clock.seconds

  $: clock = {
    hours: Math.floor(time / 3600),
    minutes: Math.floor((time % 3600) / 60),
    seconds: Math.floor(time % 60),
  } satisfies Clock

  onMount(() => {
    let startTime = Date.now() / 1000

    const interval = setInterval(() => {
      const now = Date.now() / 1000
      const elapsed = now - startTime

      if (decreasing)
        time = Math.max(0, time - elapsed)
      else
        time += elapsed

      startTime = now
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  function pad(clock: Partial<Clock>): string {
    return Object.values(clock)
      .map(value => value.toString().padStart(2, '0'))
      .join(':')
  }
</script>

<div>
  {pad(clock)}
</div>
