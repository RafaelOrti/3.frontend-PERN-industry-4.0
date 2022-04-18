import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
