import Container from "@/components/container";
import Footer from "@/components/footer";
import { getPage } from "@/lib/api";

import localFont from "next/font/local";
import Head from "next/head";
const courierNew = localFont({ src: "../fonts/courier-new.ttf" });

export default function About({ pageContent }) {
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
      <section className="h-screen">
        <Container>
          <div className="flex flex-col justify-between h-screen py-32">
            <h1 className="dark:text-tournesol text-romance text-4xl md:text-[6vw] uppercase leading-tight font-bold">
              {pageContent.story.content.Title}
            </h1>
            <div className="grid gap-12 md:grid-cols-2 sm:grid-cols-1">
              <span className="hidden md:block"></span>
              <p className="indent-24">
                {pageContent.story.content.Description}
              </p>
            </div>
          </div>
        </Container>
      </section>
      {/* <section className="py-48">
        <Container>
          <h1 className="dark:text-tournesol text-romance text-4xl md:text-[6vw] uppercase leading-tight font-bold">
            {pageContent.story.content.Title}
          </h1>
          <div className="flex justify-end mt-32">
            <div className="w-full md:w-2/3">
              <span
                className={`${courierNew.className} uppercase opacity-50 pb-5 block`}
              >
                Description
              </span>
              <p>{pageContent.story.content.Description}</p>
            </div>
          </div>
        </Container>
      </section> */}
      <Footer
        title={pageContent.story.content.FooterSectionTitle}
        image={pageContent.story.content.FooterSectionImage.filename}
        cta={pageContent.story.content.FooterCallToAction}
      />
    </>
  );
}

export async function getStaticProps({ preview = null, locale }) {
  const pageContent = (await getPage("mission", locale)) || [];
  return {
    props: { pageContent, preview },
  };
}
