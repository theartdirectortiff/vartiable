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
        <div className="flex items-center justify-between w-full relative">
          <Link href="/">
            <span>Vart&apos;iable</span>
          </Link>
          <div className=" flex items-center gap-1 relative">
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
                  className="p-6 md:w-[550px] w-[calc(100vw-35.55554%)] absolute right-0 top-0 flex flex-col gap-6 bg-white text-midnight rounded-3xl"
                >
                  <div>
                    <button onClick={() => setMenu(!menu)}>Close</button>
                  </div>
                  <h2 className="text-5xl uppercase">
                    Navigate through OUR world
                  </h2>
                  <div className="py-6 flex flex-col">
                    <Link href="/projets" className="text-3xl uppercase">
                      Projets
                    </Link>
                    <Link href="/about" className="text-3xl uppercase">
                      Our mission
                    </Link>
                    <Link href="/contact" className="text-3xl uppercase">
                      Contact
                    </Link>
                  </div>
                  <h2 className="text-4xl">Let’s drink a coffee !</h2>
                  <div className="flex justify-between">
                    <Link href="/">Spotify</Link>
                    <Link href="/">LinkedIn</Link>
                    <Link href="/">Instagram</Link>
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
