import '@/styles/globals.css';
import type { AppProps } from 'next/app';  
import localFont from "next/font/local";
import { Provider } from 'react-redux';
import store from "@/redux/store";

const Tahoma = localFont({
    src: [
        {
            path: "../../fonts/Tahoma BoldV1.woff",
            weight: "700",
            style: "bold",
        },
        {
            path: "../../fonts/TahomaV1.woff",
            weight: "400",
            style: "normal",
        },
    ],
});

export default function App({Component, pageProps}: AppProps) {
    return (
        <main className={Tahoma.className}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </main>
    )
}