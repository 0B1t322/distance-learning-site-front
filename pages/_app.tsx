import { ChakraProvider, Text } from "@chakra-ui/react";
import { Header } from "../components/Header/Header";
import {Provider} from 'react-redux'
import store from "./redux/store";
import Router, { useRouter } from 'next/router'
import { useEffect } from "react";

import { AppProps } from "next/app";

import { PrivateRouter } from "./_protected_routers";

export default function App({Component, pageProps, router}: AppProps) {
    const protectedRouters = [
        '/about',
        '/my'
    ]
    return (
        <ChakraProvider>
            <Provider store={store}>
                {/* <PrivateRouter protectedRoutes={protectedRouters}> */}
                    <Header/>
                    {
                        console.log(store.getState())
                    }
                    <Component {...pageProps}/>
                {/* </PrivateRouter> */}
            </Provider>
        </ChakraProvider>
    )
}