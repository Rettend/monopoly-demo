type Status = 'landing' | 'start' | 'build' | 'auction' | 'result' | 'ended'

function useStatus() {
  let status: Status = $state<Status>('landing')
  let ended = false

  function reset() {
    status = 'start'
  }

  return {
    get value() {
      return status
    },
    get idle() {
      return status === 'start'
    },
    set value(value: Status) {
      if (value === 'start')
        console.warn('Use `reset` to set status to `start`')

      if (value === 'ended')
        ended = true
      else if (!ended)
        status = value
    },
    reset,
  }
}

export const status = useStatus()
