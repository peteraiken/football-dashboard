import { HashRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
