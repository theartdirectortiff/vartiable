import Container from "@/components/container";
import { getAllPosts, getAllServices, getPage } from "@/lib/api";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Footer from "@/components/footer";
import { useTheme } from "next-themes";

import localFont from "next/font/local";
import Image from "next/image";
const courierNew = localFont({ src: "../fonts/courier-new.ttf" });
const scotch = localFont({ src: "../fonts/Scotch.otf" });

export default function Index({ allPosts, pageContent, allServices, locale }) {
  const [sliderWidth, setsliderWidth] = useState();
  const slider = useRef();

  useEffect(() => {
    setsliderWidth(slider.current.scrollWidth - slider.current.offsetWidth);
  }, []);

  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>VART’IABLE | Agence Créative</title>
        <meta
          name="description"
          content="Vart’iable est une agence créative ayant pour mission de soutenir activement la communication des entreprises et de concevoir des expériences clients inspirantes, innovantes et mémorables."
        />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </Head>
      <section className="h-screen flex items-center relative">
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
        <div className="h-screen relative mb-60 md:mb-32 z-40">
          <div className="w-screen flex justify-center absolute bottom-0">
            <Button
              href="/#start"
              className="py-5 px-7 dark:bg-white dark:text-black bg-black text-white rounded-full hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {pageContent.story.content.HomeButton}
            </Button>
          </div>
        </div>
      </section>
      <section className="py-32 w-screen overflow-hidden" id="start">
        <Container>
          <div>
            <h2
              className={
                scotch.className +
                " dark:text-tournesol text-romance text-center text-[13vw] font-medium  md:text-[8vw] uppercase leading-none"
              }
            >
              {pageContent.story.content.ProjectSectionTitle}
            </h2>
          </div>
          <div className="pt-20">
            <motion.div ref={slider} className="cursor-grab">
              <motion.div
                drag="x"
                dragMomentum={false}
                dragConstraints={{ right: 0, left: -sliderWidth }}
                className="flex gap-4"
              >
                {allPosts.stories.map((stry, idx) => (
                  <motion.div className="min-w-[300px] max-w-[300px] md:min-w-[500px] md:max-w-[500px] overflow-hidden group">
                    <div
                      key={idx}
                      onMouseDown={(e) => e.preventDefault()}
                      className="select-none relative"
                    >
                      <Image
                        width={400}
                        height={400}
                        key={idx}
                        src={`https:${stry.content.ProjectThumbnail}`}
                        className="w-full object-cover aspect-square pointer-events-none rounded-md bg-gray-900"
                      />
                      <div className="absolute bottom-0 w-full justify-center flex p-10 text-center md:opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <Button href={`${stry.full_slug}#start`}>
                          {pageContent.story.content.ViewProjectButton}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </Container>

        <Container>
          <div className="flex justify-end">
            <div className="sm:w-full md:w-[40%] py-36 flex flex-col gap-5 items-start">
              <p className="indent-24">
                {pageContent.story.content.ProjectSectionParagraph}
              </p>
              <Button href="/projets">
                {pageContent.story.content.ProjectButton}
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <section id="services" className="pb-32">
        <Container>
          <h2
            className={
              scotch.className +
              " dark:text-tournesol text-romance text-center text-[13vw] font-medium  md:text-[10vw] uppercase leading-none"
            }
          >
            {pageContent.story.content.ServiceSectionTitle}
          </h2>
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

              <span>{locale === "fr" ? "Naviguer" : "Check it out"}</span>
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
                  <div className="flex items-center gap-8 relative dark:group-hover:text-midnight group-hover:text-white transition-all duration-200">
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
      <Footer
        title={pageContent.story.content.FooterSectionTitle}
        image={pageContent.story.content.FooterSectionImage.filename}
        cta={pageContent.story.content.FooterCallToAction}
      />
    </>
  );
}

export async function getStaticProps({ preview = null, locale }) {
  const allPosts = (await getAllPosts(locale)) || [];
  const pageContent = (await getPage("home", locale)) || [];
  const allServices = (await getAllServices(locale)) || [];
  return {
    props: { allPosts, pageContent, allServices, locale },
  };
}
