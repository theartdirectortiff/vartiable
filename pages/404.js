import Button from "@/components/Button";
import Container from "@/components/container";
import Head from "next/head";

import localFont from "next/font/local";
const scotch = localFont({ src: "../fonts/Scotch.otf" });

export default function Page() {
  return (
    <Container>
      <Head>
        <title>VART’IABLE | Agence Créative</title>
        <meta
          name="description"
          content="Vart’iable est une agence créative ayant pour mission de soutenir activement la communication des entreprises et de concevoir des expériences clients inspirantes, innovantes et mémorables."
        />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </Head>
      <section className="h-screen flex flex-col items-center justify-center gap-8">
        <h1
          className={
            scotch.className +
            " dark:text-tournesol text-romance text-center text-[13vw] font-medium  md:text-[8vw] uppercase leading-none"
          }
        >
          This page does not exist
        </h1>
        <Button href="/">Back to Home</Button>
      </section>
    </Container>
  );
}
