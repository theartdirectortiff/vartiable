import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

function SplitTextIntoSpans({ children }) {
  const lines = children.split(" ");
  const spans = lines.map((line, index) => (
    <motion.span
      variants={{
        from: { y: 20, opacity: 0 },
        to: {
          y: 0,
          opacity: 1,
        },
      }}
      key={index}
    >
      {line}
    </motion.span>
  ));
  return (
    <motion.p
      initial="from"
      animate="to"
      variants={{
        from: {
          y: 0,
          transition: {
            type: "tween",
            ease: [0.4, 0, 0.2, 1],
          },
        },
        to: {
          y: 10,
          transition: {
            staggerChildren: 0.4,
            type: "tween",
            ease: [0.4, 0, 0.2, 1],
          },
        },
      }}
      className="flex gap-1 uppercase text-2xl overflow-hidden"
    >
      {spans}
    </motion.p>
  );
}

function MyApp({ Component, pageProps }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <AnimatePresence mode="wait">
        <Navigation />
        <Component {...pageProps} />
        {loader ? (
          <div className="w-screen h-screen fixed top-0 left-0 bg-midnight flex flex-col gap-8 items-center justify-center z-50">
            <Player
              autoplay
              loop
              src="https://assets10.lottiefiles.com/packages/lf20_eh67QHXzWy.json"
              style={{ height: "300px", width: "300px" }}
              className="grayscale"
            ></Player>
          </div>
        ) : null}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
