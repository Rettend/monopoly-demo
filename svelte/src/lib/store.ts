import { derived, writable } from 'svelte/store'

export const status = writable({
  build: false,
  auction: false,
  result: false,
})

/**
 * Indicates whether something is happening.
 * The game can only be ended when this is false.
 */
export const canEnd = derived(
  status,
  $status => !$status.build && !$status.auction && !$status.result,
)
