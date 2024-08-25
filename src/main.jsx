import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import {AppProvider} from "./context/AppContext.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./config/theme.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppProvider>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </AppProvider>
    </React.StrictMode>
);
