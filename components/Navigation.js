import { Moon, Music, Sun } from "lucide-react";
import Container from "./container";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Navigation() {
  const [menu, setMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-screen flex items-end h-20 fixed z-50">
      <Container>
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <svg
              version="1.1"
              id="Calque_1"
              viewBox="0 0 1000 1000"
              className="dark:fill-white fill-black w-20"
            >
              <g>
                <g>
                  <path
                    d="M637.61,575.8c25.49,52.99,37.64,74,66.76,74v3.26H539.34v-3.26c38.43,0,30.73-30.73,10.93-73.21l-9.06-19.33
			c-33.39-8.27-62.45-14.72-88.14-17.36l-5.96,12.05c-31.16,63.5-23.04,97.88,21.84,97.88v3.23H354.91v-3.23
			c29.54,0,54.6-34.38,86.16-98.31l5.93-12.02c-6.72-0.59-13.01-0.89-18.87-0.89c-27.5,0-44.49,6.85-44.49,25.06
			c0,12.12,9.32,21.04,19,25.06c-1.19,25.49-20.62,37.22-40.84,37.22c-21.04,0-40.05-14.95-40.05-39.22
			c0-38.83,42.06-53.78,86.16-53.78c13.04,0,26.78,0.92,41.04,2.63l85.56-173.73L637.61,575.8z M454.95,536.08
			c27.57,3.49,54.88,9.68,84.32,17.03l-45.05-96.44L454.95,536.08z"
                  />
                </g>
                <g>
                  <path d="M447.75,495.35l72.32-147.34h5.46L411.07,580.89h-0.62L295.63,347.94h87.42L447.75,495.35z" />
                </g>
              </g>
            </svg>
          </Link>
          <div className=" flex items-center gap-1">
            <button className="px-4 py-1 bg-white text-midnight rounded-full">
              <Music />
            </button>
            <button
              className="px-4 py-1 bg-white text-midnight rounded-full flex"
              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            >
              <Sun />
              Switch
              <Moon />
            </button>
            <button className="px-4 py-1 bg-white text-midnight rounded-full">
              Fr / En
            </button>
            <motion.button
              layoutId="zeez"
              className="px-4 py-1 bg-white text-midnight rounded-3xl"
              onClick={() => setMenu(!menu)}
            >
              Menu
            </motion.button>
            <AnimatePresence>
              {menu ? (
                <motion.div
                  layoutId="zeez"
                  className="p-6 h-screen md:w-screen w-screen absolute left-0 bottom-0 right-0 top-0 flex flex-col gap-6 bg-white text-midnight"
                >
                  <div className="m-auto w-[50vw]">
                    <div>
                      <button onClick={() => setMenu(!menu)}>Close</button>
                    </div>
                    <h2 className="text-5xl uppercase">
                      Navigate through OUR world
                    </h2>
                    <div className="py-6 flex flex-col">
                      <Link
                        href="/projets"
                        className="text-3xl uppercase border-y border-gray-300 py-2 -mt-[1px]"
                      >
                        Projets
                      </Link>
                      <Link
                        href="/about"
                        className="text-3xl uppercase border-y border-gray-300 py-2 -mt-[1px]"
                      >
                        Our mission
                      </Link>
                      <Link
                        href="/contact"
                        className="text-3xl uppercase border-y border-gray-300 py-2 -mt-[1px]"
                      >
                        Contact
                      </Link>
                    </div>
                    <h2 className="text-4xl">Let’s drink a coffee !</h2>
                    <div className="flex justify-between">
                      <Link href="/">Spotify</Link>
                      <Link href="/">LinkedIn</Link>
                      <Link href="/">Instagram</Link>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </nav>
  );
}
