import { ChakraProvider, Text } from "@chakra-ui/react";
import { Header } from "../components/Header/Header";
import {Provider} from 'react-redux'
import store, {persistors} from "./redux/store";
import per from "./redux/store";
import Router, { useRouter } from 'next/router'
import { useEffect } from "react";

import { AppProps } from "next/app";

import { PrivateRouter } from "./_protected_routers";

import {PersistGate} from 'redux-persist/integration/react'

// import css
import '../components/Files/FileUploader.css'
// 

export default function App({Component, pageProps, router}: AppProps) {
    const protectedRouters = [
        '/about',
        '/my',
        '/courses/[id]'
    ]
    return (
        <ChakraProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistors}>
                <PrivateRouter protectedRoutes={protectedRouters}>
                    <Header/>
                    {
                        console.log(store.getState())
                    }
                    <Component {...pageProps}/>
                </PrivateRouter>
                </PersistGate>
            </Provider>
        </ChakraProvider>
    )
}