import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/hero-post";
import Intro from "@/components/intro";
import { getAllPosts, getAllServices, getPage } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import localFont from "next/font/local";
const courierNew = localFont({ src: "../fonts/courier-new.ttf" });
const clashDisplay = localFont({ src: "../fonts/ClashDisplay-Medium.ttf" });

export default function Index({ allPosts, pageContent, allServices, preview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderWidth = 30;
  const dragConstraints = {
    right: 0,
    letf: (allPosts.stories.length - 1) * sliderWidth,
  };

  const handleDrag = (event, info) => {
    setCurrentIndex(Math.round(-info.offset.x / sliderWidth));
  };
  return (
    <>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <section className="h-screen flex items-center relative">
        <img
          src="https://images.unsplash.com/photo-1668455199701-284281127a87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80"
          className="absolute w-screen h-screen z-0"
          alt=""
        />
        <Container>
          <div className="relative">
            {/* <span className="opacity-50">
              {pageContent.story.content.TeaserSpan}
            </span> */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${clashDisplay.className} dark:text-white text-romance text-[7vw] leading-tight font-bold`}
            >
              {pageContent.story.content.TeaserText}
            </motion.h1>
          </div>
        </Container>
      </section>
      <section>
        <video autoPlay muted playsInline loop>
          <source
            src="https://vartiable.com/video/vartiable4.mp4"
            type="video/mp4"
          ></source>
        </video>
      </section>
      <section className="py-32 w-screen overflow-hidden">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1">
            <h2 className="dark:text-tournesol text-romance text-2xl md:text-6xl uppercase leading-tight">
              {pageContent.story.content.ProjectSectionTitle}
            </h2>
            <div>
              <p className="leading-relaxed">
                {pageContent.story.content.ProjectSectionParagraph}
              </p>
              <Link href="/projets">Discover our projects</Link>
            </div>
          </div>
          <div className="pt-20">
            <motion.div className="cursor-grab">
              <motion.div
                drag="x"
                dragConstraints={dragConstraints}
                // onDrag={handleDrag}
                // style={{ x: -currentIndex * sliderWidth }}
                className="flex gap-4"
              >
                {allPosts.stories.map((stry, idx) => (
                  <motion.div className="min-w-[300px] max-w-[300px] md:min-w-[500px] md:max-w-[500px] rounded-md overflow-hidden">
                    <Link
                      href={stry.full_slug}
                      key={idx}
                      // className="select-none pointer-events-none"
                    >
                      <img
                        key={idx}
                        src={stry.content.ProjectThumbnail}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
      <section className="py-32">
        <Container>
          <h1 className="dark:text-tournesol text-romance text-center text-[6vw] uppercase  leading-tight">
            {pageContent.story.content.ServiceSectionTitle}
          </h1>
        </Container>
        <div className="pt-20">
          <Container>
            <div
              className={`${courierNew.className} flex justify-between py-3 opacity-50 uppercase`}
            >
              <div className="flex items-center gap-8">
                <span>Idx</span>
                <span>Service</span>
              </div>

              <span>Check it out</span>
            </div>
          </Container>
          {allServices.stories.map((srvc, idx) => (
            <div
              key={srvc.name + idx}
              className="w-full items-center py-4 border-y border-y-gray-600 -mt-[1px] relative group"
            >
              <div className="absolute bottom-0 z-0 w-full h-0 dark:bg-tournesol bg-romance group-hover:h-full transition-all duration-200"></div>
              <Container>
                <Link href={srvc.full_slug} className="flex justify-between">
                  <div className="flex items-center gap-8 relative group-hover:text-midnight transition-all duration-200">
                    <h2 className="text-5xl font-bold">{idx + 1}</h2>
                    <h3 className="md:text-[2vw] text-2xl uppercase">
                      {srvc.content.Title}
                    </h3>
                  </div>
                  <svg
                    width="40"
                    viewBox="0 0 112 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M61.2176 100.988L51.5634 91.4411L85.0849 57.9196H0.878906V43.9747H85.0849L51.5634 10.5068L61.2176 0.90625L111.258 50.9472L61.2176 100.988Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </Container>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-tournesol rounded-tl-xl rounded-tr-xl">
        <Container>
          <div
            className={`${courierNew.className} text-black grid  sm:grid-cols-1 md:grid-cols-3 sm:gap-12 md:gap-32 p-10 opacity-50 uppercase`}
          >
            <div className="flex flex-col">
              <span>Instagram</span>
              <span>LinkedIn</span>
              <span>Spotify</span>
            </div>
            <span className="text-center">
              Rte de la Fonderie 2, 1700 Fribourg
            </span>
            <div className="flex flex-col text-right">
              <span>bonjour@vartiable.com</span>
              <span>0791571767</span>
            </div>
          </div>
          <h1 className="text-black text-center font-semibold text-[5vw] uppercase leading-tight w-5/6 m-auto">
            {pageContent.story.content.FooterSectionTitle}
          </h1>
          <div className="w-2/4 m-auto mt-10 rounded-tl-3xl rounded-tr-3xl overflow-hidden relative flex justify-center">
            <img
              src={pageContent.story.content.FooterSectionImage.filename}
              alt=""
              className="w-full grayscale"
            />
            <Link
              className="absolute bottom-10 px-4 py-1 bg-white text-midnight rounded-full"
              href="/contact"
            >
              Let's have a chat!
            </Link>
          </div>
        </Container>
      </footer>
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getAllPosts(preview)) || [];
  const pageContent = (await getPage("home", preview)) || [];
  const allServices = (await getAllServices(preview)) || [];
  return {
    props: { allPosts, pageContent, allServices, preview },
  };
}
