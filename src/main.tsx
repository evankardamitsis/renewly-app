import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import {HOME_PAGE} from "./config.ts";
import App from "./App.tsx";
import {ClerkProvider} from "@clerk/clerk-react";
import {MantineProvider} from "@mantine/core";
import {DatesProvider} from "@mantine/dates";
import {ModalsProvider} from "@mantine/modals";
import "mantine-datatable/styles.css";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <QueryClientProvider client={queryClient}>
              <MantineProvider>
                  <DatesProvider settings={{ locale: "en-gb" }}>
                      <ModalsProvider>
                          <Router basename={HOME_PAGE}>
                                <App />
                          </Router>
                      </ModalsProvider>
                  </DatesProvider>
              </MantineProvider>
          </QueryClientProvider>
      </ClerkProvider>.
  </React.StrictMode>,
)
