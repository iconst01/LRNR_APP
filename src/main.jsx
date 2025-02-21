import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserProvider from "./context/UserProvider.jsx";
import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
