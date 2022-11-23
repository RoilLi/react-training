import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { worker } from './mocks/browser'
import reportWebVitals from './reportWebVitals'
import { PersistGate } from 'redux-persist/integration/react'
import Store from './store'
import { createGlobalStyle } from 'styled-components'

const { store, persistor } = Store()

const render = async () => {
  // Enable API mocking only in development
  if (process.env.NODE_ENV === 'development') {
    await worker.start()
  }

  const container = document.getElementById('root')!
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(170, 170, 170, 0.8);
    border-radius: 5px;
  }
`

render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
