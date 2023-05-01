import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      {loader ? (
        <div className="w-screen h-screen fixed top-0 left-0 bg-tournesol flex flex-col gap-8 items-center justify-center">
          <img className="w-48 h-48 bg-green-500 rounded-lg" src="" alt="" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            className="h-2 bg-green-500"
          ></motion.div>
        </div>
      ) : (
        <>
          <Navigation />
          <Component {...pageProps} />
        </>
      )}
    </ThemeProvider>
  );
}

export default MyApp;
