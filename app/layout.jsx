// 'use client'

import "../styles/globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ToasterContext from "@/context/TosterContext";
import Provider from '../context/Provider'
import { ContextDataProvider } from "@/context/ContextDataProvider";
import { UserProvider } from "@/context/UserContext";



export const metadata = {
  title: "StartoZ",
  description: "All in one place for your startup needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <ToasterContext />
        <UserProvider >
          <Provider>
            <ContextDataProvider >
              <Nav />
              <div className="main">
                <div className="gradient" />
              </div>
              {/* <SideBar /> */}
              <main className="app">{children}</main>
              <Footer />
            </ContextDataProvider>
          </Provider>
        </UserProvider>
      </body>
    </html>
  );
}

