import { useSyncExternalStore } from 'react'
import { applyUpdate, dismiss, getSnapshot, subscribe } from '../swUpdate'

function UpdateToast() {
  const { needRefresh, offlineReady } = useSyncExternalStore(subscribe, getSnapshot)

  if (!needRefresh && !offlineReady) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-[#123a52] border border-cyan-400/40 px-5 py-3 shadow-lg shadow-cyan-500/20 text-sm text-cyan-100">
      <span>
        {needRefresh ? 'New version available.' : 'App ready to work offline.'}
      </span>
      {needRefresh && (
        <button
          onClick={() => applyUpdate()}
          className="rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-[#0d1b3e] hover:bg-cyan-300"
        >
          Reload
        </button>
      )}
      <button
        onClick={dismiss}
        className="text-cyan-100/60 hover:text-cyan-100"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}

export default UpdateToast
