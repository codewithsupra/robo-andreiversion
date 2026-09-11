type Listener = () => void

// Bridges registerSW's plain callbacks (called from main.tsx, outside React)
// to a store React components can subscribe to via useSyncExternalStore.
let needRefresh = false
let offlineReady = false
let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined
const listeners = new Set<Listener>()

// useSyncExternalStore compares snapshots with Object.is, so getSnapshot
// must return the SAME object reference until something actually
// changes — otherwise React sees "changed" every render and loops forever.
let snapshot = { needRefresh, offlineReady }

function emit() {
  snapshot = { needRefresh, offlineReady }
  listeners.forEach((listener) => listener())
}

export function setUpdateSW(fn: (reloadPage?: boolean) => Promise<void>) {
  updateSW = fn
}

export function setNeedRefresh(value: boolean) {
  needRefresh = value
  emit()
}

export function setOfflineReady(value: boolean) {
  offlineReady = value
  emit()
}

export function applyUpdate() {
  return updateSW?.(true)
}

export function dismiss() {
  needRefresh = false
  offlineReady = false
  emit()
}

export function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot() {
  return snapshot
}
