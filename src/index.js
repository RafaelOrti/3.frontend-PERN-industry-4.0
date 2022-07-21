import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

import './index.scss'

import {
  Provider
} from 'react-redux'
import store from './redux/store'
import {
  MantineProvider
} from '@mantine/core'
import {
  NotificationsProvider
} from '@mantine/notifications'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={
    store
  }
    >
      <MantineProvider theme={
    {
      colorScheme: 'dark'
    }
  }
      >
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>

)

reportWebVitals()
