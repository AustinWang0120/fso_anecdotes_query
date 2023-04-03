import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"

import App from "./App"

const queryClient = new QueryClient()

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
