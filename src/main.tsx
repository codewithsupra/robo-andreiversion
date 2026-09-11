import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App'
import { store } from './store'
import { setNeedRefresh, setOfflineReady, setUpdateSW } from './swUpdate'

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    setNeedRefresh(true)
  },
  onOfflineReady() {
    setOfflineReady(true)

  },
})
setUpdateSW(updateSW)

const container = document.getElementById('root');

const root = createRoot(container!)
root.render(<StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
