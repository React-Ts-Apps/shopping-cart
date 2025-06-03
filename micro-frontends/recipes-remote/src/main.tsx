import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RecipesApp from "./RecipesApp.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecipesApp />
  </StrictMode>
);
