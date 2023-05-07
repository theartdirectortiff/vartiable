import { Moon, Music, Pause, Play, Sun } from "lucide-react";
import Container from "./container";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import localFont from "next/font/local";
const courierNew = localFont({ src: "../fonts/courier-new.ttf" });

export default function Navigation() {
  const [menu, setMenu] = useState(false);
  const [player, setPlayer] = useState(false);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const [isRouting, setIsRouting] = useState(false);

  const handleTogglePlay = () => {
    setPlayerStatus(!playerStatus);
    if (playerStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    setProgress(progressPercent);
  };

  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const handleRouteChange = () => {
      setMenu(false);
    };
    const handleRouteStart = () => {
      setIsRouting(true);
    };
    const handleRouteChangeComplete = () => {
      setIsRouting(false);
    };
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", () => {
      handleRouteChange();
      handleRouteChangeComplete();
    });
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", () => {
        handleRouteChange();
        handleRouteChangeComplete();
      });
    };
  }, [router]);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      setPlayer(false);
    });
  }, []);

  const handleChangeLocale = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <nav className="w-screen flex items-center h-20 fixed z-50">
      <audio
        ref={audioRef}
        src="audio/website_audio_light.mp3"
        onTimeUpdate={handleTimeUpdate}
      />
      <Container>
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <svg
              className="dark:fill-white fill-black w-10"
              viewBox="0 0 409 306"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M224.441 0.0703125L152.121 147.406L87.4219 0H0L91.7578 186.164C55.9766 190.312 26.1211 206.078 26.1211 238.797C26.1211 263.062 45.1328 278.016 66.1719 278.016C86.3906 278.016 105.82 266.281 107.012 240.797C97.332 236.773 88.0117 227.852 88.0117 215.734C88.0117 207.648 91.3594 201.797 97.4922 197.797L114.82 232.953H115.441L136.203 190.711C140.988 190.812 146.047 191.102 151.371 191.562L145.441 203.586C113.883 267.516 88.8203 301.891 59.2812 301.891V305.125H173.32V301.891C128.441 301.891 120.32 267.516 151.48 204.016L157.441 191.961C171.609 193.414 186.801 196.031 203.18 199.477C216.5 202.273 230.605 205.609 245.582 209.32L254.641 228.656C274.441 271.133 282.141 301.867 243.711 301.867V305.125H408.742V301.867C379.621 301.867 367.473 280.852 341.98 227.867L238.883 13.9141L153.32 187.641C148.297 187.039 143.336 186.539 138.449 186.141L229.898 0.0703125H224.441ZM243.641 205.172C214.199 197.82 186.891 191.633 159.32 188.141L198.59 108.734L243.641 205.172Z"
              />
            </svg>
          </Link>
          <AnimatePresence initial={false}>
            {isRouting && (
              <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-screen h-screen top-0 left-0 bg-midnight fixed cursor-progress z-50"
              />
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1 relative">
            <motion.button
              layoutId="cacs"
              onClick={() => setPlayer(true)}
              className="px-4 py-1 bg-white text-midnight rounded-full"
            >
              <Music />
            </motion.button>
            <AnimatePresence>
              {player && (
                <motion.div
                  layoutId="cacs"
                  className="p-6 flex flex-col justify-center gap-4 items-center w-full min-h-32 rounded-xl bg-white text-midnight absolute top-0 left-0 z-50"
                >
                  <button
                    className="absolute m-6 left-0 top-0"
                    onClick={() => setPlayer(!player)}
                  >
                    <svg width="25" height="25" viewBox="0 0 52 52" fill="none">
                      <path
                        d="M0.515625 0.257812H51.9995V51.7417H0.515625V0.257812Z"
                        fill="white"
                      />
                      <path
                        d="M0.515625 0.257812V-1.09703H-0.839214V0.257812H0.515625ZM51.9995 0.257812H53.3543V-1.09703H51.9995V0.257812ZM51.9995 51.7417V57.161H53.3543V51.7417H51.9995ZM0.515625 51.7417H-0.839214V57.161H0.515625V51.7417ZM0.515625 1.61265H51.9995V-1.09703H0.515625V1.61265ZM50.6447 0.257812V51.7417H53.3543V0.257812H50.6447ZM51.9995 46.3223H0.515625V57.161H51.9995V46.3223ZM1.87046 51.7417V0.257812H-0.839214V51.7417H1.87046Z"
                        fill="#101010"
                        mask="url(#path-1-inside-1_159_417)"
                      />
                      <path
                        d="M16.7734 34.7148L34.9757 16.5125"
                        stroke="#101010"
                        stroke-width="4.06452"
                      />
                      <path
                        d="M17.0684 16.8086L35.2707 35.0109"
                        stroke="#101010"
                        stroke-width="4.06452"
                      />
                    </svg>
                  </button>
                  <img
                    src="/images/MUSIC-COVER-WEBSITE.jpg"
                    alt=""
                    className="w-[150px] h-[150px] bg-red-500 rounded-md"
                  />
                  <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gray-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={handleTogglePlay}
                    className="rounded-full p-2 bg-gray-300 text-gray-900"
                  >
                    {playerStatus ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              className="px-1 py-1 bg-white text-midnight rounded-full flex gap-1 items-center"
              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            >
              <Moon />
              <div className="w-10 rounded-full border border-gray-200 relative">
                <motion.div
                  animate={theme === "dark" ? "open" : "closed"}
                  initial="closed"
                  variants={{
                    open: {
                      x: 0,
                      transition: {
                        animationDelay: 1,
                        type: "tween",
                        ease: [0.4, 0, 0.2, 1],
                      },
                    },
                    closed: {
                      x: "100%",
                      transition: {
                        type: "tween",
                        ease: [0.4, 0, 0.2, 1],
                      },
                    },
                  }}
                  className="w-4 h-4 m-[2px] rounded-full bg-midnight"
                ></motion.div>
              </div>
              <Sun />
            </button>
            <button
              onClick={() => handleChangeLocale(locale === "en" ? "fr" : "en")}
              className="px-4 py-1 bg-white text-midnight rounded-full hidden md:block"
            >
              Fr / En
            </button>
            <motion.button
              className="px-4 py-1 bg-white text-midnight rounded-3xl"
              onClick={() => setMenu(!menu)}
            >
              Menu
            </motion.button>
          </div>
          <motion.div
            animate={menu ? "open" : "closed"}
            initial="closed"
            variants={{
              closed: {
                right: "-100%",
                transition: {
                  animationDelay: 1,
                  type: "tween",
                  ease: [0.4, 0, 0.2, 1],
                },
              },
              open: {
                right: 0,
                transition: {
                  type: "tween",
                  ease: [0.4, 0, 0.2, 1],
                },
              },
            }}
            className="p-6 h-screen w-full md:w-1/3 absolute bottom-0 right-0 top-0 flex flex-col gap-6 dark:bg-white dark:text-midnight text-white bg-midnight"
          >
            <div className="m-auto w-full flex flex-col gap-4">
              <div className="flex gap-2">
                <button onClick={() => setMenu(!menu)}>
                  <svg width="25" height="25" viewBox="0 0 52 52" fill="none">
                    <path
                      d="M0 0.257812H51.4839V51.7417H0V0.257812Z"
                      fill="white"
                    />
                    <path
                      d="M0 0.257812V-1.09703H-1.35484V0.257812H0ZM51.4839 0.257812H52.8387V-1.09703H51.4839V0.257812ZM51.4839 51.7417V57.161H52.8387V51.7417H51.4839ZM0 51.7417H-1.35484V57.161H0V51.7417ZM0 1.61265H51.4839V-1.09703H0V1.61265ZM50.129 0.257812V51.7417H52.8387V0.257812H50.129ZM51.4839 46.3223H0V57.161H51.4839V46.3223ZM1.35484 51.7417V0.257812H-1.35484V51.7417H1.35484Z"
                      fill="#101010"
                      mask="url(#path-1-inside-1_159_414)"
                    />
                    <path
                      d="M12.8711 36.1602H38.613"
                      stroke="#101010"
                      stroke-width="4.06452"
                    />
                  </svg>
                </button>
                <button onClick={() => setMenu(!menu)}>
                  <svg width="25" height="25" viewBox="0 0 52 52" fill="none">
                    <path
                      d="M0.257812 0.257812H51.7417V51.7417H0.257812V0.257812Z"
                      fill="white"
                    />
                    <path
                      d="M0.257812 0.257812V-1.09703H-1.09703V0.257812H0.257812ZM51.7417 0.257812H53.0965V-1.09703H51.7417V0.257812ZM51.7417 51.7417V57.161H53.0965V51.7417H51.7417ZM0.257812 51.7417H-1.09703V57.161H0.257812V51.7417ZM0.257812 1.61265H51.7417V-1.09703H0.257812V1.61265ZM50.3868 0.257812V51.7417H53.0965V0.257812H50.3868ZM51.7417 46.3223H0.257812V57.161H51.7417V46.3223ZM1.61265 51.7417V0.257812H-1.09703V51.7417H1.61265Z"
                      fill="#101010"
                      mask="url(#path-1-inside-1_159_411)"
                    />
                    <rect
                      x="15.1612"
                      y="14.4854"
                      width="21.6774"
                      height="21.6774"
                      fill="white"
                      stroke="#101010"
                      stroke-width="4.06452"
                    />
                  </svg>
                </button>
                <button onClick={() => setMenu(!menu)}>
                  <svg width="25" height="25" viewBox="0 0 52 52" fill="none">
                    <path
                      d="M0.515625 0.257812H51.9995V51.7417H0.515625V0.257812Z"
                      fill="white"
                    />
                    <path
                      d="M0.515625 0.257812V-1.09703H-0.839214V0.257812H0.515625ZM51.9995 0.257812H53.3543V-1.09703H51.9995V0.257812ZM51.9995 51.7417V57.161H53.3543V51.7417H51.9995ZM0.515625 51.7417H-0.839214V57.161H0.515625V51.7417ZM0.515625 1.61265H51.9995V-1.09703H0.515625V1.61265ZM50.6447 0.257812V51.7417H53.3543V0.257812H50.6447ZM51.9995 46.3223H0.515625V57.161H51.9995V46.3223ZM1.87046 51.7417V0.257812H-0.839214V51.7417H1.87046Z"
                      fill="#101010"
                      mask="url(#path-1-inside-1_159_417)"
                    />
                    <path
                      d="M16.7734 34.7148L34.9757 16.5125"
                      stroke="#101010"
                      stroke-width="4.06452"
                    />
                    <path
                      d="M17.0684 16.8086L35.2707 35.0109"
                      stroke="#101010"
                      stroke-width="4.06452"
                    />
                  </svg>
                </button>
              </div>
              <h2 className="text-5xl uppercase">Navigate through OUR world</h2>
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
                  href="/coffee"
                  className="text-3xl uppercase border-y border-gray-300 py-2 -mt-[1px]"
                >
                  Contact
                </Link>
                <Link
                  className="text-3xl uppercase border-y border-gray-300 py-2 -mt-[1px]"
                  href="/#services"
                  scroll={false}
                >
                  Services
                </Link>
                <div>
                  {/* <pre>{JSON.stringify(allServices, 0, 4)}</pre> */}
                  <div className="flex items-center gap-8 relative group-hover:text-midnight transition-all duration-200">
                    {/* {allServices.stories.map((storie, idx) => (
                            <Link
                              href={storie.full_slug}
                              className="text-3xl uppercase border-y border-gray-300 py-2 -mt-[1px]"
                            >
                              <h2 className="text-5xl font-bold">{idx + 1}</h2>
                              <h3 className="md:text-[2vw] text-2xl uppercase">
                                {storie.content.Title}
                              </h3>
                            </Link>
                          ))} */}
                  </div>
                </div>
              </div>
              <h2 className="text-4xl">Let’s drink a coffee !</h2>
              <div
                className={`${courierNew.className} flex justify-between opacity-50`}
              >
                <Link
                  target="_blank"
                  href="https://www.instagram.com/vartiable/"
                >
                  Instagram
                </Link>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/vart-iable-agence-cr%C3%A9ative/"
                >
                  LinkedIn
                </Link>
                <Link
                  target="_blank"
                  href="https://open.spotify.com/show/4UumbBYNRVlD0lkUbE9ALM?si=172df12d71854836"
                >
                  Spotify
                </Link>
              </div>
              <button className="px-4 py-1 bg-white text-midnight rounded-full md:hidden block">
                Fr / En
              </button>
            </div>
          </motion.div>
        </div>
      </Container>
    </nav>
  );
}
