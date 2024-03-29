import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/container";
import Button from "@/components/Button";
import { getAllPosts, getPage } from "@/lib/api";
import Link from "next/link";
import Head from "next/head";

import localFont from "next/font/local";
const scotch = localFont({ src: "../../fonts/Scotch.otf" });

export default function Projects({ allPosts, pageContent, locale }) {
  const [projectsList, setProjectsList] = useState(false);

  // Use that instead of a not reachable in function scope arr
  const [random_projects_state, set_random_projects_state] = useState([]);
  const [animateRandomProjects, setAnimateRandomProjects] = useState(true);

  const getRandomProjects = () => {
    setAnimateRandomProjects(true);
    const arr = allPosts.stories;
    const random_ids = [];
    const random_projects = [];

    while (random_ids.length < 4) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!random_ids.includes(randomIndex)) {
        random_ids.push(randomIndex);
      }
    }

    random_ids.map((idx) => {
      random_projects.push(arr[idx]);
    });

    setTimeout(() => {
      set_random_projects_state([...random_projects]);
      setAnimateRandomProjects(false);
    }, 500);
  };

  useEffect(() => {
    getRandomProjects();
  }, []);

  const dom = useRef();
  const macObjRef = useRef();
  const handleProjectsListClick = () => {
    setProjectsList(!projectsList);
  };

  return (
    <section className="h-screen">
      <Head>
        <title>VART’IABLE | Agence Créative</title>
        <meta
          name="description"
          content="Vart’iable est une agence créative ayant pour mission de soutenir activement la communication des entreprises et de concevoir des expériences clients inspirantes, innovantes et mémorables."
        />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </Head>
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="w-screen h-screen absolute z-0 object-cover"
        autoPlay
        muted
        playsInline
        loop
      >
        <source
          src={pageContent.story.content.Video.filename}
          type="video/mp4"
        ></source>
      </motion.video>
      <div
        ref={dom}
        id="cacs"
        className="fixed bottom-0 left-0 right-0 flex flex-col items-center"
      >
        <div className="flex gap-2">
          <Button action={getRandomProjects}>
            {locale === "fr" ? "Choix aléatoire" : "Random choice"}
          </Button>
          <Button action={handleProjectsListClick}>
            {locale === "fr" ? "Liste de projets" : "Projects list"}
          </Button>
        </div>
        <motion.div
          className="flex gap-2 py-8"
          animate={animateRandomProjects ? "from" : "to"}
          initial="from"
          variants={{
            from: {
              opacity: 0,
              y: 20,
              transition: {
                type: "tween",
                ease: [0.4, 0, 0.2, 1],
              },
            },
            to: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
                type: "tween",
                ease: [0.4, 0, 0.2, 1],
              },
            },
          }}
        >
          {random_projects_state.map((prjct, idx) => (
            <motion.div
              variants={{
                from: { y: 20, opacity: 0 },
                to: {
                  y: 0,
                  opacity: 1,
                },
              }}
              key={idx}
              className="w-32 h-32 md:w-48 md:h-48 bg-black rounded-md project-item overflow-hidden border-2 border-gray-200 dark:border-gray-700"
            >
              <Link href={prjct.full_slug}>
                <img
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-200"
                  src={prjct.content.ProjectThumbnail}
                  alt={prjct.content.ProjectName}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={projectsList ? "open" : "closed"}
        initial="closed"
        className="fixed overflow-hidden top-0 bottom-0 left-0 right-0 dark:bg-white dark:text-midnight text-white bg-midnight m-0 mt-20 md:m-12 md:mt-20 border border-midnight"
        variants={{
          open: {
            y: 0,
            transition: {
              animationDelay: 1,
              type: "tween",
              ease: [0.4, 0, 0.2, 1],
            },
          },
          closed: {
            y: "100vh",
            transition: {
              type: "tween",
              ease: [0.4, 0, 0.2, 1],
            },
          },
        }}
      >
        <div className="border-b border-midnight p-8 flex justify-between items-center">
          <h2 className={`${scotch.className} text-3xl uppercase`}>
            {locale === "fr" ? "Liste de projets" : "Projects list"}
          </h2>
          <div className="flex gap-2 items-center">
            <button onClick={() => setProjectsList(!projectsList)}>
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
            <button onClick={() => setProjectsList(!projectsList)}>
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
            <button onClick={() => setProjectsList(!projectsList)}>
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
        </div>
        <div className="h-[calc(100%-6rem)] overflow-y-auto">
          {allPosts.stories.map((post, idx) => (
            <Link href={post.full_slug} key={post.name + idx}>
              <div className="w-full items-center py-4 border-y border-y-gray-600 -mt-[1px] relative group">
                <div className="absolute bottom-0 z-0 w-full h-0 dark:bg-tournesol bg-romance group-hover:h-full transition-all duration-200"></div>
                <Container>
                  <div className="flex justify-between relative z-10">
                    <div className="flex items-center gap-8 relative dark:group-hover:text-midnight group-hover:text-white transition-all duration-200">
                      <h2 className="text-5xl font-bold">{idx + 1}</h2>
                      <h3 className="md:text-[2vw] text-2xl uppercase">
                        {post.content.ProjectName}
                      </h3>
                    </div>
                  </div>
                </Container>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export async function getStaticProps({ preview = null, locale }) {
  const allPosts = (await getAllPosts(locale)) || [];
  const pageContent = (await getPage("page_projets", locale)) || [];
  return {
    props: { allPosts, pageContent, locale },
  };
}
