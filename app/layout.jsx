// 'use client'

import "../styles/globals.css";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContextProvider from "../context/ContextProvider";
import ToasterContext from "@/context/TosterContext";
import Provider from '../context/Provider'
import { ContextDataProvider } from "@/context/ContextDataProvider";
export const metadata = {
  title: "StartoZ",
  description: "All in one place for your startup needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        {/* <ContextProvider> */}
        <ToasterContext /> 
        <Provider>
        <ContextDataProvider >
          <Nav />
          <div className="main">
            <div className="gradient" />
          </div>
          {/* <SideBar /> */}
          <main className="app">{children}</main>
          <Footer />
          {/* </ContextProvider> */}
        </ContextDataProvider>
        </Provider>
      </body>
    </html>
  );
}

