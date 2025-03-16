import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import axios from "axios";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <ThemeContext>
          <App />
        </ThemeContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";
axios.defaults.withCredentials = true; // Enable credentials
axios.defaults.baseURL = "http://localhost:7170/api";
axios.defaults.headers.common["Referrer-Policy"] =
  "strict-origin-when-cross-origin";

const fetchCsrfToken = async () => {
  try {
    const response = await axios.get("/get-token");
    const csrfToken = response.headers["x-xsrf-token"];
    if (csrfToken) {
      axios.defaults.headers.post["X-XSRF-TOKEN"] = csrfToken;
    }
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};
const initializeApp = async () => {
  await fetchCsrfToken();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <ThemeContext>
            <App />
          </ThemeContext>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
axios
  .get("/api/get-token")
  .then((response) => {
    const csrfToken = response.headers["XSRF-TOKEN"];
    if (csrfToken) {
      axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
    }
  })
  .catch((error) => {
    console.error("Error fetching CSRF token: ", error);
  });

initializeApp();
