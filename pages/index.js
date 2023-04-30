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

export default function Index({ allPosts, pageContent, allServices, preview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderWidth = 30;
  const dragConstraints = {
    left: 0,
    right: (allPosts.stories.length - 1) * sliderWidth,
  };

  const handleDrag = (event, info) => {
    setCurrentIndex(Math.round(-info.offset.x / sliderWidth));
  };
  return (
    <>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <section className="py-48">
        <Container>
          <div className="text-center">
            <span className="opacity-50">
              {pageContent.story.content.TeaserSpan}
            </span>
            <h1 className="text-tournesol text-[8vw] uppercase leading-tight">
              {pageContent.story.content.TeaserText}
            </h1>
          </div>
        </Container>
      </section>
      <section>
        <video autoPlay muted autoplay playsInline loop>
          <source
            src="https://vartiable.com/video/vartiable4.mp4"
            type="video/mp4"
          ></source>
        </video>
      </section>
      <section className="py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1">
            <h2 className="text-tournesol text-6xl uppercase">
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
            <motion.div
              className="flex gap-4 cursor-grab"
              drag="x"
              dragConstraints={dragConstraints}
              onDrag={handleDrag}
              style={{ x: -currentIndex * sliderWidth }}
            >
              {allPosts.stories.map((stry, idx) => (
                <motion.div>
                  <Link href={stry.full_slug} key={idx}>
                    <img
                      key={idx}
                      src={stry.content.ProjectThumbnail}
                      className="w-[30vw] rounded-md bg-white"
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
      <section className="py-32">
        <Container>
          <h1 className="text-tournesol text-center text-[5vw] uppercase">
            Crafting Creative Solutions
          </h1>
        </Container>
        <div className="pt-20">
          {allServices.stories.map((srvc, idx) => (
            <div
              key={srvc.name + idx}
              className="w-full items-center py-4 border-y border-y-gray-600"
            >
              <Container>
                <Link href={srvc.full_slug} className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-6xl">{idx + 1}</h2>
                    <h3 className="text-4xl uppercase">{srvc.content.Title}</h3>
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
      <Container>
        <footer className="bg-zinc-900 rounded-tl-xl rounded-tr-xl py-32">
          <h1 className="text-tournesol text-center text-[5vw] uppercase">
            Designing Your Success Story
          </h1>
        </footer>
      </Container>
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
