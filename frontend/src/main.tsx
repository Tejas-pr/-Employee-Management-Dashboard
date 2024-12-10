import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Context from "./context/Context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Context initialTheme="light">
      <App />
    </Context>
  </BrowserRouter>
);
