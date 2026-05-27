import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <App />
    </BrowserRouter>
  </Provider>,
);
