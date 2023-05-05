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
      </Head>
      <section className="py-48">
        <Container>
          <h1 className="dark:text-tournesol text-romance text-7xl md:text-9xl uppercase leading-tight font-bold md:font-medium">
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
      </section>
      <Footer title="Yes" image="yes.jpg" cta="Yes" />
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  const pageContent = (await getPage("mission", preview)) || [];
  return {
    props: { pageContent, preview },
  };
}
